import getStakeInfoValueGenerator, {
  stakeInfoValueReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getStakeInfoValue';
import { StakeInfoValueOptions } from '@kot-shrodingera-team/germes-generators/stake_info/types';

export const sumInputSelector = 'input.bet_sum_input';

const currentSumOptions: StakeInfoValueOptions = {
  name: 'currentSum',
  // fixedValue: () => 0,
  valueFromText: {
    text: {
      // getText: () => '',
      selector: sumInputSelector,
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
  zeroValues: [''],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // modifyValue: (value: number, extractType: string) => value,
  // disableLog: false,
};

const getCurrentSum = getStakeInfoValueGenerator(currentSumOptions);

export const currentSumReady = stakeInfoValueReadyGenerator(currentSumOptions);

export default getCurrentSum;
