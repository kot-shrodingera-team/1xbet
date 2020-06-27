import { fireEvent } from '@kot-shrodingera-team/config/util';

const setStakeSum = (sum: number): boolean => {
  worker.Helper.WriteLine(`Вводим сумму ставки: ${sum}`);
  const inputElement = document.querySelector(
    'input.bet_sum_input'
  ) as HTMLInputElement;
  if (!inputElement) {
    worker.Helper.WriteLine('Поле ввода ставки не найдено');
    return false;
  }
  inputElement.value = String(sum);
  fireEvent(inputElement, 'input');
  worker.StakeInfo.Summ = sum;
  return true;
};

export default setStakeSum;
