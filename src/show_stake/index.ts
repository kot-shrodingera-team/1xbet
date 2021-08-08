import showStakeGenerator from '@kot-shrodingera-team/germes-generators/show_stake';
import { clearGermesData } from '../bookmakerApi';
import getCoefficient from '../stake_info/getCoefficient';
import getMaximumStake from '../stake_info/getMaximumStake';
import openBet from './openBet';
import openEvent from './openEvent';
import preOpenBet from './preOpenBet';
import preOpenEvent from './preOpenEvent';
import setBetAcceptMode from './setBetAcceptMode';

const showStake = showStakeGenerator({
  clearGermesData,
  preOpenEvent,
  openEvent,
  preOpenBet,
  openBet,
  setBetAcceptMode,
  getMaximumStake,
  getCoefficient,
});

export default showStake;
