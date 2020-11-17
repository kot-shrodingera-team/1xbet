import { log, ri } from '@kot-shrodingera-team/germes-utils';

const getParameter = (): number => {
  const marketElement = document.querySelector('.c-bet-box__market');
  if (!marketElement) {
    log(
      'Ошибка определения параметра ставки: Не найдена роспись ставки',
      'crimson'
    );
    return -9999;
  }
  const market = marketElement.textContent.trim();
  const totalRegex = ri`^.*тотал.* (\d+(?:\.\d+)?) [МБ]$`;
  const handicapRegex = ri`^.*фора.* (-?\d+(?:\.\d+)?)$`;

  const totalMatch = market.match(totalRegex);
  if (totalMatch) {
    return Number(totalMatch[1]);
  }
  const handicapMatch = market.match(handicapRegex);
  if (handicapMatch) {
    return Number(handicapMatch[1]);
  }
  return -6666;
};

export default getParameter;
