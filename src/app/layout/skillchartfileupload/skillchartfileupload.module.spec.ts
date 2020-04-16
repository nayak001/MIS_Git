import { SkillchartfileuploadModule } from './skillchartfileupload.module';

describe('SkillchartfileuploadModule', () => {
  let skillchartfileuploadModule: SkillchartfileuploadModule;

  beforeEach(() => {
    skillchartfileuploadModule = new SkillchartfileuploadModule();
  });

  it('should create an instance', () => {
    expect(skillchartfileuploadModule).toBeTruthy();
  });
});
