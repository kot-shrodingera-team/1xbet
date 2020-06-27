import {
  getElement,
  fireEvent,
  sleep,
} from '@kot-shrodingera-team/config/util';
import getPhoneCountry from './getPhoneCountry';

const authorize = async (): Promise<boolean> => {
  const openLoginFormButton = document.querySelector(
    '#curLoginForm'
  ) as HTMLButtonElement;
  if (!openLoginFormButton) {
    worker.Helper.WriteLine('Не найдена кнопка открытия формы авторизации');
    return;
  }
  const loopCount = 5;
  for (let i = 1; i <= loopCount; i += 1) {
    openLoginFormButton.click();
    // eslint-disable-next-line no-await-in-loop
    const authForm = await getElement('.base_auth_form.active', 500);
    if (!authForm) {
      if (i === loopCount) {
        worker.Helper.WriteLine('Форма авторизации так и не появилась');
        return;
      }
      worker.Helper.WriteLine(
        'Форма авторизации не появилась. Пробуем ещё раз'
      );
    } else {
      break;
    }
  }

  const phoneCountry = getPhoneCountry();
  if (phoneCountry) {
    worker.Helper.WriteLine('Используется номер телефона');
    const phoneButton = document.querySelector(
      '.custom-functional-button'
    ) as HTMLElement;
    if (!phoneButton) {
      worker.Helper.WriteLine(
        'Не найдена кнопка переключения на вход по телефону'
      );
      return;
    }
    phoneButton.click();
    const phoneInput = (await getElement(
      '#auth_phone_number'
    )) as HTMLInputElement;
    if (!phoneInput) {
      worker.Helper.WriteLine('Не найдено поле ввода телефона');
      return;
    }
    phoneInput.value = worker.Login;
    fireEvent(phoneInput, 'input');
    // Нужно допилить
  } else {
    worker.Helper.WriteLine('Используется логин или почта');
    const loginInput = document.querySelector(
      '#auth_id_email'
    ) as HTMLInputElement;
    if (!loginInput) {
      worker.Helper.WriteLine('Не найдено поле ввода логина');
      return;
    }
    loginInput.value = worker.Login;
    fireEvent(loginInput, 'input');
  }
  const passwordInput = document.querySelector(
    '#auth-form-password'
  ) as HTMLInputElement;
  if (!passwordInput) {
    worker.Helper.WriteLine('Не найдено поле ввода пароля');
    return;
  }
  passwordInput.value = worker.Password;
  fireEvent(passwordInput, 'input');
  const loginSubmitButton = document.querySelector(
    '.auth-button'
  ) as HTMLButtonElement;
  if (!loginSubmitButton) {
    worker.Helper.WriteLine('Не найдена кнопка входа');
    return;
  }
  await sleep(1000);
  worker.Helper.WriteLine('Нажимаем на кнопку входа');
  loginSubmitButton.click();
  worker.LoginTry += 1;

  // '[title="recaptcha challenge"]'
  getElement('[title="recaptcha challenge"]').then((element) => {
    if (element) {
      worker.Helper.WriteLine('Появилась капча');
    }
  });
};

export default authorize;
