import { FFmpegWrapper } from './ffmpeg-wrapper';

export class Chat {
  private _pairs: any;
  private _reflections: any;
  private _regex: any;
  private _ffmpeg = new FFmpegWrapper();
  constructor(pairs: any = pair, reflections: any = reflection) {
    this._pairs = pairs.map((pair: any) => [new RegExp(pair[0], 'i'), pair[1]]);
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
      const match = pattern.exec(str);
      if (match) {
        let resp = response(match);
        resp = this.wildcards(resp, match);
        if (resp.slice(-2) === '?.') {
          resp = resp.slice(0, -2) + '.';
        }
        if (resp.slice(-2) === '??') {
          resp = resp.slice(0, -2) + '?';
        }
        return resp;
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
        return "Sorry, I don't understand.";
      }
    }
    return '';
  }
}

// // Define response functions that accept the match
// function startResponse(match: any) {
//   try {
//     const numInt = parseInt(match[1], 10);
//     return `result is :${numInt * 2}`;
//   } catch (e) {
//     const x = '2';
//     const numInt = parseInt(x, 10); // Assign a default value
//     return `result is :${numInt * 2}`;
//   }
// }

function executeResponse(_match: any) {
  return `Executing the ${_match[1]} function`;
}
function executeNegate(_match: any) {
  return `Executing the negate function`;
}
function executeVerticalFlip(_match: any) {
  return `Executing the vertical flip function`;
}
function executeHorizontalFlip(_match: any) {
  return `Executing the horizontal flip function`;
}
function executeRotate(_match: any) {
  return `Executing the rotate function`;
}
function executeResize(_match: any) {
  return `Executing the resize function`;
}
function executeCrop(_match: any) {
  return `Executing the crop function`;
}
function executeRemove(_match: any) {
  return `Executing the remove function`;
}
function executeBlur(_match: any) {
  return `Executing the blur function`;
}
function executeExtract(_match: any) {
  return `Executing the extract function`;
}
function executeSharp(_match: any) {
  return `Executing the sharp function`;
}
function executeEdge(_match: any) {
  return `i am so hurry, Executing the edge function`;
}
function executeEmboss(_match: any) {
  return `Executing the emboss function`;
}
function executePosturize(_match: any) {
  return `Executing the posturize function`;
}
// Define pattern-response pairs
const pair = [
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
  // question related to resize image which contain resize in the question
  ['resize (.+)', executeResize], //ex : resize image
  // question related to crop image which contain crop in the question
  ['crop (.+)', executeCrop], //ex : crop image
  // question related to crop image which contain crop in the question
  ['crop (.+)', executeCrop], //ex : crop image
  // question related to chroma key image which contain chroma key in the question
  ['remove (.+)', executeRemove], //ex : chroma key image
  // question related to blur image which contain blur in the question
  ['blur (.+)', executeBlur], //ex : blur image
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
];

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
