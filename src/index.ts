import { pipeHwlToConsole } from '@kot-shrodingera-team/config/util';
import showStake from './show_stake';
import getStakeInfo from './callbacks/getStakeInfo';
import setStakeSum from './callbacks/setStakeSum';
import doStake from './callbacks/doStake';
import checkCouponLoading from './callbacks/checkCouponLoading';
import checkStakeStatus from './callbacks/checkStakeStatus';
import initialize from './initialization';

pipeHwlToConsole();

(async (): Promise<void> => {
  worker.Helper.WriteLine('Начали');
  if (!worker.IsShowStake) {
    initialize();
  } else {
    showStake();
  }
})();
worker.SetCallBacks(
  console.log,
  getStakeInfo,
  setStakeSum,
  doStake,
  checkCouponLoading,
  checkStakeStatus
);

const fastLoad = (): void => {
  worker.Helper.LoadUrl(worker.EventUrl.replace(/_/g, '-'));
};

worker.SetFastCallback(fastLoad);
