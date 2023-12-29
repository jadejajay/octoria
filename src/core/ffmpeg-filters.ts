export class FfmpegFilters {
  filterCommand = '-vf';
  constructor() {}
  // brightness
  // Set the brightness expression. The value must be a float value in range -1.0 to 1.0. The default value is "0".
  setBrightness = (brightness: number) => {
    return `${this.filterCommand} eq=brightness=${brightness}`;
  };
  // contrast
  // Set the contrast expression. The value must be a float value in range -1000.0 to 1000.0. The default value is "1".
  setContrast = (contrast: number) => {
    return `${this.filterCommand} eq=contrast=${contrast}`;
  };
  // saturation
  // Set the saturation expression. The value must be a float in range 0.0 to 3.0. The default value is "1".
  setSaturation = (saturation: number) => {
    return `${this.filterCommand} eq=saturation=${saturation}`;
  };
  // gamma
  // Set the gamma expression. The value must be a float in range 0.1 to 10.0. The default value is "1".
  setGamma = (gamma: number) => {
    return `${this.filterCommand} eq=gamma=${gamma}`;
  };
  setInvert = () => {
    return `${this.filterCommand} negate`;
  };
  //hue
  //   h
  // Specify the hue angle as a number of degrees. It accepts an expression, and defaults to "0".

  // s
  // Specify the saturation in the [-10,10] range. It accepts an expression and defaults to "1".

  // H
  // Specify the hue angle as a number of radians. It accepts an expression, and defaults to "0".

  // b
  // Specify the brightness in the [-10,10] range. It accepts an expression and defaults to "0".
  setGrayscale = ({
    h = 0,
    s = -100,
    H = 0,
    b = 0,
  }: {
    h?: number;
    s?: number;
    H?: number;
    b?: number;
  }) => {
    return `${this.filterCommand} hue=h=${h}:s=${s}:H=${H}:b=${b}`;
  };
  //   Convert source to grayscale:
  // colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3
  setGrayscale2 = () => {
    return `${this.filterCommand} colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3`;
  };
  // Simulate sepia tones:
  // colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131
  setSepia = () => {
    return `${this.filterCommand} colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131`;
  };
  //   Apply simple strong vignetting effect:
  // vignette=PI/4
  // Make a flickering vignetting:
  // vignette='PI/4+random(1)*PI/50':eval=frame
  setVignette = () => {
    return `${this.filterCommand} vignette`;
  };
  setTint = () => {
    return `${this.filterCommand} colorbalance=rs=.3:gs=.3:bs=.3`;
  };
  setTemperature = () => {
    return `${this.filterCommand} colorbalance=bs=.3`;
  };
  setSharpen = () => {
    //unsharp=luma_msize_x=7:luma_msize_y=7:luma_amount=2.5
    return `${this.filterCommand} unsharp=5:5:1.0:5:5:0.0`;
  };
  setBlur = () => {
    return `${this.filterCommand} boxblur=5:5`;
  };
  setPixelate = () => {
    return `${this.filterCommand} scale=iw/10:-1,scale=iw*10:-1`;
  };
  //   codebook_length, l
  // Set codebook length. The value must be a positive integer, and represents the number of distinct output colors. Default value is 256.

  // nb_steps, n
  // Set the maximum number of iterations to apply for computing the optimal mapping. The higher the value the better the result and the higher the computation time. Default value is 1.

  // seed, s
  // Set a random seed, must be an integer included between 0 and UINT32_MAX. If not specified, or if explicitly set to -1, the filter will try to use a good random seed on a best effort basis.

  // pal8
  // Set pal8 output pixel format. This option does not work with codebook length greater than 256. Default is disabled.

  // use_alpha
  // Include alpha values in the quantization calculation. Allows creating palettized output images (e.g. PNG8) with multiple alpha smooth blending.
  setPosterizeUsingELGB = ({
    codebook_length = 256,
    nb_steps = 1,
    seed = -1,
    pal8 = 0,
    use_alpha = 0,
  }: {
    codebook_length?: number;
    nb_steps?: number;
    seed?: number;
    pal8?: number;
    use_alpha?: number;
  }) => {
    return `${this.filterCommand} elbg=${codebook_length}:${nb_steps}:${seed}:${pal8}:${use_alpha}`;
  };
  //   Define the drawing mode.

  // ‘wires’
  // Draw white/gray wires on black background.

  // ‘colormix’
  // Mix the colors to create a paint/cartoon effect.

  // ‘canny’
  // Apply Canny edge detector on all selected planes.
  setEdge = ({
    mode = 'wires',
    factor = 1,
    threshold = 20,
    high = 30,
    low = 10,
    prescreen = 0,
    postscreen = 0,
  }: {
    mode?: string;
    factor?: number;
    threshold?: number;
    high?: number;
    low?: number;
    prescreen?: number;
    postscreen?: number;
  }) => {
    return `${this.filterCommand} edgedetect=${mode}:${factor}:${threshold}:${high}:${low}:${prescreen}:${postscreen}`;
  };
  //  convolution

  // 0m
  // 1m
  // 2m
  // 3m
  // Set matrix for each plane. Matrix is sequence of 9, 25 or 49 signed integers in square mode, and from 1 to 49 odd number of signed integers in row mode.

  // 0rdiv
  // 1rdiv
  // 2rdiv
  // 3rdiv
  // Set multiplier for calculated value for each plane. If unset or 0, it will be sum of all matrix elements.

  // 0bias
  // 1bias
  // 2bias
  // 3bias
  // Set bias for each plane. This value is added to the result of the multiplication. Useful for making the overall image brighter or darker. Default is 0.0.

  // 0mode
  // 1mode
  // 2mode
  // 3mode
  // Set matrix mode for each plane. Can be square, row or column. Default is square.
  setLaplacianEdgeDetection = ({
    m = '1 1 1 1 -1 1 1 1 1:1 1 1 1 -1 1 1 1 1:1 1 1 1 -1 1 1 1 1:1 1 1 1 -1 1 1 1 1:5:5:5:1:0:4:4:0',
    rdiv = 1,
    bias = 0,
    mode = 'square',
  }: {
    m?: string;
    rdiv?: number;
    bias?: number;
    mode?: string;
  }) => {
    return `${this.filterCommand} convolution=${m}:${rdiv}:${bias}:${mode}`;
  };
  setEmboss = () => {
    return `${this.filterCommand} convolution='-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2'`;
  };
  //   planes
  // Set which planes will be processed, unprocessed planes will be copied. By default value 0xf, all planes will be processed.

  // scale
  // Set value which will be multiplied with filtered result.

  // delta
  // Set value which will be added to filtered result.
  setSobel = ({
    planes = 0xf,
    scale = 1,
    delta = 0,
  }: {
    planes?: number;
    scale?: number;
    delta?: number;
  }) => {
    return `${this.filterCommand} sobel=${planes}:${scale}:${delta}`;
  };
  getFilter = () => {
    return '-filters';
  };
  chromaKey = ({
    color = '0x00FF00',
    similarity = 0.1,
    blend = 0,
    yuv = '',
  }: {
    color?: string;
    similarity?: number;
    blend?: number;
    yuv?: string;
  }) => {
    return `${this.filterCommand} chromakey=${color}:${similarity}:${blend}:${yuv}`;
  };
  psContrast = ({}: {}) => {
    return `curves=psfile=https://ibaisindia.co.in/octoria/database/presets/Contrast.acv`;
  };
}
// ffmpeg -i 1.png -vf "curves=psfile=Brighten.acv"  brighten_1.webp
