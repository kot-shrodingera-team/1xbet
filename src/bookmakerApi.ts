interface BookmakerApi {
  dispatch: (action: string, data: Record<string, unknown>) => void;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const store_global: BookmakerApi;

  interface Window {
    germesData: {
      doStakeTime: Date;
      betProcessingStep: string;
      betProcessingAdditionalInfo: string;
    };
  }
}

export default {};
