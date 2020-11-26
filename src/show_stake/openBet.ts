import { awaiter, log } from '@kot-shrodingera-team/germes-utils';
import getStakeCount from '../stake_info/getStakeCount';
import JsFailError from './errors/jsFailError';

const openBet = async (): Promise<void> => {
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

  const data = {
    bet: {
      ACT: 0,
      B: '',
      C,
      CE: 1,
      CV: null as unknown,
      G,
      P,
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
      GameId: gameId,
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

  const maxTryCount = 5;
  for (let i = 1; i <= maxTryCount; i += 1) {
    store_global.dispatch('coupon/ACTION_ADD_BET', data);
    // eslint-disable-next-line no-await-in-loop
    const betAdded = await awaiter(() => getStakeCount() === 1, 1000, 50);

    if (!betAdded) {
      if (i === maxTryCount) {
        throw new JsFailError('Ставка так и не попала в купон');
      }
      log(`Ставка не попала в купон (попытка ${i})`, 'steelblue');
    } else {
      log('Ставка попала в купон', 'steelblue');
      break;
    }
  }
};

export default openBet;
