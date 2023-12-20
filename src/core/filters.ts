export const brighten = [
  {
    command: '-vf eq=brightness=0.2',
    file: 'brighten2.webp',
  },
  {
    command: '-vf eq=brightness=0.3',
    file: 'brighten3.webp',
  },
  {
    command: '-vf eq=brightness=0.4',
    file: 'brighten4.webp',
  },
];
export const contrast = [
  {
    command: '-vf eq=contrast=1.3',
    file: 'contrast1.3.webp',
  },
  {
    command: '-vf eq=contrast=1.5',
    file: 'contrast1.5.webp',
  },
  {
    command: '-vf eq=contrast=1.7',
    file: 'contrast1.7.webp',
  },
  {
    command: '-vf eq=contrast=2',
    file: 'contrast2.webp',
  },
];
export const saturation = [
  {
    command: '-vf eq=saturation=0',
    file: 'saturation0.webp',
  },
  {
    command: '-vf eq=saturation=1',
    file: 'saturation1.webp',
  },
  {
    command: '-vf eq=saturation=2',
    file: 'saturation2.webp',
  },
  {
    command: '-vf eq=saturation=3',
    file: 'saturation3.webp',
  },
  {
    command: '-vf eq=saturation=4',
    file: 'saturation4.webp',
  },
  {
    command: '-vf eq=saturation=5',
    file: 'saturation5.webp',
  },
];
export const gamma = [
  {
    command: '-vf eq=gamma=0.3',
    file: 'gamma0.3.webp',
  },
  {
    command: '-vf eq=gamma=0.5',
    file: 'gamma0.5.webp',
  },
  {
    command: '-vf eq=gamma=0.75',
    file: 'gamma0.75.webp',
  },
  {
    command: '-vf eq=gamma=1.5',
    file: 'gamma1.5.webp',
  },
  {
    command: '-vf eq=gamma=2',
    file: 'gamma2.webp',
  },
];
export const invert = [
  {
    command: '-vf negate',
    file: 'invert.webp',
  },
];
export const grayscale = [
  {
    command: '-vf hue=h=0:s=-100:H=0:b=0',
    file: 'grayscale.webp',
  },
];
export const sepia = [
  {
    command:
      '-vf colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131',
    file: 'sepia.webp',
  },
];
export const hue = [
  {
    command: '-vf hue=h=60:s=-3',
    file: 'hue60.webp',
  },
  {
    command: '-vf hue=h=120:s=-3',
    file: 'hue120.webp',
  },
  {
    command: '-vf hue=h=180:s=-3',
    file: 'hue180.webp',
  },
  {
    command: '-vf hue=h=240:s=-3',
    file: 'hue240.webp',
  },
  {
    command: '-vf hue=h=300:s=-3',
    file: 'hue300.webp',
  },
];
export const blur = [
  {
    command: '-vf boxblur=5:1',
    file: 'blur5.webp',
  },
  {
    command: '-vf boxblur=10:1',
    file: 'blur10.webp',
  },
  {
    command: '-vf boxblur=15:1',
    file: 'blur15.webp',
  },
  {
    command: '-vf boxblur=20:1',
    file: 'blur20.webp',
  },
];
export const sharpen = [
  {
    command: '-vf unsharp=5:5:1.0:5:5:0.0',
    file: 'sharpen5.webp',
  },
  {
    command: '-vf unsharp=10:10:1.0:10:10:0.0',
    file: 'sharpen10.webp',
  },
  {
    command: '-vf unsharp=15:15:1.0:15:15:0.0',
    file: 'sharpen15.webp',
  },
  {
    command: '-vf unsharp=20:20:1.0:20:20:0.0',
    file: 'sharpen20.webp',
  },
];
export const vignette = [
  {
    command: '-vf vignette=0.5:0.5',
    file: 'vignette0.5.webp',
  },
  {
    command: '-vf vignette=0.7:0.7',
    file: 'vignette0.7.webp',
  },
  {
    command: '-vf vignette=0.9:0.9',
    file: 'vignette0.9.webp',
  },
];
export const rotate = [
  {
    command: '-vf rotate=90*PI/180',
    file: 'rotate90.webp',
  },
  {
    command: '-vf rotate=180*PI/180',
    file: 'rotate180.webp',
  },
  {
    command: '-vf rotate=270*PI/180',
    file: 'rotate270.webp',
  },
];
export const flip = [
  {
    command: '-vf hflip',
    file: 'flip.webp',
  },
];
export const mirror = [
  {
    command: '-vf vflip',
    file: 'mirror.webp',
  },
];
export const crop = [
  {
    command: '-vf crop=200:200:0:0',
    file: 'crop200.webp',
  },
  {
    command: '-vf crop=400:400:0:0',
    file: 'crop400.webp',
  },
  {
    command: '-vf crop=600:600:0:0',
    file: 'crop600.webp',
  },
];
export const tint = [
  {
    command: '-vf colorbalance=rs=.3',
    file: 'tint0.3.webp',
  },
  {
    command: '-vf colorbalance=rs=.5',
    file: 'tint0.5.webp',
  },
  {
    command: '-vf colorbalance=rs=.7',
    file: 'tint0.7.webp',
  },
];
