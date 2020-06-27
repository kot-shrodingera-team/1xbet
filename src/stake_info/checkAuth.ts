function checkAuth(): boolean {
  const accountMenu = document.querySelector(
    '.submenu_link[href="office/account/"]'
  );
  return Boolean(accountMenu);
}

export default checkAuth;
