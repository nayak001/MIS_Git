import { TchactivityModule } from './tchactivity.module';

describe('TchactivityModule', () => {
  let tchactivityModule: TchactivityModule;

  beforeEach(() => {
    tchactivityModule = new TchactivityModule();
  });

  it('should create an instance', () => {
    expect(tchactivityModule).toBeTruthy();
  });
});
