const getCurrentSum = (): number => {
  const sumInput = document.querySelector(
    'input.bet_sum_input'
  ) as HTMLInputElement;
  if (!sumInput) {
    worker.Helper.WriteLine('Не найдено поле ввода суммы ставки');
    return 0;
  }
  const sumText = sumInput.value;
  const sum = Number(sumText);
  if (Number.isNaN(sum)) {
    worker.Helper.WriteLine(
      `Непонятный формат текущей суммы ставки: ${sumText}`
    );
    return 0;
  }
  return sum;
};

export default getCurrentSum;
