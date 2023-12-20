// import React from 'react';
// import { WebView } from 'react-native-webview';

const _HTMLContent = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Image Color Picker</title>
  <style>
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      font-family: 'Poppins', sans-serif;
    }

    body {
      background-color: #025bee;
    }

    .wrapper {
      background-color: #ffffff;
      width: 90%;
      max-width: 31.25em;
      position: absolute;
      transform: translateX(-50%);
      left: 50%;
      top: 0.5em;
      padding: 1.5em;
      border-radius: 0.8em;
    }

    img {
      display: block;
      width: 80%;
      margin: auto;
    }

    .btns-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    input,
    label,
    button {
      border: none;
      outline: none;
    }

    input[type='file'] {
      display: none;
    }

    label,
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.1em;
      flex: 1;
      background-color: #025bee;
      color: #ffffff;
      text-align: center;
      padding: 0.8em 0;
      border-radius: 0.3em;
      cursor: pointer;
    }

    #result {
      /* display: grid; */
      grid-template-columns: 1fr 1fr;
      grid-gap: 1em;
    }

    #result div {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    #result input {
      background-color: transparent;
      font-size: 1em;
      padding: 0.5em;
      width: 100%;
      color: #313b4c;
      border-bottom: 0.1em solid #021637;
    }

    #result button {
      position: absolute;
      right: 0.6em;
      background-color: transparent;
      color: #7c8696;
    }

    #picked-color-ref {
      grid-column: 2;
      grid-row: 1 / 3;
      border: 0.6em solid #d9e8ff;
      border-radius: 0.5em;
    }

    #custom-alert {
      transform: scale(0);
      transition: 0.5s;
      transform-origin: center;
      background-color: #d9e8ff;
      color: #025bee;
      text-align: center;
      padding: 0.5em;
      margin-top: 1.5em;
    }

    .hide {
      display: none;
    }

    #error {
      color: #ff725a;
      text-align: center;
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="image-container">
      <img id="image" src="http://itekindia.com/1.jpg" />
    </div>
    <div class="btns-container">
      <button id="pick-color">Pick Color</button>
    </div>
    <div id="error" class="hide"></div>
    <div id="result" class="hide">
      <div>
        <input type="text" id="hex-val-ref" />
      </div>
      <div>
        <input type="text" id="rgb-val-ref" />
      </div>
      <div id="picked-color-ref"></div>
    </div>
    <div class="btns-container">
      <button id="pick-color">Pick Color</button>
    </div>
    <div id="custom-alert">Color Code Copied!</div>
  </div>
  <!-- Script -->
  <script>
    //Create Initial references
    let pickColor = document.getElementById('pick-color');
    let error = document.getElementById('error');
    let image = document.getElementById('image');
    let hexValRef = document.getElementById('hex-val-ref');
    let rgbValRef = document.getElementById('rgb-val-ref');
    let customAlert = document.getElementById('custom-alert');
    let pickedColorRef = document.getElementById('picked-color-ref');
    let eyeDropper;

    //Function On Window Load
    window.onload = () => {
      //Check if the browser supports eyedropper
      if ('EyeDropper' in window) {
        pickColor.classList.remove('hide');
        eyeDropper = new EyeDropper();
      } else {
        error.classList.remove('hide');
        error.innerText = "Your browser doesn't support Eyedropper API";
        pickColor.classList.add('hide');
        return false;
      }
    };

    //Eyedropper logic
    const colorSelector = async () => {
      const color = await eyeDropper
        .open()
        .then((colorValue) => {
          error.classList.add('hide');
          //Get the hex color code
          let hexValue = colorValue.sRGBHex;
          //Convert Hex Value To RGB
          let rgbArr = [];
          for (let i = 1; i < hexValue.length; i += 2) {
            rgbArr.push(parseInt(hexValue[i] + hexValue[i + 1], 16));
            console.log(rgbArr);
          }
          let rgbValue = 'rgb(' + rgbArr + ')';
          console.log(hexValue, rgbValue);
          result.style.display = 'grid';
          hexValRef.value = hexValue;
          rgbValRef.value = rgbValue;
          pickedColorRef.style.backgroundColor = hexValue;
        })
        .catch((err) => {
          error.classList.remove('hide');
          //If user presses escape to close the eyedropper
          if (err.toString().includes('AbortError')) {
            error.innerText = '';
          } else {
            error.innerText = err;
          }
        });
    };

    //Button click
    pickColor.addEventListener('click', colorSelector);
  </script>
</body>

</html>
`;

// export const ImageColorPicker = () => {
//   return (
//     <WebView
//       originWhitelist={['*']}
//       source={{ html: _HTMLContent }}
//       // eslint-disable-next-line react-native/no-inline-styles
//       style={{ flex: 1 }}
//     />
//   );
// };
