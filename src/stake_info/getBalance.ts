import getStakeInfoValueGenerator, {
  stakeInfoValueReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getStakeInfoValue';
import { StakeInfoValueOptions } from '@kot-shrodingera-team/germes-generators/stake_info/types';
import { getWorkerParameter, log } from '@kot-shrodingera-team/germes-utils';

export const balanceSelector = '.top-b-acc__amount';

const balanceOptions: StakeInfoValueOptions = {
  name: 'balance',
  // fixedValue: () => 0,
  valueFromText: {
    text: {
      // getText: () => '',
      selector: balanceSelector,
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

const getBalance = getStakeInfoValueGenerator(balanceOptions);

export const balanceReady = stakeInfoValueReadyGenerator(balanceOptions);

export const updateBalance = (): void => {
  worker.StakeInfo.Balance = getBalance();
  worker.JSBalanceChange(getBalance());
};

export const gRefreshBalance = async (): Promise<void> => {
  if (!getWorkerParameter('fakeAuth')) {
    const refreshBalanceButton = document.querySelector<HTMLElement>(
      '.show_bonusProgress'
    );
    if (refreshBalanceButton) {
      log('Обновляем баланс', 'orange');
      refreshBalanceButton.click();
    } else {
      log('Не найдена кнопка обновления баланса', 'crimson');
    }
    updateBalance();
  }
};

export default getBalance;
