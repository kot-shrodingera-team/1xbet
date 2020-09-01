import getMaximumStakeGenerator, {
  maximumStakeReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getMaximumStake';

export const maximumStakeReady = maximumStakeReadyGenerator({
  maximumStakeElementSelector: '.coupon__bet-settings button:nth-child(2)',
});

const getMaximumStake = getMaximumStakeGenerator({
  maximumStakeElementSelector: '.coupon__bet-settings button:nth-child(2)',
});

export default getMaximumStake;
