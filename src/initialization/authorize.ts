import authorizeGenerator from '@kot-shrodingera-team/germes-generators/initialization/authorize';
import {
  getPhoneLoginData,
  log,
  getElement,
  // resolveRecaptcha,
} from '@kot-shrodingera-team/germes-utils';
import { authElementSelector } from '../stake_info/checkAuth';
import { updateBalance, balanceReady } from '../stake_info/getBalance';
// import afterSuccesfulLogin from './afterSuccesfulLogin';

const preInputCheck = async (): Promise<boolean> => {
  const phoneLoginData = getPhoneLoginData();
  if (phoneLoginData) {
    log('Переключаем на ввод телефона', 'orange');
    const phoneButton = document.querySelector<HTMLElement>(
      '.custom-functional-button'
    );
    if (!phoneButton) {
      log('Не найдена кнопка переключения на вход по телефону', 'crimson');
      return false;
    }
    phoneButton.click();
    const phoneInput = await getElement('[id^="auth_phone_number"]');
    if (!phoneInput) {
      log('Не появилось поле ввода телефона', 'crimson');
      return false;
    }
  }
  return true;
};

// const beforeSubmitCheck = async (): Promise<boolean> => {
//   // const recaptchaIFrame = await getElement('iframe[title="reCAPTCHA"]', 1000);
//   // if (recaptchaIFrame) {
//   //   log('Есть капча. Пытаемся решить', 'orange');
//   //   try {
//   //     await resolveRecaptcha();
//   //   } catch (e) {
//   //     if (e instanceof Error) {
//   //       log(e.message, 'red');
//   //     }
//   //     return false;
//   //   }
//   // } else {
//   //   log('Нет капчи', 'steelblue');
//   // }
//   return true;
// };

const authorize = authorizeGenerator({
  openForm: {
    selector: '.curloginDropTop',
    openedSelector: '.auth:not([style="display: none;"])',
    loopCount: 10,
    triesInterval: 2000,
    // afterOpenDelay: 0,
  },
  preInputCheck,
  loginInputSelector: '#auth_id_email, [id^="auth_phone_number"]',
  passwordInputSelector: '#auth-form-password',
  submitButtonSelector: '.auth-button',
  // inputType: 'fireEvent',
  // fireEventNames: ['input'],
  beforeSubmitDelay: 1000,
  captchaSelector: '[title="recaptcha challenge"]',
  loginedWait: {
    loginedSelector: authElementSelector,
    timeout: 5000,
    balanceReady,
    updateBalance,
    // afterSuccesfulLogin,
  },
  // context: () => document,
});

export default authorize;
