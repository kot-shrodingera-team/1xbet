import { log } from '../logger';

export function getBalance(): number {
  const balance = document.querySelector('.top-b-acc__amount');
  if (!balance) {
    log('Не удалось найти поле баланса');
  }
  return Number(balance.textContent);
}

export function updateBalance(): void {
  worker.JSBalanceChange(getBalance());
}
