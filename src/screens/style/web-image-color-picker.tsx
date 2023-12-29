import { hello } from 'modules/editorx-color-picker';
import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
const _HTMLContent = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Image Color Picker</title>
  <style>
  @import url('https://fonts.googleapis.com/css?family=Quattrocento+Sans');
  * {
    box-sizing: border-box;
  } 
  
  html,
  body {
    min-height: 100vh;
  }
  
  body {
    background-color: #222;
    color:white;
    font-family: Quattrocento Sans, Arial, sans-serif;
    /*display: flex;*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  #img {
    display: none;
  }
  
  canvas {}
  
  article {
    width: 400px;
    display:block;
    margin:0 auto;
  }
  article p{padding:1em 0 0 0; line-height:2em;}
  
  .viewColor {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: rgb(124, 177, 26);
  }
  
  .palette {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  
  .swatch {
    width: 50%;
    height: 105px;
    padding: 15px 30px;
    line-height: 25px;
  }
  .swatch:nth-child(5n){ margin-right: 0;}
  </style>
</head>

<body>
<article>
<img id="img" src="https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image">
<div class="viewColor">current color</div>
<!--https://www.flickr.com/photos/benimoto/2539253315/in/faves-43259386@N05/-->
<canvas id="canvas"></canvas>
<div class="palette">
</div>
<p>
You may drag and drop a new image of your choice.<br>
To pick your colors click on the canvas.<br>
You may delete picked colors by double click them.<br>
You can get the colors also from the console.
</p>
</article>


  <!-- Script -->
  <script>
  /*INCLUDES:
Lea Verou's color contrast:
https://codepen.io/enxaneta/pen/729bdb57bcace876689066ba81417fc7
hsl to rgb to hex: 
https://codepen.io/enxaneta/pen/15d04eb1b8b68c95cd5298b46b2eabb8
*/

function getFontColor(rgbRy) {
  if (colorContrast(rgbRy, [255, 255, 255]) > 4.5) {
    return "white";
  } else {
    return "black";
  }
}

var theBody = document.body;
var palette = document.querySelector(".palette");
var img = document.getElementById("img");
var viewColor = document.querySelector(".viewColor");// the current color
var colorsRy = [];
var imgW = 400;
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width = imgW; //img.width,
cx = cw / 2;
var ch = canvas.height = imgW * img.height / img.width,
  cy = ch / 2;

//draw the first image on the canvas
ctx.drawImage(img, 0, 0, cw, ch);
// get the Image Data
var imgData = ctx.getImageData(0, 0, cw, ch);
var pixels = imgData.data;
var thisRGB;
var thisRGBRy;

// on mousemove you get the current color
canvas.addEventListener("mousemove", function(e) {
  var m = oMousePos(canvas, e);

  var i = (m.x + m.y * cw) * 4;
  var R = pixels[i];
  var G = pixels[i + 1];
  var B = pixels[i + 2];
  thisRGBRy = [R, G, B];
  thisRGB = display_rgb(thisRGBRy);
  viewColor.style.backgroundColor = thisRGB;
  viewColor.style.color = getFontColor(thisRGBRy);
  //viewColor.innerHTML =  thisRGB;

}, false);

// You may drag and drop a new image of your choice.
theBody.addEventListener("dragenter", dragenter, false);
theBody.addEventListener("dragover", dragover, false);
theBody.addEventListener("drop", drop, false);

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var datos = e.dataTransfer;
  var theFiles = datos.files;

  handleFiles(theFiles);
}

function handleFiles(theFiles) {
  for (var i = 0; i < theFiles.length; i++) {
    var _file = theFiles[i];
    var isImg = /^image\//;

    if (!isImg.test(_file.type)) {
      continue;
    }

    var img = new Image();
    img.src = window.URL.createObjectURL(_file);
    img.onload = function() {
      var w = imgW;
      var h = imgW * img.height / img.width;
      
      
      // clear canvas & swatches
      ctx.clearRect(0, 0, cw, ch);
      clearSwatches(palette);
      colorsRy.length = 0;
      console.clear();
      
      // resize the canvas
      ch = canvas.height = h,
        cy = ch / 2;
      
      // draw new image
      ctx.drawImage(this, 0, 0, w, h);
      imgData = ctx.getImageData(0, 0, cw, ch);
      pixels = imgData.data;
    }
  }
}

// END drag and drop new image



function Swatch(RGBry, parent) {
  this.element = document.createElement("div");

  this.rgb = display_rgb(RGBry);
  this.hex = display_hex(rgb2hex(RGBry));
  this.hsl = display_hsl(rgb2hsl(RGBry));
  
  this.att = {}
  this.att.class = "swatch";
  this.att.style = "background-color:" + this.rgb + "; color:" + getFontColor(RGBry) + ";";
  for (var name in this.att) {
    if (this.att.hasOwnProperty(name)) {
      this.element.setAttribute(name, this.att[name]);
    }
  }
  this.element.innerHTML = this.hex + "<br>" + this.rgb + "<br>" + this.hsl;
  parent.appendChild(this.element)
}

canvas.addEventListener("click", function(e) {
  // add swatch on click
  var swatch = new Swatch(thisRGBRy, palette);
  colorsRy.push(swatch);
  // get the colors string
  var colorsStr = getColorsStr(colorsRy);
  console.clear();
  console.log(colorsStr);

}, false);

palette.addEventListener("dblclick", function(e) {
  // remove swatch on dblclick
  if (e.target.className == "swatch") {
    for (var i = 0; i < colorsRy.length; i++) {
      if (colorsRy[i].element == e.target) {
        colorsRy.splice(i, 1);
        palette.removeChild(e.target);
        break;
      }
    }
  }

  var colorsStr = getColorsStr(colorsRy);
  console.clear();
  console.log(colorsStr);

}, false);

function clearSwatches(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function getColorsStr(colorsRy) {
  var colorsStr = ''
  for (var i = 0; i < colorsRy.length; i++) {
    colorsStr += '['+colorsRy[i].hex + ','+ colorsRy[i].rgb + ','+ colorsRy[i].hsl+']';
    if(i < colorsRy.length-1){colorsStr += ',\n';};
  }
  return colorsStr;
}

function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return { //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}
  </script>
</body>

</html>
`;

export const ImageColorPicker = () => {
  useEffect(() => {
    // getHexAsync(
    //   'file:///data/user/0/com.octoria.development/cache/OCTORIA1293000158488912530.png',
    //   100,
    //   100
    // )
    //   .then((hex) => {
    //     console.log(hex);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    console.log(hello());
  }, []);

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: _HTMLContent }}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ flex: 1 }}
    />
  );
};
