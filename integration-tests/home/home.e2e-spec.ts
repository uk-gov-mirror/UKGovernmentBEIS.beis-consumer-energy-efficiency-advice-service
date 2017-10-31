import { HomePage } from './home.po';
import {browser} from 'protractor';

describe('Homepage', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should display the heading', () => {
    page.navigateTo();
    expect(page.getHeadingText()).toEqual('Impartial and independent advice to help you...');
  });

  it('should navigate to home-basics questionnaire page when link is clicked', () => {
    page.navigateTo();
    page.clickQuestionnaireLink();
    expect(browser.getCurrentUrl()).toContain('/questionnaire/home-basics');
  });
});
