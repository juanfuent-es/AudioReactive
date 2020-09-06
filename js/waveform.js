var song;
var mic;
var binSize = 64;
var _smooth = 0.9;
/*FFT: Fast Fourier Transform (Transformada rápida de Fourier) */
var fft; 

function preload() {
	song = loadSound('audio/my_fav_song.mp3');
}

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.mousePressed(playSong);
	noFill();
	text('Play', 10, 20);
	// mic = new p5.AudioIn();
	// mic.start();
	fft = new p5.FFT(_smooth, binSize);
	fft.setInput(song);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}

function playSong() {
	song.play();
}

function draw() {
	/* CLEANER */
	background(0);
	// var spectrum = fft.analyze();
	var waveform = fft.waveform();
	beginShape();
    for (i = 0; i < waveform.length; i++) {
        var x = map(i, 0, waveform.length, 0, width);
        var y = map(waveform[i], -1, 1, height, 0);
        // var y = map(spectrum[i], 0, 255, height, 0);
        curveVertex(x, y);
    }
    curveVertex(width, y)
    endShape();
    stroke(255);
}
