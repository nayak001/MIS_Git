import { TeacherprofileModule } from './teacherprofile.module';

describe('TeacherprofileModule', () => {
  let teacherprofileModule: TeacherprofileModule;

  beforeEach(() => {
    teacherprofileModule = new TeacherprofileModule();
  });

  it('should create an instance', () => {
    expect(teacherprofileModule).toBeTruthy();
  });
});
