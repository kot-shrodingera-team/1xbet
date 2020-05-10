import { log } from '../logger';
import {
  fireEvent,
  getElement,
  sleep,
} from '@kot-shrodingera-team/config/util';

export async function authX(login: string, pass: string): Promise<boolean> {
  const loginButton = document.querySelector(
    '#curLoginForm'
  ) as HTMLButtonElement;
  loginButton.click();
  await getElement('.auth', 2000);
  let loginForm = document.querySelector('#auth_id_email') as HTMLInputElement;
  const phoneButton = document.querySelector(
    '.custom-functional-button'
  ) as HTMLButtonElement;

  if (!worker.Login.includes('@')) {
    log('Авторизация с телефоном');
    if (phoneButton) {
      phoneButton.click();
    }
    await getElement('#auth_phone_number', 2000);
    loginForm = document.querySelector(
      '#auth_phone_number'
    ) as HTMLInputElement;
  }
  const passwordForm = document.querySelector(
    '#auth-form-password'
  ) as HTMLInputElement;
  const submitButton = document.querySelector(
    '.auth-button'
  ) as HTMLButtonElement;
  loginForm.value = login;
  passwordForm.value = pass;
  fireEvent(loginForm, 'input');
  fireEvent(passwordForm, 'input');

  if (submitButton) {
    await sleep(600);
    submitButton.click();
    log('Кнопка при авторизации нажата.');
    return true;
  } else {
    log('Кнопка при авторизации не найдена.');
    return false;
  }
}

export function checkAuth(): boolean {
  return Boolean(document.querySelector('.user-money_balance'));
}
