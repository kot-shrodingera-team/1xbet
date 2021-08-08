declare global {
  // interface GermesData {}
  interface Window {
    store_global: {
      dispatch: (action: string, data: Record<string, unknown>) => void;
    };
  }
}

export const clearGermesData = (): void => {
  if (window.germesData && window.germesData.updateMaximumIntervalId) {
    clearInterval(window.germesData.updateMaximumIntervalId);
  }
  if (window.germesData && window.germesData.updateCoefIntervalId) {
    clearInterval(window.germesData.updateCoefIntervalId);
  }
  window.germesData = {
    bookmakerName: '1xbet',
    minimumStake: undefined,
    maximumStake: undefined,
    doStakeTime: undefined,
    betProcessingStep: undefined,
    betProcessingAdditionalInfo: undefined,
    betProcessingTimeout: 50000,
    stakeDisabled: undefined,
    stopBetProcessing: () => {
      window.germesData.betProcessingStep = 'error';
      window.germesData.stakeDisabled = true;
    },
    updateMaximumIntervalId: undefined,
    updateCoefIntervalId: undefined,
    manualMax: undefined,
    manualCoef: undefined,
  };
};

export default {};
