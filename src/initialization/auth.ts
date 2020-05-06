import { log } from '../logger';
import { fireEvent } from '@kot-shrodingera-team/config/util';

export function auth(login: string, pass: string): boolean {
  const idEmailForm = document.querySelector(
    'input#auth_id_email'
  ) as HTMLInputElement;
  const passwordForm = document.querySelector(
    'input#auth-form-password'
  ) as HTMLInputElement;
  const submitButton = document.querySelector(
    '.auth-button'
  ) as HTMLButtonElement;
  idEmailForm.value = login;
  passwordForm.value = pass;
  fireEvent(idEmailForm, 'input');
  fireEvent(passwordForm, 'input');
  if (submitButton) {
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
