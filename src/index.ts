import '@kot-shrodingera-team/worker-declaration/workerCheck';
import { log } from '@kot-shrodingera-team/germes-utils';
import getStakeInfo from './worker_callbacks/getStakeInfo';
import setStakeSum from './worker_callbacks/setStakeSum';
import doStake from './worker_callbacks/doStake';
import checkCouponLoading from './worker_callbacks/checkCouponLoading';
import checkStakeStatus from './worker_callbacks/checkStakeStatus';
import afterSuccesfulStake from './worker_callbacks/afterSuccesfulStake';
import fastLoad from './fastLoad';
import initialize from './initialization';
import showStake from './show_stake';

worker.SetCallBacks(
  log,
  getStakeInfo,
  setStakeSum,
  doStake,
  checkCouponLoading,
  checkStakeStatus,
  afterSuccesfulStake
);

worker.SetFastCallback(fastLoad);

(async (): Promise<void> => {
  if (localStorage.getItem('couponOpening') === '1' && worker.IsShowStake) {
    log('Загрузка страницы с открытием купона', 'steelblue');
    showStake();
  } else if (!worker.IsShowStake) {
    log('Загрузка страницы с авторизацией', 'steelblue');
    initialize();
  } else {
    log('Загрузка страницы без открытия купона', 'steelblue');
  }
})();
