import { test, expect } from '@playwright/test';
import { FormPage } from '../pages/FormPage';

const name: string = 'Jan';
const lastName: string = 'Kowalski';
const validEmail: string = 'test@mail.com';
const validPassword: string = 'Abcd123!';
const birthDate: string = '2024-01-01';


test('Succesfully submit form with required fields filled', async ({ page }) => { 
  const formPage = new FormPage(page);

  await test.step("Go to form page.", async () => { formPage.goto() });
  await test.step("Fill/check all required fields/options.", async () => {
    formPage.fillForm(
      { 
        firstName: name,
        lastName: lastName,
        email: validEmail,
        password: validPassword,
        confirmPassword: validPassword,
        birthDate: birthDate,
        requiredAgreementMarked: true 
      })
  })
  await expect(formPage.page.locator('form')).not.toContainText('Pole Imię jest wymagane');
  await expect(formPage.page.locator('form')).not.toContainText('Pole Nazwisko jest wymagane');
  await expect(formPage.page.locator('form')).not.toContainText('Pole E-mail jest wymagane');
  await expect(formPage.page.locator('form')).not.toContainText('Pole password jest wymagane');
  await expect(formPage.page.locator('form')).not.toContainText('Pole Powtórz hasło jest wymagane');
  await expect(formPage.page.locator('form')).not.toContainText('Pole Data urodzenia jest wymagane');
  await expect(formPage.page.locator('form')).not.toContainText('To pole jest wymagane');
  //Don't know why formPage.submitForm doesn't work. So this is little W/A
  await page.getByRole('button', { name: 'Zarejestruj' }).click();

  await expect(formPage.page.locator('h1')).toHaveText(name + ", dziękujemy za rejestrację!");
});

test.describe("Can't submit form with missing requirements with proper error prompt", () => {
  test("All requirements missing", async ({ page }) => {
    const formPage = new FormPage(page);

    await test.step("Go to form page.", async () => { formPage.goto() });
    await formPage.page.getByRole('button', { name: 'Zarejestruj' }).click();

    await expect(formPage.page.locator('form')).toContainText('Pole Imię jest wymagane');
    await expect(formPage.page.locator('form')).toContainText('Pole Nazwisko jest wymagane');
    await expect(formPage.page.locator('form')).toContainText('Pole E-mail jest wymagane');
    await expect(formPage.page.locator('form')).toContainText('Pole password jest wymagane');
    await expect(formPage.page.locator('form')).toContainText('Pole Powtórz hasło jest wymagane');
    await expect(formPage.page.locator('form')).toContainText('Pole Data urodzenia jest wymagane');
    await expect(formPage.page.locator('form')).toContainText('To pole jest wymagane');
  })

  test("Name field missing", async ({ page }) => {
    const formPage = new FormPage(page);

    await test.step("Go to form page.", async () => { formPage.goto() });
    await test.step("Fill/check all required fields/options.", async () => {
      formPage.fillForm(
        { 
          lastName: lastName,
          email: validEmail,
          password: validPassword,
          confirmPassword: validPassword,
          birthDate: birthDate,
          requiredAgreementMarked: true 
        })
    })
    await formPage.page.getByRole('button', { name: 'Zarejestruj' }).click();

    await expect(formPage.page.locator('h1')).toHaveText("Załóż konto");
    await expect(formPage.page.locator('form')).toContainText('Pole Imię jest wymagane');
  })

  /*
  Checking further required fields one by one
  */
})