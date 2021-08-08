import checkStakeEnabledGenerator from '@kot-shrodingera-team/germes-generators/stake_info/checkStakeEnabled';
import getStakeCount from './getStakeCount';

// const preCheck = (): boolean => {
//   return true;
// };

const checkStakeEnabled = checkStakeEnabledGenerator({
  // preCheck,
  getStakeCount,
  // betCheck: {
  //   selector: '',
  //   errorClasses: [
  //     {
  //       className: '',
  //       message: '',
  //     },
  //   ],
  // },
  errorsCheck: [
    {
      selector: '.c-bet-box--blocked',
      message: 'заблокирована',
    },
    {
      selector: '.error__message-container',
      message: 'есть ошибка',
    },
  ],
  // context: () => document,
});

export default checkStakeEnabled;
