import getBalance, {
  balanceReady,
  updateBalance,
} from '../stake_info/getBalance';
import checkAuth from '../stake_info/checkAuth';
import authCheckReady from './authCheckReady';
import authorize from './authorize';

const initialize = async (): Promise<void> => {
  if (worker.LoginTry > 3) {
    worker.Helper.WriteLine('Превышен лимит попыток авторизации');
    return;
  }

  await authCheckReady();
  worker.Islogin = checkAuth();
  worker.JSLogined();
  if (worker.Islogin) {
    worker.Helper.WriteLine('Есть авторизация');
    worker.Islogin = true;
    worker.JSLogined();
    const balanceLoaded = await balanceReady();
    if (!balanceLoaded) {
      worker.Helper.WriteLine(`Баланс не появился (${getBalance()})`);
    } else {
      updateBalance();
    }
    return;
  }
  authorize();
};

export default initialize;
