import checkCouponLoadingGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/checkCouponLoading';
import {
  log,
  getElement,
  awaiter,
  getRemainingTimeout,
  checkCouponLoadingError,
  checkCouponLoadingSuccess,
  text,
  sendTGBotMessage,
  sleep,
  getWorkerParameter,
  stakeInfoString,
} from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import { StateMachine } from '@kot-shrodingera-team/germes-utils/stateMachine';
import getLastBetId from '../helpers/getLastBetId';
import goToCouponTab from '../helpers/goToCouponTab';

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
        if (
          /Не удалось выполнить ставку. Проверка событий не прошла/i.test(
            errorText
          )
        ) {
          if (getWorkerParameter('EventsCheckFailedBlock')) {
            log(
              'В настройках бк включена опция паузы при ошибке проверки событий',
              'orange'
            );
            if (worker.SetBookmakerPaused(true)) {
              worker.Helper.SendInformedMessage(
                `В ${window.germesData.bookmakerName} произошла ошибка принятия ставки:\n` +
                  `${errorText}\n` +
                  `В настройках бк включена опция паузы при ошибке проверки событий\n` +
                  `БК успешно поставлена на паузу\n` +
                  `${stakeInfoString()}`
              );
            } else {
              worker.Helper.SendInformedMessage(
                `В ${window.germesData.bookmakerName} произошла ошибка принятия ставки:\n` +
                  `${errorText}\n` +
                  `В настройках бк включена опция паузы при ошибке проверки событий\n` +
                  `БК НЕ УДАЛОСЬ поставить на паузу\n` +
                  `${stakeInfoString()}`
              );
            }
            window.germesData.stopBetProcessing();
            checkCouponLoadingError({});
            machine.end = true;
          }
        }
        if (
          /Произошла ошибка. Возможно ваша ставка прошла, проверьте историю ставок./i.test(
            errorText
          )
        ) {
          worker.Helper.SendInformedMessage(
            `В ${window.germesData.bookmakerName} произошла ошибка принятия ставки:\n` +
              `${errorText}\n` +
              `${stakeInfoString()}`
          );
          sendTGBotMessage(
            '1786981726:AAE35XkwJRsuReonfh1X2b8E7k9X4vknC_s',
            126302051,
            errorText
          );
          machine.promises = {
            checkBetInHistory: sleep(0),
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
          machine.end = true;
          return;
        }
        okButton.click();
        checkCouponLoadingError({});
        machine.end = true;
      },
    },
    betPlaced: {
      entry: async () => {
        window.germesData.betProcessingAdditionalInfo = null;
        const modalTitle = document.querySelector(
          '.c-coupon-modal__title:not(.c-coupon-modal__status)'
        );
        if (!modalTitle) {
          log('Не найден заголовок результата', 'crimson');
        } else {
          const modatTitleText = text(modalTitle);
          const lastBetIdMatch = modatTitleText.match(/(\d+)$/);
          if (!lastBetIdMatch) {
            log(
              `Не найден номер купона в заголовке результата:\n${modatTitleText}`,
              'crimson'
            );
          }
          const lastBetId = lastBetIdMatch[1];
          log(`Номер купона: ${lastBetId}`, 'steelblue');
          worker.SetSessionData('1xbet.LastBetId', lastBetId);
        }
        checkCouponLoadingSuccess('Ставка принята');
        machine.end = true;
      },
    },
    checkBetInHistory: {
      entry: async () => {
        try {
          const lastBetId = await getLastBetId();
          worker.TakeScreenShot(false);
          if (lastBetId === null) {
            log('В истории нет ставок. Считаем ставку непринятой', 'steelblue');
            await goToCouponTab();
            checkCouponLoadingError({});
            machine.end = true;
            return;
          }
          const workerLastBetId = worker.GetSessionData('1xbet.LastBetId'); // В теории не может быть именно примитивом null
          if (workerLastBetId === 'null') {
            log(
              'В истории не было ставок. Сейчас есть. Считаем ставку принятой',
              'steelblue'
            );
            checkCouponLoadingSuccess();
            machine.end = true;
            return;
          }
          if (workerLastBetId !== lastBetId) {
            log(
              `В истории последняя ставка была другой\n
              ${workerLastBetId} != ${lastBetId}\n
              Считаем ставку принятой`,
              'steelblue'
            );
            checkCouponLoadingSuccess();
            machine.end = true;
            return;
          }
          log(
            `В истории последняя ставка была такой же\n
            ${lastBetId}\n
            Считаем ставку непринятой`,
            'steelblue'
          );
          await goToCouponTab();
          checkCouponLoadingError({});
          machine.end = true;
        } catch (error) {
          if (error instanceof JsFailError) {
            checkCouponLoadingError({
              botMessage: error.message,
            });
            machine.end = true;
            return;
          }
          checkCouponLoadingError({
            botMessage: error.message,
            informMessage: error.message,
          });
          machine.end = true;
          throw error;
        }
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
