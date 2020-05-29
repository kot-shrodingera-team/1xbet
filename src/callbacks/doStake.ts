import { log } from '../logger';
export function doStake(): boolean {
  const button = document.querySelector(
    '.coupon-btn-group__item .c-btn'
  ) as HTMLButtonElement;
  if (button) {
    button.click();
    log('Нажали по кнопке в купоне');
    return true;
  } else {
    log('Кнопка в купоне не найдена');
    return false;
  }
}
