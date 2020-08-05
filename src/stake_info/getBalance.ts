import {
  balanceReadyGenerator,
  getBalanceGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info';

export const balanceReady = balanceReadyGenerator({
  balanceSelector: '.top-b-acc__amount',
});

const getBalance = getBalanceGenerator({
  balanceSelector: '.top-b-acc__amount',
});

export const updateBalance = (): void => {
  worker.JSBalanceChange(getBalance());
};

export default getBalance;
