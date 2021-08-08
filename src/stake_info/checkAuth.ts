import checkAuthGenerator, {
  authStateReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/checkAuth';

export const noAuthElementSelector = '.curloginDropTop';
export const authElementSelector =
  '.submenu_link[href="office/account/"], .top-acc__btn_office'; // .top-acc__btn_office для клона https://xparibet.com/

export const authStateReady = authStateReadyGenerator({
  noAuthElementSelector,
  authElementSelector,
  // maxDelayAfterNoAuthElementAppeared: 0,
  // context: () => document,
});

const checkAuth = checkAuthGenerator({
  authElementSelector,
  // context: () => document,
});

export default checkAuth;
