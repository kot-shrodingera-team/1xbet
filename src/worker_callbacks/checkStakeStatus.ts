import { log } from '@kot-shrodingera-team/germes-utils';
import { updateBalance } from '../stake_info/getBalance';

const checkStakeStatus = (): boolean => {
  const succesModal = document.querySelector('.c-coupon-modal');
  const popUp = document.querySelector('.swal2-popup');
  // const blockedCoupon = document.querySelector('.c-bet-box__overlay');

  if (succesModal) {
    log('Ставка принята', 'green');
    updateBalance();
    return true;
  }
  if (popUp) {
    const popUpTextElement = document.querySelector('.swal2-content');
    if (!popUpTextElement) {
      log('Не найден текст всплывающего окна', 'crimson');
      return false;
    }
    const popUpText = popUpTextElement.textContent.trim();
    log(
      `Текст всплывающего окна: "${popUpTextElement.textContent.trim()}"`,
      'tomato'
    );
    if (popUpText.startsWith('Изменился коэффициент')) {
      log('Изменился коэффициент. Отменяем ставку', 'orange');
      const cancelButton = document.querySelector(
        '.swal2-cancel'
      ) as HTMLElement;
      if (!cancelButton) {
        log('Не найдена кнопка "Отмена" во всплывающем окне', 'crimson');
      } else {
        cancelButton.click();
      }
      return false;
    }
    const okButton = document.querySelector('.swal2-confirm') as HTMLElement;
    if (!okButton) {
      log('Не найдена кнопка "ОК" во всплывающем окне', 'crimson');
    } else {
      okButton.click();
    }
    return false;
  }

  // if (blockedCoupon) {
  //   log('Исход заблокирован', 'tomato');
  //   return false;
  // }

  log('Неизвестный результат ставки. Считаем ставку не принятой', 'tomato');
  return false;
};

export default checkStakeStatus;
