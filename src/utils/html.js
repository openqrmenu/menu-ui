import he from 'he';

export function decodeText(text)
{
    if (text == undefined || text == null)
        return "";
    return he.decode(text);
}