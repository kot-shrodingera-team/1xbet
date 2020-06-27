import { getElement } from '@kot-shrodingera-team/config/util';

const authCheckReady = async (timeout = 5000): Promise<void> => {
  await Promise.race([
    getElement('#curLoginForm', timeout),
    getElement('.submenu_link[href="office/account/"]', timeout),
  ]);
};

export default authCheckReady;
