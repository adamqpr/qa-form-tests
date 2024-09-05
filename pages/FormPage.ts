import { expect, type Locator, type Page } from '@playwright/test';

export class FormPage {
  public name = "Test form page";
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly birthDateInput: Locator;
  readonly languageLabel: Locator;
  readonly phoneNumberInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessages: Locator;
  readonly requiredAgreement: Locator;
  readonly additionalAgreement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('Imię');
    this.lastNameInput = page.getByPlaceholder('Nazwisko');
    this.emailInput = page.getByPlaceholder('Twój adres e-mail');
    this.passwordInput = page.getByPlaceholder('Hasło', { exact: true });
    this.confirmPasswordInput = page.getByPlaceholder('Powtórz hasło');
    this.birthDateInput = page.getByPlaceholder('Data urodzenia');
    this.languageLabel = page.getByLabel('JęzykWybierz język afar');
    this.phoneNumberInput = page.getByPlaceholder('Numer telefonu');
    this.submitButton = page.getByRole('button', { name: 'Zarejestruj' });
    this.errorMessages = page.locator('.errors');
    this.requiredAgreement = page.locator('form div').filter({ hasText: 'Akceptuję regulamin oraz' }).locator('div');
    this.additionalAgreement = page.locator('form div').filter({ hasText: 'Wyrażam zgodę na otrzymywanie' }).locator('div');
  }

  async goto() {
    await this.page.goto('http://localhost:8080/');
  }

  async fillForm({ firstName, lastName, email, password, confirmPassword, birthDate, language, phoneNumber, requiredAgreementMarked, additionalAgreementMarked }: { firstName?: string; lastName?: string; email?: string; password?: string; confirmPassword?: string; birthDate?: string; language?: string; phoneNumber?: string; requiredAgreementMarked?: boolean; additionalAgreementMarked?: boolean; } = {}) {
    if (firstName) await this.firstNameInput.fill(firstName);
    if (lastName) await this.lastNameInput.fill(lastName);
    if (email) await this.emailInput.fill(email);
    if (password) await this.passwordInput.fill(password);
    if (confirmPassword) await this.confirmPasswordInput.fill(confirmPassword);
    if (birthDate) await this.birthDateInput.fill(birthDate);
    if (language) await this.languageLabel.selectOption(language);
    if (phoneNumber) await this.phoneNumberInput.fill(phoneNumber);
    if (requiredAgreementMarked) await this.requiredAgreement.click();
    if (additionalAgreementMarked) await this.additionalAgreement.click();
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async expectErrorMessage(expectedMessage) {
    await expect(this.errorMessages).toHaveText(expectedMessage);
  }
}

module.exports = { FormPage };