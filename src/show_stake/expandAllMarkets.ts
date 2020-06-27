import { sleep } from '@kot-shrodingera-team/config/util';

const expandAllMarkets = async (gameElement: Element): Promise<void> => {
  const marketHeaderButtons = [
    ...gameElement.querySelectorAll('.bet-title.min'),
  ] as HTMLElement[];
  // eslint-disable-next-line no-restricted-syntax
  for (const button of marketHeaderButtons) {
    button.click();
    // eslint-disable-next-line no-await-in-loop
    await sleep(0);
  }
};

export default expandAllMarkets;
