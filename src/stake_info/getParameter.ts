import {
  getWorkerParameter,
  log,
  ri,
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

  const betNameSelector = '.c-bet-box__market';

  const betNameElement = document.querySelector(betNameSelector);
  if (!betNameElement) {
    log('Не найдена роспись ставки', 'crimson');
    return -9999;
  }

  const betName = betNameElement.textContent.trim();

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
