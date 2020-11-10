import { log, ri } from '@kot-shrodingera-team/germes-utils';

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
  const parameterRegex = ri`(?:^|\s)${betParameter}(?:$|\s[МБ])`;
  const filteredBets = marketBets.filter((bet) => {
    const betText = bet.textContent.trim();
    return parameterRegex.test(betText);
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
  const bet = filteredBets[0];
  const parentDiv = bet.parentElement;
  if (parentDiv && [...parentDiv.classList].includes('blockSob')) {
    log('Ставка заблокирована', 'red');
    return null;
  }
  return bet;
};

export default findBet;
