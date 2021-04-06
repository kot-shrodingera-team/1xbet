const afterSuccesfulLogin = async (): Promise<void> => {
  // Сброс флага активности открытия купона, если было какое-то зависание
  localStorage.setItem('couponOpening', '0');
};

export default afterSuccesfulLogin;
