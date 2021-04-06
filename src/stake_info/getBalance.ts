import {
  balanceReadyGenerator,
  getBalanceGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getBalance';

export const balanceSelector = '.top-b-acc__amount';
// const balanceRegex = /(\d+(?:\.\d+)?)/;
// const replaceDataArray = [
//   {
//     searchValue: '',
//     replaceValue: '',
//   },
// ];
// const removeRegex = /[\s,']/g;

export const balanceReady = balanceReadyGenerator({
  balanceSelector,
  // balanceRegex,
  // replaceDataArray,
  // removeRegex,
  // context: () => document,
});

const getBalance = getBalanceGenerator({
  balanceSelector,
  // balanceRegex,
  // replaceDataArray,
  // removeRegex,
  // context: () => document,
});

export const updateBalance = (): void => {
  worker.JSBalanceChange(getBalance());
};

export default getBalance;
