import { browser, by, element } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/');
  }

  getHeadingText() {
    return element(by.css('.heading-text')).getText();
  }

  clickQuestionnaireLink() {
    element(by.cssContainingText('.questionnaire-link', 'Reduce your energy bills')).click();
  }
}
