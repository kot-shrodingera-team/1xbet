import getStakeInfoValueGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getStakeInfoValue';
import { StakeInfoValueOptions } from '@kot-shrodingera-team/germes-generators/stake_info/types';
import {
  getWorkerParameter,
  log,
  text,
} from '@kot-shrodingera-team/germes-utils';
// import getCoefficient from '../stake_info/getCoefficient';

const getResultCoefficientText = (): string => {
  const resultCoefficientTitle = [
    ...document.querySelectorAll('.coupon__text'),
  ].find((element) => text(element) === 'Итоговый коэффициент');
  if (!resultCoefficientTitle) {
    log(
      'Ошибка обновления коэффициента после успешной ставки: не найден заголовок блока итогового коэффициента',
      'crimson'
    );
    return null;
  }
  const resultCoefficientElement = resultCoefficientTitle.nextElementSibling;
  if (!resultCoefficientElement) {
    log(
      'Ошибка обновления коэффициента после успешной ставки: не найден итоговый коэффициент',
      'crimson'
    );
    return null;
  }
  return text(resultCoefficientElement);
};

// export const resultCoefficientSelector = '';

const resultCoefficientOptions: StakeInfoValueOptions = {
  name: 'coefficient',
  // fixedValue: () => 0,
  valueFromText: {
    text: {
      getText: getResultCoefficientText,
      // selector: resultCoefficientSelector,
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

const getResultCoefficient = getStakeInfoValueGenerator(
  resultCoefficientOptions
);

// const getResultCoefficient = getCoefficient;

const afterSuccesfulStake = (): void => {
  if (getWorkerParameter('fakeDoStake')) {
    return;
  }
  log('Обновление итогового коэффициента', 'steelblue');
  const resultCoefficient = getResultCoefficient();
  if (resultCoefficient && resultCoefficient !== worker.StakeInfo.Coef) {
    log(
      `Коеффициент изменился: ${worker.StakeInfo.Coef} => ${resultCoefficient}`,
      'orange'
    );
    worker.StakeInfo.Coef = resultCoefficient;
    return;
  }
  log('Коеффициент не изменился', 'lightblue');
};

export default afterSuccesfulStake;
