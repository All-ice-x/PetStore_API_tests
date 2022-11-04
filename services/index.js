import Pet from './pet.service';

const api = () => ({
  Pet: () => ({ ...Pet }),
});

export { api };
