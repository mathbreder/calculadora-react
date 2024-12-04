const superscriptMap = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
};

export const toSuperscript = (number) => {
  return String(number)
    .split('')
    .map((digit) => superscriptMap[digit] || digit)
    .join('');
}