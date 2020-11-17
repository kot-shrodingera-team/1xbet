import authorizeGenerator from '@kot-shrodingera-team/germes-generators/initialization/authorize';
import {
  getElement,
  getPhoneCountry,
  log,
} from '@kot-shrodingera-team/germes-utils';
import { balanceReady, updateBalance } from '../stake_info/getBalance';

const setLoginType = async (): Promise<boolean> => {
  const phoneCountry = getPhoneCountry();
  if (phoneCountry) {
    log('Переключаем на ввод телефона', 'orange');
    const phoneButton = document.querySelector(
      '.custom-functional-button'
    ) as HTMLElement;
    if (!phoneButton) {
      log('Не найдена кнопка переключения на вход по телефону', 'crimson');
      return false;
    }
    phoneButton.click();
    const phoneInput = await getElement('[id^="auth_phone_number]');
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
  },
  setLoginType,
  loginInputSelector: '#auth_id_email, [id^="auth_phone_number]',
  passwordInputSelector: '#auth-form-password',
  submitButtonSelector: '.auth-button',
  beforeSubmitDelay: 1000,
  captchaSelector: '[title="recaptcha challenge"]',
  loginedWait: {
    balanceReady,
    loginedSelector: '.submenu_link[href="office/account/"]',
    updateBalance,
  },
});

export default authorize;
