import { getCurrentSumGenerator } from '@kot-shrodingera-team/germes-generators/stake_info';

const getCurrentSum = getCurrentSumGenerator({
  sumInput: 'input.bet_sum_input',
});

export default getCurrentSum;
