import { getStakeInfoGenerator } from '@kot-shrodingera-team/germes-generators/worker_callbacks';
import checkAuth from '../stake_info/checkAuth';
import getStakeCount from '../stake_info/getStakeCount';
import getBalance from '../stake_info/getBalance';
import checkStakeEnabled from '../stake_info/checkStakeEnabled';
import getCoefficient from '../stake_info/getCoefficient';
import getParameter from '../stake_info/getParameter';
import getMinimumStake from '../stake_info/getMinimumStake';
import getMaximumStake from '../stake_info/getMaximumStake';
import getCurrentSum from '../stake_info/getCurrentSum';

const getStakeInfo = getStakeInfoGenerator(
  checkAuth,
  getStakeCount,
  getBalance,
  getMinimumStake,
  getMaximumStake,
  getCurrentSum,
  checkStakeEnabled,
  getCoefficient,
  getParameter
);

export default getStakeInfo;
