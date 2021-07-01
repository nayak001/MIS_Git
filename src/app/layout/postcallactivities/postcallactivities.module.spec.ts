import { PostcallactivitiesModule } from './postcallactivities.module';

describe('PostcallactivitiesModule', () => {
  let postcallactivitiesModule: PostcallactivitiesModule;

  beforeEach(() => {
    postcallactivitiesModule = new PostcallactivitiesModule();
  });

  it('should create an instance', () => {
    expect(postcallactivitiesModule).toBeTruthy();
  });
});
