/* Abstract bitmap manipulation software
   github.com/danielsedoff in 2021
   MIT License

   See samples in samples.js or open the sample HTML file.
*/

var equalArrays = function (arr1, arr2) {
  if (arr1.length != arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) return false;
  }
  return true;
}

var makepixelArray = function (width, height) {
  var width = Math.floor(width);
  var height = Math.floor(height);

  var pixelArray = new Uint8Array(2 + 2 + width * height);
  var base = (Math.pow(2, pixelArray.BYTES_PER_ELEMENT * 8));
  pixelArray[0] = Math.floor(width / base);
  pixelArray[1] = width - base * pixelArray[0];
  pixelArray[2] = Math.floor(height / base);
  pixelArray[3] = height - base * pixelArray[2];

  return pixelArray;
};

var checkDimensions = function (pixelArray, x, y) {
  var base = (Math.pow(2, pixelArray.BYTES_PER_ELEMENT * 8));

  if (x < 0 || y < 0) {
    throw new Error("x and y may not be below 0");
  }
  if (x > base * base - 1 || y > base * base - 1) {
    throw new Error("max x and y value: " + (base * base - 1));
  }

  var width = pixelArray[0] * base + pixelArray[1];
  var height = pixelArray[2] * base + pixelArray[3];

  if (x >= width || y >= height) {
    throw new Error("max width/height: " + (width - 1) + "/" + (height - 1));
  }
  return width;
};

var renderPixelArrayToDocument = function (pixelArray, oldpixelArray, id) {
  if (equalArrays(oldpixelArray, pixelArray)) return;

  window.__localDrawingParams.oldpixelArray = new Uint8Array(pixelArray);

  var width = checkDimensions(pixelArray, 1, 1);

  var headerElement = window.__localDrawingParams.headerElement;
  var footerElement = window.__localDrawingParams.footerElement;
  var newLineElement = window.__localDrawingParams.newLineElement;
  var zeroElement = window.__localDrawingParams.zeroElement;
  var oneElement = window.__localDrawingParams.oneElement;

  var renderedValue = headerElement;
  for (let i = 2 + 2; i < pixelArray.length; i++) {
    renderedValue += 0 == pixelArray[i] ? zeroElement : oneElement;
    if (3 == i % width) renderedValue += newLineElement;
  }

  renderedValue += footerElement;
  if (document.getElementById(id).innerHTML != renderedValue) {
    document.getElementById(id).innerHTML = renderedValue;
  }
};

var setLocalDrawingParams = function (elementId, pixelArray,
  timeInterval, headerElement, footerElement,
  newLineElement, zeroElement, oneElement) {
  if (undefined == timeInterval) {
    timeInterval = 500;
  }

  oldpixelArray = new Uint8Array(1);
  window.__localDrawingParams = {
    headerElement: headerElement, footerElement: footerElement, newLineElement: newLineElement,
    zeroElement: zeroElement, oneElement: oneElement, elementId: elementId, pixelArray: pixelArray, oldpixelArray: oldpixelArray
  };

  setInterval(
    function () {
      renderPixelArrayToDocument(
        window.__localDrawingParams.pixelArray,
        window.__localDrawingParams.oldpixelArray,
        window.__localDrawingParams.elementId
      ),
        timeInterval
    });
}

var setxy = function (x, y, value) {
  if (undefined == window.__localDrawingParams) {
    throw new Error("Call setLocalDrawingParams() first.");
  }
  var pixelArray = window.__localDrawingParams.pixelArray;
  var width = checkDimensions(pixelArray, x, y);
  pixelArray[width * y + x + 2 + 2] = value;
  return;
};

var getxy = function (x, y) {
  if (undefined == window.__localDrawingParams) {
    throw new Error("Call setLocalDrawingParams() first.");
  }
  var pixelArray = window.__localDrawingParams.pixelArray;
  var width = checkDimensions(pixelArray, x, y);
  return pixelArray[width * y + x + 2 + 2];
};

var fillxy = function (x, y) {
  setxy(x, y, 1);
};

var clearxy = function (x, y) {
  setxy(x, y, 0);
};
