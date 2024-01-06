import { logger } from './logger';

//ciea cute image editing assistant
export class Chat {
  private _pairs: typeof pair;
  private _reflections: any;
  private _regex: any;
  constructor(pairs = pair, reflections = reflection) {
    this._pairs = pairs.map((pair2: any) => [
      new RegExp(pair2[0], 'i'),
      pair2[1],
    ]);
    this._reflections = reflections;
    this._regex = this._compileReflections();
  }
  private _compileReflections() {
    const sortedReflections = Object.keys(this._reflections).sort(
      (a, b) => b.length - a.length
    );
    return new RegExp('\\b(' + sortedReflections.join('|') + ')\\b', 'i');
  }
  private _substitute(str: string) {
    return str.replace(
      this._regex,
      (match: string) => this._reflections[match.toLowerCase()]
    );
  }
  private wildcards(response: string, match: any) {
    let pos = response.indexOf('%');
    while (pos >= 0) {
      const num = parseInt(response[pos + 1], 10);
      response =
        response.slice(0, pos) +
        this._substitute(match[num]) +
        response.slice(pos + 2);
      pos = response.indexOf('%');
    }
    return response;
  }
  respond(str: string) {
    for (const [pattern, response] of this._pairs) {
      const match = pattern instanceof RegExp ? pattern.exec(str) : null;
      logger.log('match', match);
      if (match) {
        let cmd, resp;
        if (typeof response === 'function') {
          ({ cmd, resp } = response(str));
        } else {
          resp = response;
        }
        resp = this.wildcards(resp, match);
        if (resp.slice(-2) === '?.') {
          resp = resp.slice(0, -2) + '.';
        }
        if (resp.slice(-2) === '??') {
          resp = resp.slice(0, -2) + '?';
        }
        return { cmd, resp };
      }
    }
  }
  converse(user_input: string) {
    if (user_input.length > 0) {
      while (user_input.slice(-1) === '?!.') {
        user_input = user_input.slice(0, -1);
      }
      if (this.respond(user_input)) {
        return this.respond(user_input);
      } else {
        const cmd = '';
        const resp = `Sorry, I don't understand.`;
        return { cmd, resp };
      }
    }
    const cmd = '';
    const resp = ``;
    return { cmd, resp };
  }
}

function randomChoice(arr: any[]) {
  return arr[Math.floor(arr.length * Math.random())];
}

// Define pattern-response pairs
const pair = [
  [`\\bblur\\b`, executeBlur], //ex : blur image
  [`\\bhue\\b`, executeHue], //ex : hue image
  [`\\bsaturate|saturation\\b`, executeSaturate], //ex : hue image
  [`\\bbright|brightness|brighten\\b`, executeBrighten], //ex : hue image
  [`\\bremove|erase\\b`, executeRemove], //ex : chroma key image
  [`\\bnegate|negative|invert\\b`, executeNegate], //ex : negate image
  [`\\bflip|mirror\\b`, executeFlip], //ex : flip image vertically
  [`\\brotate\\b`, executeRotate], //ex : rotate image
  [`\\bcontrast\\b`, executeContrast], //ex : rotate image
  [`\\btemperature\\b`, executeTemperature], //ex : rotate image
  [`\\bsmooth\\b`, executeSmooth], //ex : hue image
  [`\\bsharp\\b`, executeSharp], //ex : sharp image
  [`\\bedge|edgy|line\\b`, executeEdge], //ex : edge image
  [`\\bpainting\\b`, executePainting], //ex : edge image
  [`\\bgamma|light|lightning\\b`, executeGamma], //ex : edge image
  [`\\bpixelate\\b`, executePixelate], //ex : pixelate image
  [`\\bemboss|embossed\\b`, executeEmboss], //ex : emboss image
  [`\\bposturize|poster\\b`, executePosturize], //ex : posturize image
  [`\\bvignette\\b`, executeVignette], //ex : vignette image
  [`\\bshift\\b`, executeShift], //ex : zoom image
  [`\\bnoise\\b`, executeNoise], //ex : zoom image
  [`\\bexposure\\b`, executeExposure], //ex : zoom image
  [`\\bname\\b`, executeName], //ex : hue image
  [`(.+)`, executeResponse], //ex : hue image
];
// -vf rgbashift=rh=-6:gh=6
// noise=alls=100:allf=t+u
// exposure=-3
// normalize=blackpt=black:whitept=white:smoothing=0
// hue=h=2:s=1:b=1
// edgedetect=low=0.1:high=0.4
// elbg=2:2:1:1:1:1:1:1:1:1:1:1:1:1:1:1
// colorlevels=romin=1:gomin=1:bomin=1
// colorlevels=rimin=0.039:gimin=0.039:bimin=0.039:rimax=0.96:gimax=0.96:bimax=0.96
// react-native-image-crop-picker
//-i https://ibaisindia.co.in/chats/logos/avatar.png -i https://ibaisindia.co.in/chats/logos/bot.png  -filter_complex "[0:v]scale=1600:1600[bg];[1:v]scale=1600:1600[fg];[bg][fg]blend=all_mode=grainextract[outv]" -map "[outv]"
//

function executeBlur(str: any) {
  logger.log('executeBlur', str);
  let cmd = '';
  // pattern to match any number(if contain flour or not like 1.2233) from str
  const _match = /\d+(?:\.\d+)?/.exec(str);
  if (_match) {
    // if match found and between 1-1024 then make integer and assign to _match
    logger.log('_match', _match);
    const value = parseInt(_match[0], 10);
    if (value < 1 || value > 1024) {
      cmd = `-vf avgblur=1`;
    } else {
      cmd = `-vf avgblur=${value}`;
    }
  } else {
    cmd = '-vf avgblur=2';
  }
  const resp = randomChoice([
    `I hope You Like It 🙂`,
    `I think you like blurry.`,
  ]);
  return { cmd, resp };
}
function executeHue(_match: any) {
  // match hue value between 0-360
  const _match2 = /([0-9]{1,3})/i.exec(_match);
  const val = Number(_match2?.[0]) || 0;
  if (_match2 && val >= 0 && val <= 360) {
    logger.log('_match2', _match2);
    const cmd = `-vf hue=h=${val}`;
    const resp = randomChoice([
      `I hope You Like It 🙂`,
      `I think you like hue.`,
      `I set hue to ${val}.`,
    ]);
    return { cmd, resp };
  }
  const cmd = '-vf hue=h=45';
  const resp = randomChoice([
    `I hope You Like It 🙂`,
    `I think you like more hue.`,
  ]);
  return { cmd, resp };
}
function executeSaturate(_match: any) {
  // match hue value between -10 to 10
  const _match2 = /(-?[0-9]{1,2})/i.exec(_match);
  const val = Number(_match2?.[0]) || 0;
  if (_match2 && val >= -10 && val <= 10) {
    logger.log('_match2', _match2);
    const cmd = `-vf hue=s=${val}`;
    const resp = randomChoice([
      `I hope You Like It 🙂`,
      `I think you like more saturated.`,
      `I set saturation to ${val}.`,
    ]);
    return { cmd, resp };
  }
  const cmd = '-vf hue=s=90';
  const resp = randomChoice([
    `I hope You Like It 🙂`,
    `I think you like more saturated.`,
  ]);
  return { cmd, resp };
}
function executeBrighten(_match: any) {
  // match hue value between -10 to 10
  const _match2 = /(-?[0-9]{1,2})/i.exec(_match);
  const decreased = /decrease|reduce/i.exec(_match);
  const increased = /increase|add/i.exec(_match);
  const val = Number(_match2?.[0]) || 0;
  if (_match2 && val >= -100 && val <= 100) {
    logger.log('_match2', _match2);
    const cmd = `-vf eq=brightness=${val / 100}`;
    const resp = randomChoice([
      `I hope You Like It 🙂`,
      `I think you like more bright.`,
      `I set brightness to ${val}.`,
    ]);
    return { cmd, resp };
  }
  let cmd = '-vf eq=brightness=0.3';
  if (decreased) {
    cmd = '-vf eq=brightness=0.3';
  }
  if (increased) {
    cmd = '-vf eq=brightness=0.5';
  }
  const resp = randomChoice([
    `I hope You Like It 🙂`,
    `I think you like more bright.`,
  ]);
  return { cmd, resp };
}
function executeRemove(str: any) {
  const colors = [
    'Black',
    'Blue',
    'Brown',
    'Cyan',
    'Grey',
    'Green',
    'Red',
    'White',
    'Yellow',
    'Gold',
    'Orange',
    'Pink',
    'Purple',
    'Silver',
    'Violet',
  ];
  const _match = colors.find((color) =>
    str.toLowerCase().includes(color.toLowerCase())
  );
  // match any 6 digit hex color code
  const _match2 = /([0-9A-F]{6})/i.exec(str);
  // match any number between 0-255
  const _match3 = /([0-9]{1,3})/i.exec(str);
  const similarity = _match3?.[0] || 0.1;
  logger.log('executeHue', _match);
  if (_match) {
    const cmd = `-vf chromakey=${_match.toLowerCase()}:${similarity}/100`;
    const resp = randomChoice([
      `I hope You Like It 🙂`,
      `I think you don't like ${_match}.`,
    ]);
    return { cmd, resp };
  } else if (_match2) {
    logger.log('_match2', _match2);
    const cmd = `-vf chromakey=0x${_match2[0]}:${similarity}/100`;
    const resp = randomChoice([
      `I hope You Like It 🙂`,
      `I think you like chroma key.`,
    ]);
    return { cmd, resp };
  }
  const cmd = '-vf chromakey=0x00FF00:0.1';
  const resp = randomChoice([`I hope You Like It 🙂.`, `So Do You Like This?`]);
  return { cmd, resp };
}

function executeNegate(_match: any) {
  const color = /color/.exec(_match);
  var cmd = '-vf negate';
  if (color) {
    cmd = '-vf curves=preset=color_negative';
  }
  const resp = randomChoice([
    `I hope You Like It 🙂`,
    `I think you like Negative.`,
  ]);
  return { cmd, resp };
}
function executeName(_match: any) {
  const color = /color/.exec(_match);
  var cmd = '-vf negate';
  if (color) {
    cmd = '-vf curves=preset=color_negative';
  }
  const resp = randomChoice([
    `I hope You Like It 🙂`,
    `I think you like Negative.`,
  ]);
  return { cmd, resp };
}

function executeFlip(_match: any) {
  var cmd = '-vf hflip';
  const vertical = /vertical|vertically/.exec(_match);
  if (vertical) {
    cmd = '-vf vflip';
    const resp = randomChoice([
      `I hope You Like It 🙂.`,
      `Image Vertical flipped`,
    ]);
    return { cmd, resp };
  }
  const resp = randomChoice([
    `I hope You Like It 🙂.`,
    `Image Horizontally flipped`,
  ]);
  return { cmd, resp };
}

function executeRotate(_match: any) {
  // command to rotate image x degree
  var cmd = '-vf rotate=PI/2';
  const _match2 = /(-?[0-9]{1,3})/i.exec(_match);
  if (_match2) {
    logger.log('_match2', _match2);
    const val = parseInt(_match2[0], 10);
    if (val >= -360 && val <= 360) {
      var radian = (val * Math.PI) / 180;
      cmd = `-vf rotate=${radian}`;
    }
  }
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image Rotated 🎯`]);
  return { cmd, resp };
}
function executeContrast(_match: any) {
  var cmd = '-vf eq=contrast=1.5';
  const decreased = /decrease|reduce/i.exec(_match);
  const increased = /increase|add/i.exec(_match);
  if (decreased) {
    cmd = '-vf eq=contrast=0.5';
  }
  if (increased) {
    cmd = '-vf eq=contrast=2.5';
  }
  const val = /([0-9]{1,3})/i.exec(_match);
  if (val) {
    logger.log('_match2', val);
    const value = parseInt(val[0], 10);
    cmd = `-vf eq=contrast=${value}`;
  }
  // const cmd = '-vf curves=all="0/0 0.5/1 1/1"';
  const resp = randomChoice([
    `I hope You Like It 🙂.`,
    `Image Contrast is Increased`,
  ]);
  return { cmd, resp };
}
function executeTemperature(_match: any) {
  const cmd = '-vf -vf colortemperature=8000';
  const resp = randomChoice([
    `I hope You Like It 🙂.`,
    `Image Contrast is Increased`,
  ]);
  return { cmd, resp };
}
function executeSmooth(_match: any) {
  const cmd = '-vf dctdnoiz=100:n=4';
  logger.log('executeSmooth', _match);
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image is Smooth 🎯`]);
  return { cmd, resp };
}
function executeSharp(_match: any) {
  const cmd = '-vf unsharp=luma_msize_x=7:luma_msize_y=7:luma_amount=2.5'; //-vf unsharp=3:5:5.0:3:5:5.0
  logger.log('executeHue', _match);
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image Sharpen ✔`]);
  return { cmd, resp };
}
function executeEdge(_match: any) {
  const cmd = '-vf edgedetect=low=0.1:high=0.4';
  logger.log('executeHue', _match);
  const resp = randomChoice([`I hope You Like It 🙂.`, `It Looks Scary 👻`]);
  return { cmd, resp };
}
function executePainting(_match: any) {
  const cmd = '-vf edgedetect=mode=colormix:high=0';
  logger.log('executeHue', _match);
  const resp = randomChoice([`I hope You Like It 🙂.`, `It Looks Scary 👻`]);
  return { cmd, resp };
}
function executeGamma(_match: any) {
  var cmd = '-vf eq=gamma=0.5';
  const decreased = /decrease|reduce/i.exec(_match);
  const increased = /increase|add/i.exec(_match);
  if (decreased) {
    cmd = '-vf eq=gamma=0.3';
  }
  if (increased) {
    cmd = '-vf eq=gamma=0.7';
  }
  const val = /([0-9]{1,3})/i.exec(_match);
  if (val) {
    logger.log('_match2', val);
    const value = parseInt(val[0], 10);
    cmd = `-vf eq=gamma=${value}`;
  }
  const resp = randomChoice([
    `I hope You Like It 🙂.`,
    `Image Gamma is corrected`,
  ]);
  return { cmd, resp };
}
function executePixelate(_match: any) {
  const cmd = '-vf scale=iw/10:ih/10:flags=neighbor';
  logger.log('executeHue', _match);
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image Pixelated 🦾`]);
  return { cmd, resp };
}
function executeEmboss(_match: any) {
  const cmd =
    '-vf convolution="-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2"';
  const resp = randomChoice([
    `I hope You Like It 🙂.`,
    `Image Looks More Embossed 🎯`,
  ]);
  return { cmd, resp };
}
function executePosturize(_match: any) {
  const cmd = '-vf elbg=2.14';
  logger.log('executeHue', _match);
  const resp = randomChoice([
    `I hope You Like It 🙂.`,
    `Image is Pasteurized 🎯`,
  ]);
  return { cmd, resp };
}
function executeVignette(_match: any) {
  const cmd = '-vf vignette';
  logger.log('executeHue', _match);
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image Vignetted 🕶`]);
  return { cmd, resp };
}
function executeShift(_match: any) {
  const cmd = `-vf rgbashift=rh=-6:gh=6`;
  logger.log('executeHue', _match);
  const resp = randomChoice([`I hope You Like It 🙂.`]);
  return { cmd, resp };
}
function executeNoise(_match: any) {
  const cmd = `-vf noise=alls=100:allf=t+u`;
  logger.log('executeHue', _match);
  const resp = randomChoice([`I hope You Like It 🙂.`]);
  return { cmd, resp };
}
function executeExposure(_match: any) {
  var cmd = `-vf exposure=2`;
  const decreased = /decrease|reduce/i.exec(_match);
  const increased = /increase|add/i.exec(_match);
  if (decreased) {
    cmd = `-vf exposure=-3`;
  }
  if (increased) {
    cmd = `-vf exposure=3`;
  }
  const val = /([0-9]{1,3})/i.exec(_match);
  if (val) {
    logger.log('_match2', val);
    const value = parseInt(val[0], 10);
    cmd = `-vf exposure=${value}`;
  }
  const resp = randomChoice([`I hope You Like It 🙂.`]);
  return { cmd, resp };
}

function executeResponse(_match: any) {
  logger.log('executeHue', _match);
  const cmd = '';
  const resp = `we can not execute command right now 😥, but we will soon 😎`;
  return { cmd, resp };
}

// const chatbot = new Chat(pairs, reflection);
// chatbot.converse('quit');

// lights
// exposure -5ev-5ev, contrast-100-100, highlights-100-100,
// shadows -100-100, whites -100-100, blacks -100-100,
// color
// temp -100-100, tint -100-100, vibrance -100-100, saturation -100-100
// effects
// texture, clarity, dehaze, vignette, midpoint, fade
// feather, roundness, highlights, grain 0-100= size 0-100= roughness 0-100
// details
// sharpening 0-100 = radius 0.5-3.00 =detail 0-100 =masking 0-100
// noise reduction 0-100 = detail 0-100=contrast 0-100
// color noise reduction 0-100= detail 0-100= smoothness 0-100
// optics
// remove chromatic aberration
// enable lens correction = distortion correction 0-200, lens vignetting 0-200
// geometry
// distortion, vertical, horizontal, rotate, aspect, scale , x-offset, y-offset
// preset, profiles, masking, healing\
// photo-shop
// adjustments
// split tone, color mix =>hs_luminance, blur,vignette,optics

const reflection = {
  'i am': 'you are',
  'i was': 'you were',
  i: 'you',
  "i'm": 'you are',
  "i'd": 'you would',
  "i've": 'you have',
  "i'll": 'you will',
  my: 'your',
  'you are': 'I am',
  'you were': 'I was',
  "you've": 'I have',
  "you'll": 'I will',
  your: 'my',
  yours: 'mine',
  you: 'me',
  me: 'you',
};

///////////////////////
// these are the functions
// function brighten(bightenValue: number );
// function darken(darkenValue: number );
// function filter(filterName: 'green'|'blue'|'red'|'blur', filterValue: number );

// user input "" call function with understanding user input with proper parameter.
// do not give explaination of result just give one line which shows call to that function with params.
//6d1de57562424043831a083e44be8b5b news.com
