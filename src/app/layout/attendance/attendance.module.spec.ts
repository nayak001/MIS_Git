import { AttendanceModule } from './attendance.module';

describe('AttendanceModule', () => {
  let attendanceModule: AttendanceModule;

  beforeEach(() => {
    attendanceModule = new AttendanceModule();
  });

  it('should create an instance', () => {
    expect(attendanceModule).toBeTruthy();
  });
});
