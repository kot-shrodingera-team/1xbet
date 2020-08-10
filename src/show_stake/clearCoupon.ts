import clearCouponGenerator from '@kot-shrodingera-team/germes-generators/show_stake/clearCoupon';
import getStakeCount from '../stake_info/getStakeCount';

const clearCoupon = clearCouponGenerator({
  clearMode: 'one and all',
  clearAllSelector: '.coupon__settings button',
  clearSingleSelector: '.coupon__bets button',
  getStakeCount,
});

export default clearCoupon;
