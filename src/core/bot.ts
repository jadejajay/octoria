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
  [`\\bblur\\b.*?(\\d+(\\.\\d+)?)\\b`, executeBlur], //ex : blur image
  ['remove (.+)', executeRemove], //ex : chroma key image
  ['execute (.+)', executeResponse],
  // question related to negate image which contain negate in the question
  ['negate', executeNegate], //ex : negate image
  // question related to vertical flip image which contain vertical flip in the question
  ['vertical flip (.+)', executeVerticalFlip], //ex : vertical flip image
  ['flip (.+) vertically', executeHorizontalFlip], //ex : flip image vertically
  // question related to horizontal flip image which contain horizontal flip in the question
  ['horizontal flip (.+)', executeHorizontalFlip], //ex : horizontal flip image
  ['flip', executeResponse], //ex : flip image horizontally
  // question related to rotate image which contain rotate in the question
  ['rotate (.+)', executeRotate], //ex : rotate image
  // question related to extract color from image
  ['extract (.+)', executeExtract], //ex : extract color from image
  // question related to sharp image which contain sharp in the question
  ['sharp (.+)', executeSharp], //ex : sharp image
  // question related to edge image which contain edge in the question
  ['edge (.+)', executeEdge], //ex : edge image
  // question related to emboss image which contain emboss in the question
  ['emboss (.+)', executeEmboss], //ex : emboss image
  // question related to posturize image which contain posturize in the question
  ['posturize (.+)', executePosturize], //ex : posturize image
  ['pixelate (.+)', executePixelate], //ex : pixelate image
  ['threshold (.+)', executeThreshold], //ex : threshold image
  ['vignette (.+)', executeVignette], //ex : vignette image
  ['warp (.+)', executeWarp], //ex : warp image
  ['zoom (.+)', executeZoom], //ex : zoom image
  ['hue (.+)', executeHue], //ex : hue image
  ['(.+) (.+)', executeResponse], //ex : hue image
  ['(.+)', executeResponse], //ex : hue image
];

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
  const cmd = '-vf chromakey=0x00FF00:0.1:0.2';
  const resp = randomChoice([`I hope You Like It 🙂.`, `So Do You Like This?`]);
  return { cmd, resp };
}

function executeResponse(_match: any) {
  const cmd = '';
  const resp = `we can not execute command right now 😥, but we will soon 😎`;
  return { cmd, resp };
}
function executeNegate(_match: any) {
  const cmd = '-vf negate';
  const resp = randomChoice([
    `I hope You Like It 🙂`,
    `I think you like Negative.`,
  ]);
  return { cmd, resp };
}
function executeVerticalFlip(_match: any) {
  const cmd = '-vf vflip';
  const resp = randomChoice([
    `I hope You Like It 🙂.`,
    `Image is Vertically flipped`,
  ]);
  return { cmd, resp };
}
function executeHorizontalFlip(_match: any) {
  const cmd = '-vf hflip';
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
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image Pixelated 🦾`]);
  return { cmd, resp };
}
function executeThreshold(_match: any) {
  const cmd = '-vf threshold=128';
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image Threshed 🎉`]);
  return { cmd, resp };
}
function executeVignette(_match: any) {
  const cmd = '-vf vignette';
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image Vignetted 🕶`]);
  return { cmd, resp };
}
function executeWarp(_match: any) {
  const cmd = '-vf lenscorrection=k1=-0.2:k2=0.1';
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image Warped 🎉`]);
  return { cmd, resp };
}
function executeZoom(_match: any) {
  const cmd = `-vf zoompan=z="min(zoom+0.0015,1.5)":d=125`;
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image Zoomed 🔍`]);
  return { cmd, resp };
}
function executeRotate(_match: any) {
  const cmd = '-vf transpose=1';
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image Rotated 🎯`]);
  return { cmd, resp };
}
function executeExtract(_match: any) {
  const cmd = '-vf extractplanes=y';
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image Extracted 🖼`]);
  return { cmd, resp };
}
function executeSharp(_match: any) {
  const cmd = '-vf unsharp';
  const resp = randomChoice([`I hope You Like It 🙂.`, `Image Sharpen ✔`]);
  return { cmd, resp };
}
function executeEdge(_match: any) {
  const cmd = '-vf edgedetect';
  const resp = randomChoice([`I hope You Like It 🙂.`, `It Looks Scary 👻`]);
  return { cmd, resp };
}
function executeEmboss(_match: any) {
  const cmd = '-vf colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3';
  const resp = randomChoice([
    `I hope You Like It 🙂.`,
    `Image Looks More Embossed 🎯`,
  ]);
  return { cmd, resp };
}
function executePosturize(_match: any) {
  const cmd = '-vf elbg=2:2:1:1:1:1:1:1:1:1:1:1:1:1:1:1';
  const resp = randomChoice([
    `I hope You Like It 🙂.`,
    `Image is Pasteurized 🎯`,
  ]);
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
