import setStakeSumGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/setStakeSum';
import { sumInputSelector } from '../stake_info/getCurrentSum';

// const preInputCheck = (sum: number): boolean => {
//   return true;
// };

const setStakeSum = setStakeSumGenerator({
  sumInputSelector,
  // alreadySetCheck: {
  //   falseOnSumChange: false,
  // },
  // preInputCheck,
  // inputType: 'fireEvent',
  // fireEventNames: ['input'],
  // context: () => document,
});

export default setStakeSum;
