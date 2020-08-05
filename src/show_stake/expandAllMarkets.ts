import { log, getElement } from '@kot-shrodingera-team/germes-utils';

const expandAllMarkets = async (): Promise<void> => {
  // const marketHeaderButtons = [
  //   ...gameElement.querySelectorAll('.bet-title.min'),
  // ] as HTMLElement[];
  // // eslint-disable-next-line no-restricted-syntax
  // for (const button of marketHeaderButtons) {
  //   button.click();
  //   // eslint-disable-next-line no-await-in-loop
  //   await sleep(0);
  // }
  const expandAllButton = (await getElement(
    'button.scoreboard-nav__view-item'
  )) as HTMLElement;
  if (!expandAllButton) {
    log('Не найдена кнопка разворачивания всех маркетов', 'steelblue');
    return;
  }
  if (
    [...expandAllButton.classList].includes('scoreboard-nav__btn--is-active')
  ) {
    log('Разворачиваем все маркеты', 'orange');
    expandAllButton.click();
  } else {
    log('Маркеты уже развёрнуты', 'steelblue');
  }
};

export default expandAllMarkets;
