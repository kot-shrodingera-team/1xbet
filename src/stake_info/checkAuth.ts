import checkAuthGenerator from '@kot-shrodingera-team/germes-generators/stake_info/checkAuth';

const checkAuth = checkAuthGenerator({
  accountSelector: '.submenu_link[href="office/account/"]',
});

export default checkAuth;
