import { updateBalance } from '../stake_info/getBalance';

const checkStakeStatus = (): boolean => {
  const succesModal = document.querySelector('.c-coupon-modal');
  const popUp = document.querySelector('.swal2-popup');
  // const blockedCoupon = document.querySelector('.c-bet-box__overlay');

  if (succesModal) {
    worker.Helper.WriteLine('Ставка принята');
    updateBalance();
    return true;
  }
  if (popUp) {
    const popUpTextElement = document.querySelector('.swal2-content');
    if (!popUpTextElement) {
      worker.Helper.WriteLine('Не найден текст всплывающего окна');
    }
    const popUpText = popUpTextElement.textContent.trim();
    worker.Helper.WriteLine(
      `Текст всплывающего окна: ${popUpTextElement.textContent.trim()}`
    );
    if (popUpText.startsWith('Изменился коэффициент')) {
      worker.Helper.WriteLine('Изменился коэффициент. Отменяем ставку');
      const cancelButton = document.querySelector(
        '.swal2-cancel'
      ) as HTMLElement;
      if (!cancelButton) {
        worker.Helper.WriteLine(
          'Не найдена кнопка "Отмена" во всплывающем окне'
        );
      } else {
        cancelButton.click();
      }
      return false;
    }
    const okButton = document.querySelector('.swal2-confirm') as HTMLElement;
    if (!okButton) {
      worker.Helper.WriteLine('Не найдена кнопка "ОК" во всплывающем окне');
    } else {
      okButton.click();
    }
    return false;
  }

  // if (blockedCoupon) {
  //   worker.Helper.WriteLine('Исход заблокирован');
  //   return false;
  // }

  worker.Helper.WriteLine(
    'Неизвестный результат ставки. Считаем ставку не принятой'
  );
  return false;
};

export default checkStakeStatus;
