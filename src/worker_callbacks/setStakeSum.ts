import setStakeSumGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/setStakeSum';

const setStakeSum = setStakeSumGenerator({
  sumInputSelector: 'input.bet_sum_input',
});

export default setStakeSum;
