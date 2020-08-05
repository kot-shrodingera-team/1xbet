import { initializeGenerator } from '@kot-shrodingera-team/germes-generators/initialization';
import authCheckReady from './authCheckReady';
import checkAuth from '../stake_info/checkAuth';
import { balanceReady, updateBalance } from '../stake_info/getBalance';
import authorize from './authorize';

const initialize = initializeGenerator(
  authCheckReady,
  checkAuth,
  balanceReady,
  updateBalance,
  authorize
);

export default initialize;
