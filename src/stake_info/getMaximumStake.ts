const getMaximumStake = (): number => {
  const maximumStakeElement = document.querySelector(
    '.coupon__bet-settings button:nth-child(2)'
  );
  if (!maximumStakeElement) {
    worker.Helper.WriteLine('Не найдена максимальная сумма ставки');
    return 0;
  }
  const maximumStakeText = maximumStakeElement.textContent.trim();
  const maximumStake = Number(maximumStakeText);
  if (Number.isNaN(maximumStake)) {
    worker.Helper.WriteLine(
      `Непонятный формат максимальной ставки: "${maximumStakeText}"`
    );
    return 0;
  }
  return maximumStake;
};

export default getMaximumStake;
