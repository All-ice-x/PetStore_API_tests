import { allure } from 'allure-mocha/dist/MochaAllureReporter';
import supertest from 'supertest';
import { urls } from '../config/index';
import { loadApiSpec, validate } from '../lib/validator';

const Pet = {
  findByStatus: async (status) => { // поиск питомца по статусу
    const response = await supertest(urls.petstore)
      .get(`/pet/findByStatus${status}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    const apiSpec = await loadApiSpec('./lib/swagger.json');
    const schema = apiSpec.paths['/pet/findByStatus'].get.responses[200];
    validate(schema, response.body);

    return response;
  },

  addANewPet: async (body) => { // добавление нового питомца в каталог
    const response = await supertest(urls.petstore)
      .post('/pet')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(body);
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    const apiSpec = await loadApiSpec('./lib/swagger.json');
    const schema = apiSpec.paths['/pet'].post.responses[200];
    validate(schema, response.body);

    return response;
  },

  findByPetId: async (id) => { // поиск питомца по ID
    const response = await supertest(urls.petstore)
      .get(`/pet/${id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    const apiSpec = await loadApiSpec('./lib/swagger.json');
    const schema = apiSpec.paths['/pet/{petId}'].get.responses[200];
    validate(schema, response.body);

    return response;
  },

  UpdatePet: async (body) => { //  обновление информации о питомце
    const response = await supertest(urls.petstore)
      .put('/pet')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(body);
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    const apiSpec = await loadApiSpec('./lib/swagger.json');
    const schema = apiSpec.paths['/pet'].put.responses[200];
    validate(schema, response.body);

    return response;
  },

  DeletePet: async (id) => { //  удаление питомца из каталога
    const response = await supertest(urls.petstore)
      .delete(`/pet/${id}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(id);
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    const apiSpec = await loadApiSpec('./lib/swagger.json');
    const schema = apiSpec.paths['/pet/{petId}'].delete.responses[200];
    validate(schema, response.body);

    return response;
  },
};

export default Pet;
