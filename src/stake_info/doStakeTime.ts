export const getDoStakeTime = (): Date => {
  return window.germesData.doStakeTime;
};

export const clearDoStakeTime = (): void => {
  window.germesData.doStakeTime = new Date();
};
