import checkCouponLoadingGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/checkCouponLoading';
import {
  log,
  getElement,
  awaiter,
  getRemainingTimeout,
  checkCouponLoadingError,
  checkCouponLoadingSuccess,
  text,
  // sendTGBotMessage,
  sleep,
} from '@kot-shrodingera-team/germes-utils';
import { StateMachine } from '@kot-shrodingera-team/germes-utils/stateMachine';

const loaderSelector = '.coupon__preloader:not([style="display: none;"])';
// const errorSelector = '.swal2-popup';
const errorSelector = '.swal2-content';
// const errorTextSelector = '.swal2-content';
const betPlacedSelector = '.c-coupon-modal';

const asyncCheck = async () => {
  const machine = new StateMachine();

  machine.promises = {
    loader: () => getElement(loaderSelector, getRemainingTimeout()),
    error: () => getElement(errorSelector, getRemainingTimeout()),
    betPlaced: () => getElement(betPlacedSelector, getRemainingTimeout()),
  };

  machine.setStates({
    start: {
      entry: async () => {
        log('Начало обработки ставки', 'steelblue');
      },
    },
    loader: {
      entry: async () => {
        log('Появился индикатор', 'steelblue');
        window.germesData.betProcessingAdditionalInfo = 'индикатор';
        delete machine.promises.loader;
        machine.promises.loaderDissappeared = () =>
          awaiter(
            () => document.querySelector(loaderSelector) === null,
            getRemainingTimeout()
          );
      },
    },
    loaderDissappeared: {
      entry: async () => {
        log('Исчез индикатор', 'steelblue');
        window.germesData.betProcessingAdditionalInfo = null;
        delete machine.promises.loaderDissappeared;
      },
    },
    error: {
      entry: async () => {
        log('Появилась ошибка', 'steelblue');
        window.germesData.betProcessingAdditionalInfo = null;
        const errorText = text(machine.data.result as HTMLElement);
        log(errorText, 'tomato');
        if (errorText.startsWith('Изменился коэффициент')) {
          log('Изменился коэффициент. Отменяем ставку', 'orange');
          const cancelButton =
            document.querySelector<HTMLElement>('.swal2-cancel');
          if (!cancelButton) {
            checkCouponLoadingError({
              botMessage: 'Не найдена кнопка "Отмена" во всплывающем окне',
            });
            machine.end = true;
            return;
          }
          cancelButton.click();
          checkCouponLoadingError({});
          machine.end = true;
          return;
        }
        if (
          errorText.startsWith(
            'Ставка на данное событие уже принималась. Хотите продолжить провод новой ставки?'
          )
        ) {
          log(
            'Ставка на данное событие уже принималась. Соглашаемся с повторным проводом',
            'orange'
          );
          const okButton =
            document.querySelector<HTMLElement>('.swal2-confirm');
          if (!okButton) {
            checkCouponLoadingError({
              botMessage: 'Не найдена кнопка "ОК" во всплывающем окне',
            });
            machine.end = true;
            return;
          }
          okButton.click();
          await sleep(1000); // Чтобы успело исчезнуть сообщение об ошибке
          machine.promises = {
            loader: () => getElement(loaderSelector, getRemainingTimeout()),
            error: () => getElement(errorSelector, getRemainingTimeout()),
            betPlaced: () =>
              getElement(betPlacedSelector, getRemainingTimeout()),
          };
          return;
        }
        // worker.Helper.SendInformedMessage(errorText);
        // sendTGBotMessage(
        //   '1786981726:AAE35XkwJRsuReonfh1X2b8E7k9X4vknC_s',
        //   126302051,
        //   errorText
        // );
        const okButton = document.querySelector<HTMLElement>('.swal2-confirm');
        if (!okButton) {
          checkCouponLoadingError({
            botMessage: 'Не найдена кнопка "ОК" во всплывающем окне',
          });
        }
        okButton.click();
        checkCouponLoadingError({});
        machine.end = true;
      },
    },
    betPlaced: {
      entry: async () => {
        window.germesData.betProcessingAdditionalInfo = null;
        checkCouponLoadingSuccess('Ставка принята');
        machine.end = true;
      },
    },
    timeout: {
      entry: async () => {
        window.germesData.betProcessingAdditionalInfo = null;
        checkCouponLoadingError({
          botMessage: 'Не дождались результата ставки',
          informMessage: 'Не дождались результата ставки',
        });
        machine.end = true;
      },
    },
  });

  machine.start('start');
};

const checkCouponLoading = checkCouponLoadingGenerator({
  asyncCheck,
});

export default checkCouponLoading;
