import chai from 'chai';
import { api } from '../services/index';
import { PetBuilder } from '../fixtures/builder/index';

const { assert } = chai;

describe('Тестирование магазина питомцев', () => {
  it('#01 - Получить список доступных для покупки питомцев, 200', async () => {
    const status = '?status=available';
    const r = await api().Pet().findByStatus(status);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  it('#02 - Получить список питомцев в обработке, 200', async () => {
    const status = '?status=pending';
    const r = await api().Pet().findByStatus(status);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  it('#03 - Получить список проданных питомцев, 200', async () => {
    const status = '?status=sold';
    const r = await api().Pet().findByStatus(status);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    // console.log(r.body);
  });

  it('#04 - Создать питомца с фото, 200', async () => {
    const body = new PetBuilder().setId().setCategory().setName()
      .setPhoto()
      .setTag()
      .setStatus()
      .build();
    const r = await api().Pet().addANewPet(body);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    console.log(r.body);
  });

  it('#05 - Найти питомца по ID, 200', async () => {
    const body = new PetBuilder().setId().setCategory().setName()
      .setPhoto()
      .setTag()
      .setStatus()
      .build();
    let r = await api().Pet().addANewPet(body);
    r = await api().Pet().findByPetId(r.body.id);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    console.log(r.body);
  });

  it('#06 - Обновить информацию о питомце, 200', async () => {
    let body = new PetBuilder().setId().setCategory().setName()
      .setPhoto()
      .setTag()
      .setStatus()
      .build();
    let r = await api().Pet().addANewPet(body);
    console.log(r.body);
    console.log('-------- U P D A T I N G --------');
    r = await api().Pet().findByPetId(r.body.id);
    body = {
      id: r.body.id,
      category: { id: r.body.category.id, name: r.body.category.name },
      name: r.body.name,
      photoUrls: r.body.photoUrls,
      tags: [
        { id: 1, name: '#cat_at_home' },
        { id: 2, name: '#happy_cat' },
      ],
      status: 'sold',
    };
    r = await api().Pet().UpdatePet(body);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    console.log(r.body);
  });

  it('#07 - Удалить питомца по ID, 200', async () => {
    const body = new PetBuilder().setId().setCategory().setName()
      .setPhoto()
      .setTag()
      .setStatus()
      .build();
    let r = await api().Pet().addANewPet(body);
    console.log(r.body);
    console.log('-------- D E L E T I N G --------');
    r = await api().Pet().DeletePet(r.body.id);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    console.log(r.body);
  });
});
