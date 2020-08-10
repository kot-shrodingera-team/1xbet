import { log } from '@kot-shrodingera-team/germes-utils';
import { version } from '../package.json';

const fastLoad = async (): Promise<void> => {
  log(`Быстрая загрузка (${version})`, 'steelblue');
  const [gameId] = worker.BetId.split('|');
  if (worker.EventUrl.includes('_')) {
    worker.Helper.SendInformedMessage(`URL с underscore: ${worker.EventUrl}`);
    worker.Helper.LoadUrl(
      worker.EventUrl.replace(/_/g, '-').replace(worker.EventId, gameId)
    );
  } else {
    worker.Helper.LoadUrl(worker.EventUrl.replace(worker.EventId, gameId));
  }
};

export default fastLoad;
