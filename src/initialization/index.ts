import initializeGenerator from '@kot-shrodingera-team/germes-generators/initialization/initialize';
import checkAuth, { authStateReady } from '../stake_info/checkAuth';
import { balanceReady, updateBalance } from '../stake_info/getBalance';
import authorize from './authorize';

const initialize = initializeGenerator({
  authStateReady,
  checkAuth,
  balanceReady,
  updateBalance,
  authorize,
});

export default initialize;
