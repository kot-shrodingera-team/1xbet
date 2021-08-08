import {
  checkBookerHost,
  checkCurrency,
  getElement,
  log,
} from '@kot-shrodingera-team/germes-utils';
import {
  NewUrlError,
  JsFailError,
} from '@kot-shrodingera-team/germes-utils/errors';
import getSiteCurrency from '../helpers/getSiteCurrency';
import checkAuth, { authStateReady } from '../stake_info/checkAuth';
import { balanceReady, gRefreshBalance } from '../stake_info/getBalance';

const preOpenEvent = async (): Promise<void> => {
  /* ======================================================================== */
  /*                     Проверка адреса открытой страницы                    */
  /* ======================================================================== */

  if (!checkBookerHost()) {
    log('Открыта не страница конторы (или зеркала)', 'crimson');
    log(`${window.location.href} !== ${worker.BookmakerMainUrl}`, 'crimson');
    window.location.href = new URL(worker.BookmakerMainUrl).href;
    throw new NewUrlError('Открываем страницу БК');
  }

  /* ======================================================================== */
  /*                 Проверка авторизации и обновление баланса                */
  /* ======================================================================== */

  await authStateReady();
  worker.Islogin = checkAuth();
  worker.JSLogined();
  if (!worker.Islogin) {
    throw new JsFailError('Нет авторизации');
  }
  log('Есть авторизация', 'steelblue');
  await balanceReady();
  await gRefreshBalance();

  /* ======================================================================== */
  /*                              Проверка валюты                             */
  /* ======================================================================== */

  const siteCurrency = getSiteCurrency();
  checkCurrency(siteCurrency);

  /* ======================================================================== */
  /*                         Проверка, что открыт Лайв                        */
  /* ======================================================================== */

  if (!/\/live/.test(window.location.pathname)) {
    log('Открыт не Live', 'crimson');
    window.location.pathname = '/ru/live/';
    throw new NewUrlError('Переходим на Live');
  } else {
    log('Открыт Live', 'steelblue');
    const betslip = await getElement('.coupon', 15000);
    if (!betslip) {
      throw new JsFailError('Купон не появился');
    }
  }
};

export default preOpenEvent;
