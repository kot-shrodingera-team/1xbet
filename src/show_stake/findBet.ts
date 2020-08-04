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
    worker.Helper.WriteLine('Не найдены ставки по нужному маркету');
    return null;
  }
  worker.Helper.WriteLine(
    `По нужному маркету найдено ставок: ${marketBets.length}`
  );
  if (betParameter === 'null') {
    if (marketBets.length > 1) {
      worker.Helper.WriteLine(
        'Найдено больше одной ставки по данному маркету (без параметра)'
      );
      return null;
    }
    return marketBets[0];
  }
  const filteredBets = marketBets.filter((bet) => {
    return bet.textContent.trim().includes(betParameter);
  });
  if (filteredBets.length === 0) {
    worker.Helper.WriteLine(
      'Не найдены ставки по нужному маркету с нужным параметром'
    );
    return null;
  }
  if (filteredBets.length > 1) {
    worker.Helper.WriteLine('Найдено больше одной ставки с данным параметром');
    return null;
  }
  worker.Helper.WriteLine('Нужная ставка найдена');
  return filteredBets[0];
};

export default findBet;
