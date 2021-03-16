export function extractImageFromHTML(stringHTML) {
    const imgIndex = stringHTML.indexOf('<img');
    let url = stringHTML.slice(imgIndex).split('"')[1];
    return url;
}
export function extractText(stringHTML) {
    let str = stringHTML.split('>');
    let text = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i][0] !== '<') {
            text += str[i].split('<')[0];
        }
    }
    return text;
}

export function getDeviceType(width) {
    if (width > 1024)
        return 0;
    else if (width <= 1024 && width > 420)
        return 1;
    return 2;
}