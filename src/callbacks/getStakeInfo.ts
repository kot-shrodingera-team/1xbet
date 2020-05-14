import { checkAuth } from '../initialization/auth';
import {
  getMaxStake,
  getMinStake,
  getStakeCount,
  getSumFromStake,
  checkIsEnabled,
  getCoefFromCoupon,
  getParametrFromCoupon,
} from '../stake-functions';
import { getBalance } from '../initialization/balance';
import { log } from '../logger';

export function getStakeInfo(): string {
  worker.StakeInfo.Auth = checkAuth();
  worker.StakeInfo.StakeCount = getStakeCount();
  worker.StakeInfo.Balance = getBalance();
  worker.StakeInfo.MinSumm = getMinStake();
  worker.StakeInfo.MaxSumm = getMaxStake();
  worker.StakeInfo.Summ = getSumFromStake();
  worker.StakeInfo.IsEnebled = checkIsEnabled();
  if (worker.StakeInfo.StakeCount === 1) {
    worker.StakeInfo.Coef = getCoefFromCoupon();
    worker.StakeInfo.Parametr = Number(getParametrFromCoupon());
  } else {
    log('Ошибка в кол-ве открытых купонов!');
    return;
  }

  return JSON.stringify(worker.StakeInfo);
}
