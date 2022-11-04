import { allure } from 'allure-mocha/dist/MochaAllureReporter';
import supertest from 'supertest';
import { urls } from '../config/index';
import { loadApiSpec, validate } from '../lib/validator';

const Pet = {
  findByStatus: async (status) => {
    const response = await supertest(urls.petstore)
      .get(`/pet/findByStatus${status}`)
      .set('Content-Type', 'application/json');
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    const apiSpec = await loadApiSpec('./lib/swagger.json');
    const schema = apiSpec.paths['/pet/findByTags'].get.responses[200];
    validate(schema, response.body);
    return response;
  },

  addANewPet: async (body) => {
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

  findByPetId: async (id) => {
    const response = await supertest(urls.petstore)
      .get(`/pet/${id}`)
      .set('Content-Type', 'application/json');
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    const apiSpec = await loadApiSpec('./lib/swagger.json');
    const schema = apiSpec.paths['/pet/findByTags'].get.responses[200];
    validate(schema, response.body);
    return response;
  },
};

export default Pet;
