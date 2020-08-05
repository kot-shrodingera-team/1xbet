let doStakeTime: Date = null;

export const getDoStakeTime = (): Date => {
  return doStakeTime;
};

export const clearDoStakeTime = (): void => {
  doStakeTime = new Date();
};
