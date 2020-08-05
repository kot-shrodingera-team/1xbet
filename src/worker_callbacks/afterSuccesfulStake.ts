import { log } from '@kot-shrodingera-team/germes-utils';

const afterSuccesfulStake = (): void => {
  const resultCoefficientTitle = [
    ...document.querySelectorAll('.coupon__text'),
  ].find((element) => element.textContent.trim() === 'Итоговый коэффициент');
  if (!resultCoefficientTitle) {
    log(
      'Ошибка обновления коэффициента после успешной ставки: не найден заголовок блока итогового коэффициента',
      'crimson'
    );
    return;
  }
  const resultCoefficientElement = resultCoefficientTitle.nextElementSibling;
  if (!resultCoefficientElement) {
    log(
      'Ошибка обновления коэффициента после успешной ставки: не найден итоговый коэффициент',
      'crimson'
    );
    return;
  }
  const resultCoefficientText = resultCoefficientElement.textContent.trim();
  const resultCoefficient = Number(resultCoefficientText);
  if (Number.isNaN(resultCoefficient)) {
    log(
      `Ошибка обновления коэффициента после успешной ставки: непонятный формат коэффициента: "${resultCoefficientText}"`,
      'crimson'
    );
    return;
  }
  if (resultCoefficient !== worker.StakeInfo.Coef) {
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
