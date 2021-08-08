import {
  log,
  repeatingOpenBet,
  sleep,
} from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import { maximumStakeReady } from '../stake_info/getMaximumStake';
import getStakeCount from '../stake_info/getStakeCount';
import clearCoupon from './clearCoupon';

const openBet = async (): Promise<void> => {
  /* ======================================================================== */
  /*                              Очистка купона                              */
  /* ======================================================================== */

  const couponCleared = await clearCoupon();
  if (!couponCleared) {
    throw new JsFailError('Не удалось очистить купон');
  }

  /* ======================================================================== */
  /*                      Формирование данных для поиска                      */
  /* ======================================================================== */

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
    NBs: nameBet,
    SSI: subSportId,
  } = JSON.parse(worker.BetId);

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

  if (!window.store_global || !window.store_global.dispatch) {
    throw new JsFailError('Не найден диспетчер');
  }
  const { dispatch } = window.store_global;

  /* ======================================================================== */
  /*           Открытие ставки, проверка, что ставка попала в купон           */
  /* ======================================================================== */

  const openingAction = async () => {
    dispatch('coupon/ACTION_ADD_BET', data);
  };
  await repeatingOpenBet(openingAction, getStakeCount, 5, 1000, 50);

  /* ======================================================================== */
  /*                  Ожидание появления максимальной ставки                  */
  /* ======================================================================== */

  const maximumStakeLoaded = await maximumStakeReady();
  if (!maximumStakeLoaded) {
    throw new JsFailError('Максимальная ставка не появилась');
  }
  await sleep(0); // Чтобы успели обновится данные в купоне? желательно перепроверить нужность

  /* ======================================================================== */
  /*                    Вывод информации об открытой ставке                   */
  /* ======================================================================== */

  const eventNameSelector = '.c-bet-box__teams > .c-bet-box__row_full';
  const teamOneSelector =
    '.c-bet-box__teams > div >.c-bet-box__row:nth-child(1)';
  const teamTwoSelector =
    '.c-bet-box__teams > div > .c-bet-box__row:nth-child(2)';
  const betNameSelector = '.c-bet-box__market';

  const eventNameElement = document.querySelector(eventNameSelector);
  const teamTwoElement = document.querySelector(teamTwoSelector);
  const teamOneElement = document.querySelector(teamOneSelector);
  const betNameElement = document.querySelector(betNameSelector);

  if (!eventNameElement && (!teamTwoElement || !teamOneElement)) {
    throw new JsFailError('Не найдено название события');
  }
  if (!betNameElement) {
    throw new JsFailError('Не найдена роспись открытой ставки');
  }

  const eventName = (() => {
    if (eventNameElement) {
      return eventNameElement.textContent.trim();
    }
    const teamOne = teamOneElement.textContent.trim();
    const teamTwo = teamTwoElement.textContent.trim();
    return `${teamOne} - ${teamTwo}`;
  })();
  const betName = betNameElement.textContent.trim();

  log(`Открыта ставка\n${eventName}\n${betName}`, 'steelblue');
};

export default openBet;
