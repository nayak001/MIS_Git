import { StudentdetailsModule } from './studentdetails.module';

describe('StudentdetailsModule', () => {
  let studentdetailsModule: StudentdetailsModule;

  beforeEach(() => {
    studentdetailsModule = new StudentdetailsModule();
  });

  it('should create an instance', () => {
    expect(studentdetailsModule).toBeTruthy();
  });
});
