import clearCouponGenerator from '@kot-shrodingera-team/germes-generators/show_stake/clearCoupon';
import { log } from '@kot-shrodingera-team/germes-utils';
import getStakeCount from '../stake_info/getStakeCount';

const preCheck = (): boolean => {
  const couponModal = document.querySelector('.c-coupon-modal');
  if (couponModal) {
    log('Есть сообщение об успешной ставке', 'steelblue');
    const okButton = couponModal.querySelector(
      '.o-btn-group__item:first-child .c-btn'
    ) as HTMLElement;
    if (!okButton) {
      log('Не найдена кнопка ОК', 'crimson');
      return false;
    }
    okButton.click();
    log('Нажимаем кнопку ОК', 'orange');
    return true;
  }
  return false;
};

const clearCoupon = clearCouponGenerator({
  preCheck,
  clearMode: 'one and all',
  clearAllSelector: '.coupon__settings button',
  clearSingleSelector: '.coupon__bets button',
  getStakeCount,
});

export default clearCoupon;
