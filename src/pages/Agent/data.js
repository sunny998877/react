import faker from 'faker';

const agents = new Array(20).fill({});

const result = agents.map((agent, index) => ({
  id: index + 1,
  avatar: faker.image.avatar(),
  username: faker.internet.userName(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumberFormat()
}));

export default result;
