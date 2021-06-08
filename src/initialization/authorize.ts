import authorizeGenerator from '@kot-shrodingera-team/germes-generators/initialization/authorize';
import {
  getPhoneLoginData,
  log,
  getElement,
} from '@kot-shrodingera-team/germes-utils';
import { authElementSelector } from '../stake_info/checkAuth';
import { updateBalance, balanceReady } from '../stake_info/getBalance';
// import afterSuccesfulLogin from './afterSuccesfulLogin';

const setLoginType = async (): Promise<boolean> => {
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

const authorize = authorizeGenerator({
  openForm: {
    selector: '.curloginDropTop',
    openedSelector: '.auth:not([style="display: none;"])',
    // loopCount: 10,
    // triesInterval: 1000,
    // afterOpenDelay: 0,
  },
  setLoginType,
  loginInputSelector: '#auth_id_email, [id^="auth_phone_number"]',
  passwordInputSelector: '#auth-form-password',
  submitButtonSelector: '.auth-button',
  // inputType: 'fireEvent',
  // fireEventNames: ['input'],
  beforeSubmitDelay: 1000,
  captchaSelector: '[title="recaptcha challenge"]',
  loginedWait: {
    loginedSelector: authElementSelector,
    balanceReady,
    updateBalance,
    // afterSuccesfulLogin,
  },
  // context: () => document,
});

export default authorize;
