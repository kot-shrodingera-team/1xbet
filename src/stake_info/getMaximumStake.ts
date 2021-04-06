import getMaximumStakeGenerator, {
  maximumStakeReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getMaximumStake';

const maximumStakeSelector = '.coupon__bet-settings button:nth-child(2)';
// const maximumStakeRegex = /(\d+(?:\.\d+)?)/;
// const replaceDataArray = [
//   {
//     searchValue: '',
//     replaceValue: '',
//   },
// ];
// const removeRegex = /[\s,']/g;

export const maximumStakeReady = maximumStakeReadyGenerator({
  maximumStakeSelector,
  // maximumStakeRegex,
  // replaceDataArray,
  // removeRegex,
  // context: () => document,
});

const getMaximumStake = getMaximumStakeGenerator({
  maximumStakeSelector,
  // maximumStakeRegex,
  // replaceDataArray,
  // removeRegex,
  // disableLog: false,
  // context: () => document,
});

export default getMaximumStake;
