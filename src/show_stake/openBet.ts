import {
  log,
  repeatingOpenBet,
  sleep,
} from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import { maximumStakeReady } from '../stake_info/getMaximumStake';
import getStakeCount from '../stake_info/getStakeCount';

const openBet = async (): Promise<void> => {
  // Получение данных из меты
  const {
    gameid: gameId,
    // marketId,
    C,
    G,
    P,
    T,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    SN: sport_name,
    GN: gameNum,
    BK_league: gameChamp,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    id_sport,
    Opp1Id,
    Opp2Id,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Opp1Img: Opp1Image,
    Opp2Img: Opp2Image,
    NG: nameGroup,
    NB: nameBet,
    SSI: subSportId,
  } = JSON.parse(worker.BetId);

  // Формирование данных для поиска
  const data = {
    bet: {
      ACT: 0,
      B: '',
      C,
      CE: 1,
      CV: null as unknown,
      G,
      P: P || 0,
      PV: null as unknown,
      Pl: null as unknown,
      T,
      sport_name,
      gameNum,
      gameChamp,
      id_sport,
      opp1: worker.TeamOne,
      opp2: worker.TeamTwo,
      Opp1Id,
      Opp2Id,
      Opp1Image,
      Opp2Image,
      GameId: String(gameId),
      sportNameText: `${gameNum}. ${sport_name} ${gameChamp}`,
      opp: `${worker.TeamOne} - ${worker.TeamTwo}`,
      nameGroup,
      nameBet,
      Direction: 1,
      InstrumentId: 0,
      Seconds: 0,
      Price: 0,
      Expired: 0,
      subSportId: subSportId || '',
    },
    is_skip_one_click: false,
  };

  if (!store_global || !store_global.dispatch) {
    throw new JsFailError('Не найден диспетчер');
  }
  log('Есть диспетчер', 'white', true);
  const { dispatch } = store_global;

  // Открытие ставки, проверка, что ставка попала в купон
  const openingAction = async () => {
    dispatch('coupon/ACTION_ADD_BET', data);
  };
  await repeatingOpenBet(openingAction, getStakeCount, 5, 1000, 50);

  const maximumStakeLoaded = await maximumStakeReady();
  if (!maximumStakeLoaded) {
    throw new JsFailError('Максимальная ставка не появилась');
  }
  await sleep(0);

  const teamOneSelector = '.c-bet-box__col > .c-bet-box__row:nth-child(1)';
  const teamTwoSelector = '.c-bet-box__col > .c-bet-box__row:nth-child(2)';
  const betNameSelector = '.c-bet-box__market';

  const teamOneElement = document.querySelector(teamOneSelector);
  if (!teamOneElement) {
    throw new JsFailError('Не найдено название первой команды');
  }
  const teamTwoElement = document.querySelector(teamTwoSelector);
  if (!teamTwoElement) {
    throw new JsFailError('Не найдено название второй команды');
  }
  const betNameElement = document.querySelector(betNameSelector);
  if (!betNameElement) {
    throw new JsFailError('Не найдена роспись открытой ставки');
  }

  const teamOne = teamOneElement.textContent.trim();
  const teamTwo = teamTwoElement.textContent.trim();
  const betName = betNameElement.textContent.trim();
  log(`Открыта ставка\n${teamOne} - ${teamTwo}\n${betName}`, 'steelblue');
};

export default openBet;
