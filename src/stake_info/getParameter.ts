const getParameter = (): number => {
  const marketElement = document.querySelector('.c-bet-box__market');
  if (!marketElement) {
    worker.Helper.WriteLine('Не найдена роспись ставки');
    return -9999;
  }
  const market = marketElement.textContent.trim();
  const totalRegex = new RegExp(
    String.raw`^.*тотал.* (\d+(?:\.\d+)) [МБ]$`,
    'i'
  );
  const handicapRegex = new RegExp(
    String.raw`^.*фора.* (-?\d+(?:\.\d+))$`,
    'i'
  );

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
