import { log } from '../logger';
import { checkAuth } from './auth';
import { updateBalance } from './balance';

export async function showStake(): Promise<void> {
  if (typeof worker == 'undefined') {
    log('worker не найден! Перезагружаем страницу');
    location.reload();
  }
}
