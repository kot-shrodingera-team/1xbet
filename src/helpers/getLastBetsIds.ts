import { log, sleep, text } from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import goToHistoryTab from './goToHistoryTab';

const getLastBetsIds = async (): Promise<string[]> => {
  await goToHistoryTab();
  await sleep(1000);
  worker.TakeScreenShot(false);
  const emptyBets = document.querySelector(
    '.coupon__bets--opened .coupon__no-bets'
  );
  const lastBets = [
    ...document.querySelectorAll('.coupon__bets--opened .c-bet-box--done'),
  ];
  if (!emptyBets && !lastBets.length) {
    throw new JsFailError('Не дождались загрузки истории ставок (!)');
  }
  if (emptyBets) {
    log('История ставок пуста', 'steelblue');
    return [];
  }
  const lastBetsIds = lastBets.reduce((acc, currentValue, index) => {
    const betIdElement = currentValue.querySelector(
      '.c-bet-box__header .u-upcase.u-fw-700'
    );
    if (!betIdElement) {
      throw new JsFailError(`Не найден заголовок ставки №${index + 1}`);
    }
    const betIdText = text(betIdElement);
    const betIdMatch = betIdText.match(/(\d+)$/);
    if (!betIdMatch) {
      throw new JsFailError(
        `Не найден номер купона в заголовке ставки №${
          index + 1
        }: "${betIdText}"`
      );
    }
    const betId = betIdMatch[1];
    log(`Номер купона ставки №${index + 1}: ${betId}`, 'steelblue');
    acc.push(betId);
    return acc;
  }, []);
  return lastBetsIds;
};

export default getLastBetsIds;
