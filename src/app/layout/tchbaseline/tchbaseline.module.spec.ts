import { TchbaselineModule } from './tchbaseline.module';

describe('TchbaselineModule', () => {
  let tchbaselineModule: TchbaselineModule;

  beforeEach(() => {
    tchbaselineModule = new TchbaselineModule();
  });

  it('should create an instance', () => {
    expect(tchbaselineModule).toBeTruthy();
  });
});
