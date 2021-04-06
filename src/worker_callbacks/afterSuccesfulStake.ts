import getCoefficientGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getCoefficient';
import { getWorkerParameter, log } from '@kot-shrodingera-team/germes-utils';
// import getCoefficient from '../stake_info/getCoefficient';

const getResultCoefficientText = (): string => {
  const resultCoefficientTitle = [
    ...document.querySelectorAll('.coupon__text'),
  ].find((element) => element.textContent.trim() === 'Итоговый коэффициент');
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
  return resultCoefficientElement.textContent.trim();
};

const getResultCoefficient = getCoefficientGenerator({
  coefficientSelector: '',
  getCoefficientText: getResultCoefficientText,
  // replaceDataArray: [
  //   {
  //     searchValue: '',
  //     replaceValue: '',
  //   },
  // ],
  // removeRegex: /[\s,']/g,
  // coefficientRegex: /(\d+(?:\.\d+)?)/,
  // context: () => document,
});

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
