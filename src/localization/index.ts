import { I18n } from 'i18n-js';
import en from './lang/en.json';
import kh from './lang/kh.json';

const translations = { kh, en };

const i18n = new I18n(translations);

i18n.enableFallback = true;

export default i18n