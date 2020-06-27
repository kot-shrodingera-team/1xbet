const checkStakeEnabled = (): boolean => {
  const boxBlocked = document.querySelector('.c-bet-box--blocked');
  if (boxBlocked) {
    worker.Helper.WriteLine('Ставка недоступна (box--blocked)');
    return false;
  }
  const errorMessage = document.querySelector('.error__message-container');
  if (errorMessage) {
    worker.Helper.WriteLine('Ставка недоступна (error__message)');
    return false;
  }
  return true;
};

export default checkStakeEnabled;
