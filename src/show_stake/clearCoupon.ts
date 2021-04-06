import clearCouponGenerator from '@kot-shrodingera-team/germes-generators/show_stake/clearCoupon';
import { log } from '@kot-shrodingera-team/germes-utils';
import getStakeCount from '../stake_info/getStakeCount';

const preCheck = async (): Promise<boolean> => {
  const couponModal = document.querySelector('.c-coupon-modal');
  if (couponModal) {
    log('Есть сообщение об успешной ставке', 'steelblue');
    const okButton = couponModal.querySelector<HTMLElement>(
      '.o-btn-group__item:first-child .c-btn'
    );
    if (!okButton) {
      log('Не найдена кнопка ОК', 'crimson');
      return false;
    }
    okButton.click();
    log('Нажимаем кнопку ОК', 'orange');
  }
  return true;
};

// const apiClear = (): void => {};

// const postCheck = async (): Promise<boolean> => {
//   return true;
// };

const clearCoupon = clearCouponGenerator({
  preCheck,
  getStakeCount,
  // apiClear,
  clearAllSelector: '.coupon__settings button',
  clearSingleSelector: '.coupon__bets button',
  // postCheck,
  // context: () => document,
});

export default clearCoupon;
