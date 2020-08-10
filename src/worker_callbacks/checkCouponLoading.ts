import checkCouponLoadingGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/checkCouponLoading';
import { log } from '@kot-shrodingera-team/germes-utils';
import { getDoStakeTime } from '../stake_info/doStakeTime';

const check = () => {
  const succesModal = document.querySelector('.c-coupon-modal');
  const popUp = document.querySelector('.swal2-popup');
  // const blockedCoupon = document.querySelector('.c-bet-box__overlay');
  if (succesModal) {
    log('Обработка ставки завершена (успешная)', 'orange');
    return false;
  }
  if (popUp) {
    log('Обработка ставки завершена (всплывающее окно)', 'orange');
    return false;
  }
  // if (blockedCoupon) {
  //   log('Обработка ставки завершена (купон заблокирован)', 'orange');
  //   return false;
  // }
  log('Обработка ставки', 'tan');
  return true;
};

const checkCouponLoading = checkCouponLoadingGenerator({
  bookmakerName: '1xbet',
  getDoStakeTime,
  check,
});

export default checkCouponLoading;
