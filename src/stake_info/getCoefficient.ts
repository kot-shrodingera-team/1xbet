import { getCoefficientGenerator } from '@kot-shrodingera-team/germes-generators/stake_info';

const getCoefficient = getCoefficientGenerator({
  coefficientSelector: '.c-bet-box__bet',
});

export default getCoefficient;
