import { PgeskillmasterRoutingModule } from './pgeskillmaster-routing.module';

describe('AssessmentmasterModule', () => {
  let assessmentmasterModule: PgeskillmasterRoutingModule;

  beforeEach(() => {
    assessmentmasterModule = new PgeskillmasterRoutingModule();
  });

  it('should create an instance', () => {
    expect(assessmentmasterModule).toBeTruthy();
  });
});
