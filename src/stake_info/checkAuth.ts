import checkAuthGenerator, {
  authStateReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/checkAuth';

export const authStateReady = authStateReadyGenerator({
  noAuthElementSelector: '.curloginDropTop',
  authElementSelector: '.submenu_link[href="office/account/"]',
});

const checkAuth = checkAuthGenerator({
  authElementSelector: '.submenu_link[href="office/account/"]',
});

export default checkAuth;
