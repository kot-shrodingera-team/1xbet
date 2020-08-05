import { getMaximumStakeGenerator } from '@kot-shrodingera-team/germes-generators/stake_info';

const getMaximumStake = getMaximumStakeGenerator({
  maximumStakeElementSelector: '.coupon__bet-settings button:nth-child(2)',
});

export default getMaximumStake;
