import { log } from '../logger';
import { setStakeSum } from '../callbacks/setStakeSum';

export function getMinStake(): number {
  return 10;
}

export function getMaxStake(): number {
  const maxStake = document.querySelector(
    '.coupon__bet-settings button:nth-child(2)'
  );
  if (maxStake) {
    return Number(maxStake.textContent.trim());
  }
  log('Поле максимальной ставки не найдено');
  return 0;
}

export function clearCoupon(): void {
  const clearButton = document.querySelector(
    '.coupon__bets button'
  ) as HTMLButtonElement;
  const clearAllButton = document.querySelector(
    '.coupon__settings button'
  ) as HTMLButtonElement;
  if (getStakeCount() === 0) {
    log('Открытых купонов нет');
    return;
  }
  if (getStakeCount() > 1) {
    log('Купонов больше 1 жмем кнопку "Очистить все"');
    clearAllButton.click();
    return;
  } else {
    log('Очищаем один купон');
    clearButton.click();
    return;
  }
}

export function checkStakeLoad(): boolean {
  return Boolean(document.querySelector('.coupon__bets'));
}

export function checkMarketLoad(): boolean {
  return Boolean(document.querySelector('.sports_widget'));
}

export function getStakeCount(): number {
  log(`Получен getStakeCount`);
  return document.querySelectorAll('.c-bet-box').length;
}

export function getSumFromStake(): number {
  const input = document.querySelector(
    '.input-text-wrapper input'
  ) as HTMLInputElement;
  if (input) {
    log('Получили сумму из купона');
    return Number(input.value);
  }
  log(`Инпут не найден getSumFromStake`);
  return 0;
}

export function getCoefFromCoupon(): number {
  const coef = document.querySelector('.c-bet-box__bet');
  if (!coef) {
    log('Ошибка парсинга коэффициента, коэффициент не найден.');
    return 0;
  }
  if (isNaN(Number(coef.textContent.trim()))) {
    log(`Коэффициент не удалось распарсить в число: ${coef.textContent}`);
    return 0;
  }
  return Number(coef.textContent.trim());
}

export function getParametrFromCoupon(): string {
  const param = document.querySelector('.c-bet-box__market');
  if (!param) {
    log('Не найдены параметры');
    return '0';
  }

  if (param.textContent.toUpperCase().includes('ТОТАЛ.')) {
    log('Нашли тотал параметр с точкой');
    return param.textContent.split(' ')[4];
  }

  if (param.textContent.toUpperCase().includes('ТОТАЛ')) {
    log('Нашли тотал параметр');
    return param.textContent.split(' ')[1];
  }

  if (param.textContent.toUpperCase().includes('ФОРА.')) {
    log('Нашли параметр Фора');
    return param.textContent.split(' ')[4];
  }

  if (param.textContent.toUpperCase().includes('ФОРА')) {
    log('Нашли параметр Фора');
    const searchStr = param.textContent.match(/\((.*)\)/);
    return searchStr[1];
  }

  if (param.textContent.toUpperCase().includes('ИТ')) {
    log('Нашли параметр ИТ');
    return param.textContent.split(' ')[1];
  }
  log('Без параметра, или он не документирован.');
  return '-6666';
}

export function checkIsEnabled(): boolean {
  if (document.querySelector('.c-bet-box--blocked')) {
    log('Ставка недоступна (box--blocked)');
    return false;
  }
  if (document.querySelector('.error__message-container')) {
    log('Ставка недоступна (error__message)');
    return false;
  }
  log('Ставка доступна');
  return true;
}

export async function awaiter(
  condition: any,
  timeout = 3000,
  interval = 4,
  logger = false
) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const start_time = Date.now();
    const check = () => {
      const result = condition();
      if (result) {
        if (logger) {
          console.log('awaiter result is not falsy');
          console.log(result);
        }
        resolve(result);
        // eslint-disable-next-line @typescript-eslint/camelcase
      } else if (Date.now() > start_time + timeout) {
        console.log('awaiter timeout');
        resolve(null);
      } else {
        setTimeout(check, interval);
      }
    };
    check();
  });
}
