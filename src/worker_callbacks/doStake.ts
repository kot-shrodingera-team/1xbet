import { doStakeGenerator } from '@kot-shrodingera-team/germes-generators/worker_callbacks';
import getCoefficient from '../stake_info/getCoefficient';
import { clearDoStakeTime } from '../stake_info/doStakeTime';

const doStake = doStakeGenerator({
  doStakeButtonSelector: '.coupon-btn-group__item .c-btn',
  getCoefficient,
  clearDoStakeTime,
});

export default doStake;
