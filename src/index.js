/*
	Micro-E8
	
	A fantasy, 8-bit computer emulator that runs on the browser
	github.com/Eliasdbr
	
	2021-11-27
*/

// Get the canvas element
const canvas = document.querySelector('#canvas');
const context = canvas.getContext("2d");

context.imageSmoothingEnabled = false;

// Get the scale button element
var screen_scale = 1;
const scale_button = document.querySelector('#scale');

// Screen information
var screen = context.createImageData(240,180);

// draw pattern
for (let i=0; i<screen.data.length; i+=4) {
	if (i%8) {
		screen.data[i] = 255;
		screen.data[i+1] = 255;
		screen.data[i+2] = 255;
		screen.data[i+3] = 255;
	}
	else {
		screen.data[i] = 0;
		screen.data[i+1] = 0;
		screen.data[i+2] = 0;
		screen.data[i+3] = 255;
	}
}
context.putImageData(screen,0,0);

scale_button.onclick = (e) => {
	screen_scale++;
	screen_scale = (screen_scale % 3) + 1;
	canvas.width = 240*screen_scale;
	canvas.height = 180*screen_scale;
	context.width = 240*screen_scale;
	context.height = 180*screen_scale;
	e.target.innerText = `Scale: x${screen_scale}`;
	context.putImageData(screen,0,0);
}
