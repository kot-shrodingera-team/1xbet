const getMinimumStake = (): number => {
  if (worker.Currency === 'RUR' || worker.Currency === 'KZT') {
    return 10;
  }
  return 0;
};

export default getMinimumStake;
