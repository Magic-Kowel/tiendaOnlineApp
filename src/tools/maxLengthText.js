export default function maxLengthText(text,maxLength){
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}