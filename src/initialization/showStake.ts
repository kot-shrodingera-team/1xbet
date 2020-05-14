import { log } from '../logger';
import { checkAuth } from './auth';
import { updateBalance } from './balance';
import { getElement } from '@kot-shrodingera-team/config/util';

export async function showStake(): Promise<void> {
  if (typeof worker == 'undefined') {
    log('worker не найден! Перезагружаем страницу');
    location.reload();
  }
  log('Ожидаем загрузку страницы');
  await waitLoadPage();
}

async function waitLoadPage(): Promise<void> {
  await getElement('#loc_info', 3000);
  await getElement('.games_content', 5000);
  await getElement('#cxl-badge', 5000);
}
