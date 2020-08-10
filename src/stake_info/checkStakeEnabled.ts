import checkStakeEnabledGenerator from '@kot-shrodingera-team/germes-generators/stake_info/checkStakeEnabled';
import getStakeCount from './getStakeCount';

const checkStakeEnabled = checkStakeEnabledGenerator({
  getStakeCount,
  errorsCheck: [
    {
      selector: '.c-bet-box--blocked',
      message: 'box--blocked',
    },
    {
      selector: '.error__message-container',
      message: 'error__message',
    },
  ],
});

export default checkStakeEnabled;
