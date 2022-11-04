import chai from 'chai';
import { api } from '../services/index';
import { PetBuilder } from '../fixtures/builder/index';

const { assert } = chai;

describe('Тестирование магазина питомцев', () => {
  it('#01 - Получить список доступных для покупки питомцев, 200', async () => {
    const status = '?status=available';
    const r = await api().Pet().findByStatus(status);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    console.log(r.body);
  });

  it('#02 - Получить список питомцев в обработке, 200', async () => {
    const status = '?status=pending';
    const r = await api().Pet().findByStatus(status);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    console.log(r.body);
  });

  it('#03 - Получить список проданных питомцев, 200', async () => {
    const status = '?status=sold';
    const r = await api().Pet().findByStatus(status);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    console.log(r.body);
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
});

/*

  // 05
  it('#05 - Получить todo по ID, 200', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus(false)
      .build();
    let r = await api().Todos().post(body, token);
    r = await api().TodosId().get(r.body.id, token);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 08
  it('#08 - Создать todo, 201', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus(true)
      .build();
    const r = await api().Todos().post(body, token);
    assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
  });

  // 09
  it('#09 - Отфильтровать todos по doneStatus=true, 200', async () => {
    const status = '?doneStatus=true';
    const r = await api().Todos().status(token, status);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 10
  it('#10 - Получить ошибку по doneStatus на POST todo, 400', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus('ok')
      .build();
    const r = await api().Todos().post(body, token);
    assert.strictEqual(r.statusCode, 400, 'statusCode не 400');
  });

  // 11
  it('#11 - Обновить данные в todos/{id}, 200', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus(true)
      .build();
    let r = await api().Todos().post(body, token);
    r = await api().TodosId().post(r.body.id, body, token);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 12
  it('#12 - Удалить запись todos/{id}, 200', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus(true)
      .build();
    let r = await api().Todos().post(body, token);
    r = await api().TodosId().delete(r.body.id, token);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 21
  it('#21 - Создать todo (формат body JSON), 201', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus(true)
      .build();
    const r = await api().Todos().post(body, token);
    assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
  });

  // 32
  it('#32 - Получить ошибку "401 Unauthorized" в GET /secret/note, 401', async () => {
    const r = await api().SecretNote().getNoAuth(token);
    assert.strictEqual(r.statusCode, 401, 'statusCode не 401');
  });

  it('#39 - Удалить ВСЕ записи todos/{id}, 200', async () => {
    let r = await api().Todos().get(token);
    r.body.todos.forEach((item) => {
      api().TodosId().delete(item.id, token);
    });
    r = await api().Todos().get(token);
    assert.isEmpty(r.body.todos, 'Есть неудалённые todo');
  });

*/
