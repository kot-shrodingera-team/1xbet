import { log } from '../logger';
import { fireEvent } from '@kot-shrodingera-team/config/util';

export function setStakeSum(sum: number): boolean {
  const sumInput = document.querySelector('.bet_sum_input') as HTMLInputElement;
  if (!sumInput) {
    log('Поле для ввода суммы не найдено');
    return false;
  }
  sumInput.value = sum.toString();
  fireEvent(sumInput, 'input');
  return true;
}
