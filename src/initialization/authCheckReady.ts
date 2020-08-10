import authCheckReadyGenerator from '@kot-shrodingera-team/germes-generators/initialization/authCheckReady';

const authCheckReady = authCheckReadyGenerator({
  authFormSelector: '#curLoginForm',
  accountSelector: '.submenu_link[href="office/account/"]',
});

export default authCheckReady;
