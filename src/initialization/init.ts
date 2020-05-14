import { log } from '../logger';
import { authX, checkAuth } from './auth';
import { updateBalance } from './balance';
import { getElement } from '@kot-shrodingera-team/config/util';

export async function init(): Promise<void> {
  if (worker.LoginTry > 3) {
    log('Превышен лимит попыток авторизации');
    worker.Islogin = false;
    return;
  }
  await getElement('#loc_info', 3000);
  await getElement('.games_content', 5000);
  if (checkAuth()) {
    log('Вы успешно авторизованы');
    worker.Islogin = true;
    worker.JSLogined();
    updateBalance();
    return;
  } else {
    await getElement('#cxl-badge', 5000);
    await authX(worker.Login, worker.Password);
    log('Попытка авторизоваться № ' + worker.LoginTry);
    worker.LoginTry++;
    return;
  }
}
