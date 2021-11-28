/*
	Micro-E8
	
	A fantasy, 8-bit computer emulator that runs on the browser
	github.com/Eliasdbr
	
	2021-11-27
*/

// Get the canvas element
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d",{alpha: false});
canvas.width = 240;
canvas.height = 180;


// Get the scale button element
var screen_scale = 1;
const scale_button = document.querySelector('#scale');

// Screen information
var frame = ctx.createImageData(240,180);

// draw pattern
for (let i=0; i<frame.data.length; i+=4) {
	if (i%8) {
		frame.data[i] = 255;
		frame.data[i+1] = 255;
		frame.data[i+2] = 255;
		frame.data[i+3] = 255;
	}
	else {
		frame.data[i] = 0;
		frame.data[i+1] = 0;
		frame.data[i+2] = 0;
		frame.data[i+3] = 255;
	}
}
ctx.putImageData(frame,0,0);

scale_button.onclick = (e) => {
	screen_scale++;
	screen_scale = (screen_scale % 3) + 1;
	canvas.style.width = `${240*screen_scale}px`;
	canvas.style.height = `${180*screen_scale}px`;
	canvas.width = 240*screen_scale;
	canvas.height = 180*screen_scale;
	e.target.innerText = `Scale: x${screen_scale}`;
	canvas.imageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
	createImageBitmap(frame, 0, 0, 240, 180, {resizeQuality: 'pixelated'})
		.then( 
			(screen) => {
				ctx.drawImage(screen, 0, 0, 240*screen_scale, 180*screen_scale);
			}, 
			(error) => console.log(error) 
		);
}
