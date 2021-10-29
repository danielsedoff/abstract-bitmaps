/**
 * sample 1: create the abstract bitmap, 
 * set the drawing parameters and draw a function graph.
 */

var sample1 = function () {

    var drawing = document.createElement('div');
    document.body.appendChild(drawing);
    drawing.id = "drawing";

    var headerElement = "<table><tbody><tr>";
    var footerElement = "</tr></tbody></table>";
    var newLineElement = "</tr><tr>";
    var zeroElement = "<td style='width: 9px; height: 16px; background-color: white;'></td>";
    var oneElement = "<td style='width: 9px; height: 16px; background-color: green;'></td>";

    var width = 50;
    var height = 50;
    var redrawInterval = 500;
    var pixelArray = makepixelArray(width, height);

    setLocalDrawingParams("drawing",
        pixelArray, redrawInterval, headerElement, footerElement,
        newLineElement, zeroElement, oneElement);
    drawSine(width, height);

}

var sample2 = function () {
    /**
     * sample 2: create another abstract bitmap, 
     * set the drawing parameters and draw a function graph.
     */

    var drawing = document.createElement('div');
    document.body.appendChild(drawing);
    drawing.id = "drawing";

    var headerElement = "<style>.z{background-color: yellow; color:yellow; }" +
        ".o{background-color: blue; color: blue;} p{font-family: monospace;} </style><p>";
    var footerElement = "</p>";
    var newLineElement = "<br/>";
    var zeroElement = "<span class='z'>N</span>";
    var oneElement = "<span class='o'>N</span>";

    var width = 50;
    var height = 50;
    var redrawInterval = 500;
    var pixelArray = makepixelArray(width, height);

    setLocalDrawingParams("drawing",
        pixelArray, redrawInterval, headerElement, footerElement,
        newLineElement, zeroElement, oneElement);
    drawSine(width, height);

}

var sample3 = function () {
    /**
     * sample 3: You may use any type of elements.
     */

    var drawing = document.createElement('div');
    document.body.appendChild(drawing);
    drawing.id = "drawing";

    var headerElement = "";
    var footerElement = "";
    var newLineElement = "<br/>";
    var zeroElement = "<input type=checkbox checked/>";
    var oneElement = "<input type=checkbox unchecked/>";

    var width = 50;
    var height = 50;
    var redrawInterval = 500;

    var pixelArray = makepixelArray(width, height);

    setLocalDrawingParams("drawing",
        pixelArray, redrawInterval, headerElement, footerElement,
        newLineElement, zeroElement, oneElement);
    drawSine(width, height);

}


var samples = [];

samples.push(sample1);
samples.push(sample2);
samples.push(sample3);


var showSamples = function () {
    var buttons = [];
    for (let i = 1; i <= 3; i++) {
        buttons[i] = document.createElement('button');
        buttons[i].value = "sample " + i;
        document.body.appendChild(buttons[i]);
        buttons[i].innerText = "sample " + i;
        buttons[i].onclick = samples[i - 1];
    }
}


var drawSine = function (width, height) {
    for (x = 0; x < width; x++) {
        for (y = 0; y < height; y++) {
            if (Math.cos(x / 4) * height / 4 >= y - height / 2) {
                fillxy(x, y);
            } else {
                clearxy(x, y);
            }
        }
    }
}

showSamples();
