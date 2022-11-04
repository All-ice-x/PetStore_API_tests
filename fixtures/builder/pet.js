/* eslint-disable max-len */
import { faker } from '@faker-js/faker';

class GetNewPet {
  constructor(setId, setCategory, setName, setPhoto, setTag, setStatus) {
    this.id = setId;
    this.category = setCategory;
    this.name = setName;
    this.photoUrls = setPhoto;
    this.tags = setTag;
    this.status = setStatus;
  }
}

// eslint-disable-next-line func-names
const PetBuilder = function () {
  return {
    setId() {
      this.id = faker.random.numeric(7);
      return this;
    },
    setCategory() {
      this.category = { id: faker.random.numeric(2), name: faker.address.cityName() };
      return this;
    },
    setName() {
      this.name = faker.name.firstName();
      return this;
    },
    setPhoto() {
      this.photoUrls = [faker.image.cats(800, 600, true)];
      return this;
    },
    setTag() {
      this.tags = [{ id: faker.random.numeric(3), name: faker.random.words() },
        { id: faker.random.numeric(3), name: faker.random.words() },
        { id: faker.random.numeric(3), name: faker.random.words() }];
      return this;
    },
    setStatus() {
      const statuses = ['available', 'pending', 'sold'];
      const randomIndex = Math.floor(Math.random() * 3);
      this.status = (statuses[randomIndex]);
      return this;
    },

    build() {
      return new GetNewPet(this.id, this.category, this.name, this.photoUrls, this.tags, this.status);
    },
  };
};

export default PetBuilder;
