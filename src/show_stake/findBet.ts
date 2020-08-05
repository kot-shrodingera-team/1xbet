import { log } from '@kot-shrodingera-team/germes-utils';

const findBet = (
  gameId: string,
  marketId: string,
  betParameter: string
): HTMLElement => {
  const marketBets = [
    ...document.querySelectorAll(
      `#allBetsTable[data-gameid="${gameId}"] > .bet_group_col span[data-type="${Number(
        marketId
      )}"]`
    ),
  ] as HTMLElement[];
  if (marketBets.length === 0) {
    log('Не найдены ставки по нужному маркету', 'red');
    return null;
  }
  log(`По нужному маркету найдено ставок: ${marketBets.length}`, 'steelblue');
  if (betParameter === 'null') {
    if (marketBets.length > 1) {
      log(
        'Найдено больше одной ставки по данному маркету (без параметра)',
        'red'
      );
      return null;
    }
    return marketBets[0];
  }
  const filteredBets = marketBets.filter((bet) => {
    return bet.textContent.trim().includes(betParameter);
  });
  if (filteredBets.length === 0) {
    log('Не найдены ставки по нужному маркету с нужным параметром', 'red');
    return null;
  }
  if (filteredBets.length > 1) {
    log('Найдено больше одной ставки с данным параметром', 'red');
    return null;
  }
  log('Нужная ставка найдена', 'steelblue');
  return filteredBets[0];
};

export default findBet;
