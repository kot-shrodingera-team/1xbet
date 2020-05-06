import { log } from '../logger';
import { auth, checkAuth } from './auth';
import { updateBalance } from './balance';
import { awaiter } from '@kot-shrodingera-team/config/util';

export async function init(): Promise<void> {
  if (worker.LoginTry > 3) {
    log('Превышен лимит попыток авторизации');
    worker.Islogin = false;
    return;
  }

  await awaiter(waitCoupon as any);
  if (checkAuth()) {
    log('Вы успешно авторизованы');
    worker.Islogin = true;
    worker.JSLogined();
    updateBalance();
    return;
  } else {
    auth(worker.Login, worker.Password);
    log('Попытка авторизоваться № ' + worker.LoginTry);
    worker.LoginTry++;
    return;
  }
}

function waitCoupon(): Boolean {
  return Boolean(document.querySelector('.coupon__bets'));
}
