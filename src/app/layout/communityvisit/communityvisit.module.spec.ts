import { CommunityvisitModule } from './communityvisit.module';

describe('CommunityvisitModule', () => {
  let communityvisitModule: CommunityvisitModule;

  beforeEach(() => {
    communityvisitModule = new CommunityvisitModule();
  });

  it('should create an instance', () => {
    expect(communityvisitModule).toBeTruthy();
  });
});
