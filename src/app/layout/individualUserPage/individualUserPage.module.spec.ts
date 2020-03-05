import { IndividualUserPageModule } from './individualUserPage.module';

describe('CenterDetailsModule', () => {
  let IndividualUserPageModule: IndividualUserPageModule;

  beforeEach(() => {
    IndividualUserPageModule = new IndividualUserPageModule();
  });

  it('should create an instance', () => {
    expect(IndividualUserPageModule).toBeTruthy();
  });
});
