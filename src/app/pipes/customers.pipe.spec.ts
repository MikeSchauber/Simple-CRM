import { CustomersPipe } from './customers.pipe';

describe('CustomersPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomersPipe();
    expect(pipe).toBeTruthy();
  });
});
