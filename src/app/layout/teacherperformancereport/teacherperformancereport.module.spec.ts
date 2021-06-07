import { TeacherperformancereportModule } from './teacherperformancereport.module';

describe('TeacherperformancereportModule', () => {
  let IndividualTeachersEducatorPageModule: TeacherperformancereportModule;

  beforeEach(() => {
    IndividualTeachersEducatorPageModule = new TeacherperformancereportModule();
  });

  it('should create an instance', () => {
    expect(IndividualTeachersEducatorPageModule).toBeTruthy();
  });
});
