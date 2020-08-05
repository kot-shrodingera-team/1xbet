import { authorizeGenerator } from '@kot-shrodingera-team/germes-generators/initialization';
import { log } from '@kot-shrodingera-team/germes-utils';

const changeToPhoneLogin = async (): Promise<boolean> => {
  const phoneButton = document.querySelector(
    '.custom-functional-button'
  ) as HTMLElement;
  if (!phoneButton) {
    log('Не найдена кнопка переключения на вход по телефону', 'crimson');
    return false;
  }
  phoneButton.click();
  return true;
};

const authorize = authorizeGenerator({
  openForm: {
    selector: '#curLoginForm',
    openedSelector: '.base_auth_form.active',
  },
  phoneLogin: {
    changeToPhoneLogin,
    phoneInputSelector: '#auth_phone_number',
  },
  loginInputSelector: '#auth_id_email',
  passwordInputSelector: '#auth-form-password',
  submitButtonSelector: '.auth-button',
  beforeSubmitDelay: 1000,
  captchaSelector: '[title="recaptcha challenge"]',
});

export default authorize;
