import {
  getWorkerParameter,
  log,
  ri,
  text,
} from '@kot-shrodingera-team/germes-utils';

const getParameter = (): number => {
  if (
    getWorkerParameter('fakeParameter') ||
    getWorkerParameter('fakeOpenStake')
  ) {
    const parameter = Number(JSON.parse(worker.ForkObj).param);
    if (Number.isNaN(parameter)) {
      return -6666;
    }
    return parameter;
  }

  // const marketNameSelector = '';
  const betNameSelector = '.c-bet-box__market';

  // const marketNameElement = document.querySelector(marketNameSelector);
  const betNameElement = document.querySelector(betNameSelector);

  // if (!marketNameElement) {
  //   log('Не найден маркет ставки', 'crimson');
  //   return -9999;
  // }
  if (!betNameElement) {
    log('Не найдена роспись ставки', 'crimson');
    return -9999;
  }

  // const marketName = text(marketNameElement);
  const betName = text(betNameElement);

  const totalRegex = ri`^.*тотал.* (\d+(?:\.\d+)?) [МБ]$`;
  const handicapRegex = ri`^.*фора.* (-?\d+(?:\.\d+)?)$`;

  const totalMatch = betName.match(totalRegex);
  if (totalMatch) {
    return Number(totalMatch[1]);
  }
  const handicapMatch = betName.match(handicapRegex);
  if (handicapMatch) {
    return Number(handicapMatch[1]);
  }
  return -6666;
};

export default getParameter;
