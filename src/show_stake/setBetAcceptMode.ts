const setBetAcceptMode = (): boolean => {
  const betAcceptModes = [
    ...document.querySelectorAll(
      '.coupon__bet-settings .multiselect__content li.multiselect__element span'
    ),
  ] as HTMLElement[];
  const mode = ((): HTMLElement => {
    switch (worker.StakeAcceptRuleShoulder) {
      case 0:
        return betAcceptModes.find(
          (element) => element.textContent.trim() === 'Подтверждать'
        );
      case 1:
        return betAcceptModes.find(
          (element) => element.textContent.trim() === 'Принять при повышении'
        );
      case 2:
        return betAcceptModes.find(
          (element) => element.textContent.trim() === 'Принять любое изменение'
        );
      default:
        return null;
    }
  })();
  if (!mode) {
    worker.Helper.WriteLine('Не найдена нужная опция режима принятия ставки');
    return false;
  }
  mode.click();
  return true;
};

export default setBetAcceptMode;