import { getStakeCountGenerator } from '@kot-shrodingera-team/germes-generators/stake_info';

const getStakeCount = getStakeCountGenerator({
  stakeElementSelector: '.c-bet-box',
});

export default getStakeCount;
