import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import vi from './translations/vi'
import en from './translations/en'
import dog from './translations/dog'

const resources = {
  en: {
    translation: en
  },
  vi: {
    translation: vi
  },
  dev: {
    translation: dog
  }

};
// có thể chia multi instance i18next ví dụ như 1 intance dùng cho tất cả common,1 dùng cho category,1 dùng cho product,.... sẽ làm nhẹ đi lượng json load || dùng multi namespace
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: navigator.language,
    load: 'all',
    // whitelist:["en",'vi','dog'],
    // nonExplicitWhitelist: false,
    preload:true,
    fallbackLng: "en", //use lng if a language no exist
    keySeparator: '.', // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: true // react already safes from xss
    }
  });
export default i18n;