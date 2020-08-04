import {
  clearStakeProcessingHungMessageSend,
  clearLoadingCounter,
} from './checkCouponLoading';
import getCoefficient from '../stake_info/getCoefficient';

const doStake = (): boolean => {
  const stakeButton = document.querySelector(
    '.coupon-btn-group__item .c-btn'
  ) as HTMLElement;

  if (!stakeButton) {
    worker.Helper.WriteLine(
      'Не найдена кнопка "Сделать ставку". Ставку не сделали'
    );
    return false;
  }
  const actualCoefficient = getCoefficient();
  worker.Helper.WriteLine(`Коэффициент перед ставкой: ${actualCoefficient}`);
  if (actualCoefficient < worker.StakeInfo.Coef) {
    worker.Helper.WriteLine('Коэффициент перед ставкой упал');
    return false;
  }
  stakeButton.click();
  worker.Helper.WriteLine('Сделали ставку');
  clearLoadingCounter();
  clearStakeProcessingHungMessageSend();
  return true;
};

export default doStake;
