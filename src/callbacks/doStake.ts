import { log } from '../logger';
export function doStake(): boolean {
  const button = document.querySelector(
    'div.footer-controls > div > button'
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
