const afterSuccesfulStake = (): void => {
  const resultCoefficientTitle = [
    ...document.querySelectorAll('.coupon__text'),
  ].find((element) => element.textContent.trim() === 'Итоговый коэффициент');
  if (!resultCoefficientTitle) {
    worker.Helper.WriteLine(
      'Не найден заголовок блока итогового коэффициента в результате ставки'
    );
    return;
  }
  const resultCoefficientElement = resultCoefficientTitle.nextElementSibling;
  if (!resultCoefficientElement) {
    worker.Helper.WriteLine(
      'Не найден итоговый коэффициент в результате ставки'
    );
    return;
  }
  const resultCoefficientText = resultCoefficientElement.textContent.trim();
  const resultCoefficient = Number(resultCoefficientText);
  if (Number.isNaN(resultCoefficient)) {
    worker.Helper.WriteLine(
      `Непонятный формат итогового коэффициента в результате ставки: ${resultCoefficientText}`
    );
    return;
  }
  if (resultCoefficient !== worker.StakeInfo.Coef) {
    worker.Helper.WriteLine(
      `Коеффициент изменился: ${worker.StakeInfo.Coef} => ${resultCoefficient}`
    );
    worker.StakeInfo.Coef = resultCoefficient;
    return;
  }
  worker.Helper.WriteLine('Коеффициент не изменился');
};

export default afterSuccesfulStake;
