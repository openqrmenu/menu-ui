export function getAllLanguages() {

    const alllanguages = [
        {
          "code": "en",
          "name": "English"
        },
        {
          "code": "es",
          "name": "Spanish"
        },
        {
          "code": "fr",
          "name": "French"
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