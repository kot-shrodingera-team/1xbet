import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';

const setBetAcceptMode = async (): Promise<void> => {
  const betAcceptModes = [
    ...document.querySelectorAll<HTMLElement>(
      '.coupon__bet-settings .multiselect__content li.multiselect__element span'
    ),
  ];
  const mode = (() => {
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
    throw new JsFailError('Не найдена нужная опция режима принятия ставки');
  }
  mode.click();
};

export default setBetAcceptMode;
