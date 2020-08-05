import { checkAuthGenerator } from '@kot-shrodingera-team/germes-generators/stake_info';

const checkAuth = checkAuthGenerator({
  accountSelector: '.submenu_link[href="office/account/"]',
});

export default checkAuth;
