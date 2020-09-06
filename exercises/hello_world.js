var song;
/* Valor de suavizado. smooth es palabra reservada,
 * _ es una buena práctica para renombrar variables que tienen nombre similar a otros sin causar conflictos
 */
var _smooth = 0.9;
/*
 * Número de muestras a analizar
 */
var samples = 128;
var columns = 16;
var rows = 8;
/*
 * FFT: Fast Fourier Transform (Transformada rápida de Fourier)
 */
var fft;

function preload() {
    song = loadSound('/audio/parcels.mp3');
}

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.mousePressed(playSong);
    fill(255);
    frameRate(6);
    fft = new p5.FFT(_smooth, samples);
    fft.setInput(song);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}

function playSong() {
    if (song.isPlaying()) {
        song.stop();
    } else {
        song.play();
    }
    // Amplitud de onda
    song.setVolume(1.0);
}

function draw() {
    /* CLEANER */
    background(0);
    noStroke();
    fill(255);
    var spectrum = fft.analyze();
    var width_size = width / rows;
    var height_size = height / columns;
    var index = 0;
    for (var x = 0; x < width; x += width_size) {
        for (var y = 0; y < height; y += height_size) {
            var value = spectrum[index];
            // var _width = map(value, 0, 255, 0, width_size);
            // var _height = map(value, 0, 255, 0, height_size);
            // rect(x, y, _width, _height);
            fill(value, 255 - value, 255);
            text(value, x, y);
            index++;
        }
    }
}
