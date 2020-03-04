import { TzworkshopcontentModule } from './tzworkshopcontent.module';

describe('TzworkshopcontentModule', () => {
  let tzworkshopcontentModule: TzworkshopcontentModule;

  beforeEach(() => {
    tzworkshopcontentModule = new TzworkshopcontentModule();
  });

  it('should create an instance', () => {
    expect(tzworkshopcontentModule).toBeTruthy();
  });
});
