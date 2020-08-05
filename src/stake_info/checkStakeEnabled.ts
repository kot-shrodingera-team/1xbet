import { checkStakeEnabledGenerator } from '@kot-shrodingera-team/germes-generators/stake_info';

const checkStakeEnabled = checkStakeEnabledGenerator({
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
