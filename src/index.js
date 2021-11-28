/*
	Micro-E8
	
	A fantasy, 8-bit computer emulator that runs on the browser
	github.com/Eliasdbr
	
	2021-11-27
*/

// Frames per second
const FPS = 60;

// Color palette (Dawn Bringer 16)
const COLOR = [
	0x140c1c, //#140c1c
	0x442434, //#442434
	0x30346d, //#30346d
	0x4e4a4e, //#4e4a4e
	0x854c30, //#854c30
	0x346524, //#346524
	0xd04648, //#d04648
	0x757161, //#757161
	0x597dce, //#597dce
	0xd27d2c, //#d27d2c
	0x8595a1, //#8595a1
	0x6daa2c, //#6daa2c
	0xd2aa99, //#d2aa99
	0x6dc2ca, //#6dc2ca
	0xdad45e, //#dad45e
	0xdeeed6, //#deeed6
];

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

// Test variables
var offset = 0;


scale_button.onclick = (e) => {
	screen_scale++;
	screen_scale = (screen_scale % 3) + 1;
	canvas.style.width = `${240*screen_scale}px`;
	canvas.style.height = `${180*screen_scale}px`;
	canvas.width = 240*screen_scale;
	canvas.height = 180*screen_scale;
	e.target.innerText = `Scale: x${screen_scale}`;
}

// Frame rendering
window.setInterval(
	() => {
		if (offset < 255) offset++;
		else offset = 0;
		// draw pattern
		/*
		for (let i=0; i<frame.data.length; i+=4) {
			frame.data[i]   = (COLOR[(i/4+offset) & 0xF] >> 16) & 0xFF;
			frame.data[i+1] = (COLOR[(i/4+offset) & 0xF] >>  8) & 0xFF;
			frame.data[i+2] =  COLOR[(i/4+offset) & 0xF]        & 0xFF;
			frame.data[i+3] = 255;
		}
		*/
		// Screen drawing
		canvas.imageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;
		createImageBitmap(frame, 0, 0, 240, 180, {resizeQuality: 'pixelated'})
			.then( 
				(screen) => {
					ctx.drawImage(screen, 0, 0, 240*screen_scale, 180*screen_scale);
				}, 
				(error) => {
					console.log(error);
					window.clearInterval();
				}
			);
	},
	Math.floor(1000 / FPS)
);
