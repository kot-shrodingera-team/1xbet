import { getWorkerParameter } from '@kot-shrodingera-team/germes-utils';

const getMinimumStake = (): number => {
  if (
    getWorkerParameter('fakeMinimumStake') ||
    getWorkerParameter('fakeAuth') ||
    getWorkerParameter('fakeOpenStake')
  ) {
    const fakeBalance = getWorkerParameter('fakeMinimumStake') as number;
    if (fakeBalance !== undefined) {
      return fakeBalance;
    }
    return 0;
  }
  if (worker.Currency === 'RUR' || worker.Currency === 'KZT') {
    return 10;
  }
  return 0;
};

export default getMinimumStake;
