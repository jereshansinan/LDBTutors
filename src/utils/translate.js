export async function loadTranslations(locale) {
    const response = await fetch(`/locales/${locale}.json`);
    const translations = await response.json();
    return translations;
  }