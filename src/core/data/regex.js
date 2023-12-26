// const sentence = 'I want to blur my image to radius 10';

// // Define the regex pattern as a string without unnecessary escaping
// const blurRegexString = '\\bblur\\b.*?(\\d+(\\.\\d+)?)\\b';
// const blurRegex = new RegExp(blurRegexString, 'i');

// const match = blurRegex.exec(sentence);

// if (match) {
//   const blurValue = parseFloat(match[1]);
//   console.log('Blur Value:', blurValue);
// } else {
//   console.log('No match found.');
// }
// const sentence =
//   'Remove all colorname(red) with quantity 5 and colorname(blue) with quantity 10';

// const regexPattern =
//   /\bremove\b.*?#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b.*?(\d+)\b/i;
// const match = regexPattern.exec(sentence);

// if (match) {
//   const colorName = match[1];
//   const quantity = parseInt(match[2], 10);
//   console.log('Color Name:', colorName);
//   console.log('Quantity:', quantity);
// } else {
//   console.log('No match found.');
// }
// const sentence2 = 'The color is #1a2b3c and #FFA500';

// const hexColorRegex = /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/g;
// const matches = sentence2.match(hexColorRegex);

// if (matches) {
//   console.log('Hexadecimal color values found:', matches);
// } else {
//   console.log('No hexadecimal color values found.');
// }
