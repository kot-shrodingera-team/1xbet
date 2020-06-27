const getPhoneCountry = (): string => {
  const russianPhoneRegex = /(?:\+?7)?9(?!40)\d{9}/;
  const ukrainianPhoneRegex = /\+?380\d{9}/;
  const kazakhstanianPhoneRegex = /(?:\+?7)?7\d{9}/;
  const belarusianPhoneRegex = /\+?375\d{9}/;
  const azerbaijanianPhoneRegex = /\+?994\d{9}/;
  const abkhazianPhoneRegex = /(?:\+?7)?940\d{7}/;
  const albanianPhoneRegex = /\+?355\d{9}/;
  const moldavianPhoneRegex = /\+?373\d{8}/;
  if (belarusianPhoneRegex.test(worker.Login)) {
    return 'Беларусь';
  }
  if (russianPhoneRegex.test(worker.Login)) {
    return 'Россия';
  }
  if (ukrainianPhoneRegex.test(worker.Login)) {
    return 'Украина';
  }
  if (kazakhstanianPhoneRegex.test(worker.Login)) {
    return 'Казахстан';
  }
  if (moldavianPhoneRegex.test(worker.Login)) {
    return 'Молдавия';
  }
  if (abkhazianPhoneRegex.test(worker.Login)) {
    return 'Абхазия';
  }
  if (azerbaijanianPhoneRegex.test(worker.Login)) {
    return 'Азейбарджан';
  }
  if (albanianPhoneRegex.test(worker.Login)) {
    return 'Албания';
  }
  return null;
};

export default getPhoneCountry;
