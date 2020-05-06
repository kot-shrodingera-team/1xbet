import { init, showStake } from './initialization';
import * as callback from './callbacks';

if (worker.IsShowStake) {
  setTimeout(showStake, 1000);
} else {
  setTimeout(init, 1000);
}
worker.SetCallBacks(
  console.log,
  callback.getStakeInfo,
  callback.setStakeSum,
  callback.doStake,
  callback.checkCouponLoading,
  callback.checkStakeStatus
);
