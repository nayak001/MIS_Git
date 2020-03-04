import { StudentDetailsPageModule } from './studentDetailsPage.module';

describe('CenterDetailsModule', () => {
  let StudentDetailsPageModule: StudentDetailsPageModule;

  beforeEach(() => {
    StudentDetailsPageModule = new StudentDetailsPageModule();
  });

  it('should create an instance', () => {
    expect(StudentDetailsPageModule).toBeTruthy();
  });
});
