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
