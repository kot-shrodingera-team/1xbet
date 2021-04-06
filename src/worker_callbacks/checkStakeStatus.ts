import checkStakeStatusGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/checkStakeStatus';
import { updateBalance } from '../stake_info/getBalance';

const checkStakeStatus = checkStakeStatusGenerator({
  getProcessingStep: () => window.germesData.betProcessingStep,
  updateBalance,
});

export default checkStakeStatus;
