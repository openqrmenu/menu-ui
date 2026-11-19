export function getAllLanguages() {

    const alllanguages = [
        {
          "code": "en",
          "name": "English",
          "country": "gb"
        },
        {
          "code": "es",
          "name": "Spanish",
          "country": "es"
        },
        {
          "code": "fr",
          "name": "French",
          "country": "fr"
        },
        {
          "code": "ru",
          "name": "Russian",
          "country": "ru"
        },
        {
          "code": "de",
          "name": "German",
          "country": "de"
        },
        {
          "code": "tr",
          "name": "Turkish",
          "country": "tr"
        },
        {
          "code": "it",
          "name": "Italian",
          "country": "it"
        },
        {
          "code": "pl",
          "name": "Polish",
          "country": "pl"
        },
        {
          "code": "nl",
          "name": "Dutch",
          "country": "nl"
        },
        {
          "code": "pt",
          "name": "Portuguese",
          "country": "pt"
        },
        {
          "code": "zh",
          "name": "Chinese (Simplified)",
          "country": "cn"
        },
        {
          "code": "zh-TW",
          "name": "Chinese (Traditional)",
          "country": "tw"
        },
        {
          "code": "ja",
          "name": "Japanese",
          "country": "jp"
        },
        {
          "code": "ko",
          "name": "Korean",
          "country": "kr"
        },
        {
          "code": "ar",
          "name": "Arabic",
          "country": "sa"
        },
        {
          "code": "hi",
          "name": "Hindi",
          "country": "in"
        },
        {
          "code": "th",
          "name": "Thai",
          "country": "th"
        },
        {
          "code": "vi",
          "name": "Vietnamese",
          "country": "vn"
        },
        {
          "code": "id",
          "name": "Indonesian",
          "country": "id"
        },
        {
          "code": "el",
          "name": "Greek",
          "country": "gr"
        },
        {
          "code": "uk",
          "name": "Ukrainian",
          "country": "ua"
        },
        {
          "code": "my",
          "name": "Burmese",
          "country": "mm"
        },
      ];
    return alllanguages;

}

export function getLanguageName(code)
{
    const entry = getAllLanguages().find(lang => {
        if (lang.code == code)
            return true;

        return false;
    });

    if (entry == undefined)
        return "English (Unknown)";

    return entry.name;
}

export function getCountryCode(code)
{
    const entry = getAllLanguages().find(lang => {
        if (lang.code === code)
        {
          return true;
        }

        return false;
    });

    if (entry == undefined)
        return "gb";

    return entry.country;
}
