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
          ({ cmd, resp } = response(match));
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
  [`\\bremove\\b`, executeRemove], //ex : chroma key image
  [`\\bexecute\\b`, executeResponse],
  // question related to negate image which contain negate in the question
  [`\\bnegate\\b`, executeNegate], //ex : negate image
  // question related to vertical flip image which contain vertical flip in the question
  [`\\bflip\\b`, executeFlip], //ex : flip image vertically
  // question related to rotate image which contain rotate in the question
  [`\\brotate\\b`, executeRotate], //ex : rotate image
  // question related to extract color from image
  [`\\bextract\\b`, executeExtract], //ex : extract color from image
  // question related to sharp image which contain sharp in the question
  [`\\bsharp\\b`, executeSharp], //ex : sharp image
  // question related to edge image which contain edge in the question
  [`\\bedge\\b`, executeEdge], //ex : edge image
  // question related to emboss image which contain emboss in the question
  [`\\bemboss\\b`, executeEmboss], //ex : emboss image
  // question related to posturize image which contain posturize in the question
  [`\\bposturize\\b`, executePosturize], //ex : posturize image
  [`\\bpixelate\\b`, executePixelate], //ex : pixelate image
  [`\\bthreshold\\b`, executeThreshold], //ex : threshold image
  [`\\bvignette\\b`, executeVignette], //ex : vignette image
  [`\\bwarp\\b`, executeWarp], //ex : warp image
  [`\\bzoom\\b`, executeZoom], //ex : zoom image
  [`\\bhue\\b`, executeHue], //ex : hue image
  [`\\bsmooth\\b`, executeSmooth], //ex : hue image
  [`(.+)`, executeResponse], //ex : hue image
];
// -vf rgbashift=rh=-6:gh=6
// noise=alls=100:allf=t+u
// normalize=blackpt=black:whitept=white:smoothing=0
// hue=h=2:s=1:b=1
// edgedetect=low=0.1:high=0.4
// elbg=2:2:1:1:1:1:1:1:1:1:1:1:1:1:1:1
// colorlevels=romin=1:gomin=1:bomin=1
// colorlevels=rimin=0.039:gimin=0.039:bimin=0.039:rimax=0.96:gimax=0.96:bimax=0.96
// react-native-image-crop-picker

function executeBlur(_match: any) {
  logger.log('executeBlur', _match[1]);
  const cmd = _match[1] ? `-vf avgblur=${_match[1]}` : '-vf avgblur=20';
  const resp = randomChoice([
    `I hope You Like It 🙂`,
    `I think you like blurry.`,
  ]);
  return { cmd, resp };
}
function executeHue(_match: any) {
  logger.log('executeHue', _match[1]);
  const cmd = _match[1] ? `-vf avgblur=${_match[1]}` : '-vf avgblur=20';
  const resp = randomChoice([
    `I hope You Like It 🙂`,
    `I think you like blurry.`,
  ]);
  return { cmd, resp };
}
function executeRemove(_match: any) {
  logger.log('executeHue', _match[1]);
  const cmd = '-vf chromakey=0x00FF00:0.1:0.2';
  const resp = randomChoice([`I hope You Like It 🙂.`, `So Do You Like This?`]);
  return { cmd, resp };
}

function executeResponse(_match: any) {
  logger.log('executeHue', _match[1]);
  const cmd = '';
  const resp = `we can not execute command right now 😥, but we will soon 😎`;
  return { cmd, resp };
}
function executeNegate(_match: any) {
  const cmd = '-vf negate';
  logger.log('executeHue', _match[1]);
  const resp = randomChoice([
    `I hope You Like It 🙂`,
    `I think you like Negative.`,
  ]);
  return { cmd, resp };
}

function executeFlip(_match: any) {
  const cmd = '-vf hflip';
  // const cmd = '-vf vflip';
  logger.log('executeHue', _match[1]);
  const resp = randomChoice([
    `I hope You Like It 🙂.`,
    `Image Horizontally flipped`,
  ]);
  return { cmd, resp };
}

// function executeBrightness(_match: any) {
//   const cmd = '-vf eq=brightness=0.3';
//   const resp = randomChoice([
//     `I hope You Like It 🙂.`,
//     `Image Brightness is Decreased`,
//   ]);
//   return { cmd, resp };
// }
// function executeContrast(_match: any) {
//   const cmd = '-vf eq=contrast=1.5';
//   const resp = randomChoice([
//     `I hope You Like It 🙂.`,
//     `Image Contrast is Increased`,
//   ]);
//   return { cmd, resp };
// }
// function executeSaturation(_match: any) {
//   const cmd = '-vf eq=saturation=1.5';
//   const resp = randomChoice([
//     `I hope You Like It 🙂.`,
//     `Image Saturation is Increased`,
//   ]);
//   return { cmd, resp };
// }
// function executeGamma(_match: any) {
//   const cmd = '-vf eq=gamma=0.5';
//   const resp = randomChoice([
//     `I hope You Like It 🙂.`,
//     `Image Gamma is Decreased`,
//   ]);
//   return { cmd, resp };
// }
// function executeHue(_match: any) {
//   const cmd = '-vf eq=hue=0.3';
//   const resp = randomChoice([
//     `I hope You Like It 🙂.`,
//     `Image Hue is Decreased`,
//   ]);
//   return { cmd, resp };
// }
// function executeInvert(_match: any) {
//   const cmd = '-vf eq=invert=1';
//   const resp = randomChoice([`I hope You Like It 🙂.`, `Image Inverted`]);
//   return { cmd, resp };
// }
// function executeOpacity(_match: any) {
//   const cmd = '-vf eq=opacity=0.5';
//   const resp = randomChoice([
//     `I hope You Like It 🙂.`,
//     `Image Opacity is Decreased`,
//   ]);
//   return { cmd, resp };
// }
function executePixelate(_match: any) {
  const cmd = '-vf scale=iw/10:ih/10:flags=neighbor';
  logger.log('executeHue', _match[1]);
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image Pixelated 🦾`]);
  return { cmd, resp };
}
function executeThreshold(_match: any) {
  const cmd = '-vf threshold=128';
  logger.log('executeHue', _match[1]);
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image Threshed 🎉`]);
  return { cmd, resp };
}
function executeVignette(_match: any) {
  const cmd = '-vf vignette';
  logger.log('executeHue', _match[1]);
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image Vignetted 🕶`]);
  return { cmd, resp };
}
function executeWarp(_match: any) {
  const cmd = '-vf lenscorrection=k1=-0.2:k2=0.1';
  logger.log('executeHue', _match[1]);
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image Warped 🎉`]);
  return { cmd, resp };
}
function executeZoom(_match: any) {
  const cmd = `-vf zoompan=z="min(zoom+0.0015,1.5)":d=125`;
  logger.log('executeHue', _match[1]);
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image Zoomed 🔍`]);
  return { cmd, resp };
}
function executeRotate(_match: any) {
  const cmd = '-vf transpose=1';
  logger.log('executeHue', _match[1]);
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image Rotated 🎯`]);
  return { cmd, resp };
}
function executeExtract(_match: any) {
  const cmd = '-vf extractplanes=y';
  logger.log('executeHue', _match[1]);
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image Extracted 🖼`]);
  return { cmd, resp };
}
function executeSharp(_match: any) {
  const cmd = '-vf unsharp';
  logger.log('executeHue', _match[1]);
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image Sharpen ✔`]);
  return { cmd, resp };
}
function executeEdge(_match: any) {
  const cmd = '-vf edgedetect';
  logger.log('executeHue', _match[1]);
  const resp = randomChoice([`I hope You Like It 🙂.`, `It Looks Scary 👻`]);
  return { cmd, resp };
}
function executeEmboss(_match: any) {
  const cmd = '-vf colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3';
  logger.log('executeHue', _match[1]);
  const resp = randomChoice([
    `I hope You Like It 🙂.`,
    `Image Looks More Embossed 🎯`,
  ]);
  return { cmd, resp };
}
function executePosturize(_match: any) {
  const cmd = '-vf elbg=2:2:1:1:1:1:1:1:1:1:1:1:1:1:1:1';
  logger.log('executeHue', _match[1]);
  const resp = randomChoice([
    `I hope You Like It 🙂.`,
    `Image is Pasteurized 🎯`,
  ]);
  return { cmd, resp };
}
function executeSmooth(_match: any) {
  const cmd = '-vf dctdnoiz=4:4:2:8';
  logger.log('executeSmooth', _match[1]);
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image is Smooth 🎯`]);
  return { cmd, resp };
}

// const chatbot = new Chat(pairs, reflection);
// chatbot.converse('quit');

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
