import { awaiter, getElement } from '@kot-shrodingera-team/config/util';
import getStakeCount from '../stake_info/getStakeCount';

const clearCoupon = async (): Promise<boolean> => {
  const stakeCount = getStakeCount();
  if (stakeCount !== 0) {
    worker.Helper.WriteLine('Купон не пуст. Очищаем');
    if (stakeCount === 1) {
      const removeSingleBetButton = document.querySelector(
        '.coupon__bets button'
      ) as HTMLElement;
      if (!removeSingleBetButton) {
        worker.Helper.WriteLine('Не найдена кнопка очистки купона');
        return false;
      }
      removeSingleBetButton.click();
    } else {
      const clearCouponButton = document.querySelector(
        '.coupon__settings button'
      ) as HTMLElement;
      if (!clearCouponButton) {
        worker.Helper.WriteLine('Не найдена кнопка очистки купона');
        return false;
      }
      clearCouponButton.click();
    }
    const couponCleared = Boolean(await awaiter(() => getStakeCount() === 0));
    if (couponCleared) {
      worker.Helper.WriteLine('Купон очищен');
      return true;
    }
    return false;
  }
  worker.Helper.WriteLine('Купон пуст');
  return true;
};

export default clearCoupon;
