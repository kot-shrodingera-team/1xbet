import { log, text } from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import goToHistoryTab from './goToHistoryTab';

const getLastBetId = async (): Promise<string> => {
  await goToHistoryTab();
  const emptyBets = document.querySelector(
    '.coupon__bets--opened .coupon__no-bets'
  );
  const lastBet = document.querySelector(
    '.coupon__bets--opened .c-bet-box--done'
  );
  if (!emptyBets && !lastBet) {
    throw new JsFailError('Не дождались загрузки истории ставок (!)');
  }
  if (emptyBets) {
    log('История ставок пуста', 'cadetblue', true);
    return null;
  }
  const lastBetIdElement = lastBet.querySelector(
    '.c-bet-box__header .u-upcase.u-fw-700'
  );
  if (!lastBetIdElement) {
    throw new JsFailError('Не найден заголовок последней ставки');
  }
  const lastBetIdText = text(lastBetIdElement);
  const lastBetIdMatch = lastBetIdText.match(/(\d+)$/);
  if (!lastBetIdMatch) {
    throw new JsFailError(
      `Не найден номер купона в заголовке: "${lastBetIdText}"`
    );
  }
  const lastBetId = lastBetIdMatch[1];
  log(
    `Номер купона последней успешной ставки: ${lastBetId}`,
    'cadetblue',
    true
  );
  return lastBetId;
};

export default getLastBetId;
