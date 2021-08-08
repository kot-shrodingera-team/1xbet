import getStakeInfoValueGenerator, {
  stakeInfoValueReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getStakeInfoValue';
import { StakeInfoValueOptions } from '@kot-shrodingera-team/germes-generators/stake_info/types';
// import getBalance from './getBalance';

export const maximumStakeSelector = '.coupon__bet-settings button:nth-child(2)';

const maximumStakeOptions: StakeInfoValueOptions = {
  name: 'maximumStake',
  // fixedValue: () => getBalance(),
  valueFromText: {
    text: {
      // getText: () => '',
      selector: maximumStakeSelector,
      // context: () => document,
    },
    // replaceDataArray: [
    //   {
    //     searchValue: '',
    //     replaceValue: '',
    //   },
    // ],
    // removeRegex: /[\s,']/g,
    // matchRegex: /(\d+(?:\.\d+)?)/,
    errorValue: 0,
  },
  // zeroValues: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // modifyValue: (value: number, extractType: string) => value,
  // disableLog: false,
};

const getMaximumStake = getStakeInfoValueGenerator(maximumStakeOptions);

export const maximumStakeReady =
  stakeInfoValueReadyGenerator(maximumStakeOptions);

export default getMaximumStake;
