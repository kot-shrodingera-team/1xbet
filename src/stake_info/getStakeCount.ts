import getStakeCountGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getStakeCount';

const getStakeCount = getStakeCountGenerator({
  stakeSelector: '.c-bet-box:not(.c-bet-box--done)',
  // context: () => document,
});

export default getStakeCount;
