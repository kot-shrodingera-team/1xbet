let loadingCounter = 0;
let stakeProcessingHungMessageSend = false;

export const clearLoadingCounter = (): void => {
  loadingCounter = 0;
};
export const clearStakeProcessingHungMessageSend = (): void => {
  stakeProcessingHungMessageSend = false;
};

const checkCouponLoading = (): boolean => {
  if (!stakeProcessingHungMessageSend && loadingCounter > 200) {
    const message =
      `В 1xbet очень долгое принятие ставки. Возможно зависание\n` +
      `Событие: ${worker.TeamOne} - ${worker.TeamTwo}\n` +
      `Ставка: ${worker.BetName}\n` +
      `Сумма: ${worker.StakeInfo.Summ}\n`;
    worker.Helper.SendInformedMessage(message);
    worker.Helper.WriteLine('Очень долгое принятие ставки. Возможно зависание');
    stakeProcessingHungMessageSend = true;
  }
  loadingCounter += 1;
  const succesModal = document.querySelector('.c-coupon-modal');
  const popUp = document.querySelector('.swal2-popup');
  // const blockedCoupon = document.querySelector('.c-bet-box__overlay');
  if (succesModal) {
    worker.Helper.WriteLine('Обработка ставки завершена (успешная)');
    return false;
  }
  if (popUp) {
    worker.Helper.WriteLine('Обработка ставки завершена (всплывающее окно)');
    return false;
  }
  // if (blockedCoupon) {
  //   worker.Helper.WriteLine('Обработка ставки завершена (купон заблокирован)');
  //   return false;
  // }
  worker.Helper.WriteLine('Обработка ставки');
  return true;
};

export default checkCouponLoading;
