import { HomePage } from './home.po';

describe('Homepage', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to the BEIS DCEAS app!');
  });
});
