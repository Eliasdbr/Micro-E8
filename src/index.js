/*
	Micro-E8
	
	A fantasy, 8-bit computer emulator that runs on the browser
	github.com/Eliasdbr
	
	2021-11-27
*/
import { COLOR, CHARSET } from './gpu/rom.js';

// Frames per second
const FPS = 30;
// Screen resolution
const SCREEN_W = 256;
const SCREEN_H = 192;

// Get the canvas element
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d", { alpha: false });
// Get the scale button element
var screen_scale = 3;
canvas.width = SCREEN_W*screen_scale;
canvas.height = SCREEN_H*screen_scale;


const scale_button = document.querySelector('#scale');

// Screen information
var frame = ctx.createImageData(SCREEN_W,SCREEN_H);

// Button for scaling screen
scale_button.onclick = (e) => {
	screen_scale++;
	screen_scale = (screen_scale % 3) + 1;
	canvas.style.width = `${SCREEN_W*screen_scale}px`;
	canvas.style.height = `${SCREEN_H*screen_scale}px`;
	canvas.width = SCREEN_W*screen_scale;
	canvas.height = SCREEN_H*screen_scale;
	e.target.innerText = `Scale: x${screen_scale}`;
}

// get RGBA from Palette
function getRGB(index) {
	return [
		(COLOR[index] >> 16) & 0xFF,
		(COLOR[index] >>  8) & 0xFF,
		 COLOR[index]        & 0xFF,
	];
}

// draw tile
function drawTile(id=0,xTile=0,yTile=0,col=0xF0) {
	for (let i=0; i<64; i++) {
		let frameAddr = (yTile*32*8*8*4) + (xTile*8*4 + Math.floor(i/8)*31*8*4) + i*4;
		let pixel = getRGB( 
			(
				col >> ( 
					(
						CHARSET[ id*8 + Math.floor(i/8) ] >> (
							7 - (i%8)
						) & 1 
					) * 4 
				)
			) & 0xF 
		);
		frame.data[  frameAddr  ] = pixel[0];
		frame.data[frameAddr + 1] = pixel[1];
		frame.data[frameAddr + 2] = pixel[2];
		frame.data[frameAddr + 3] = 255;
	}
}
for (let i=0; i<32*24; i++)
	drawTile((32+i)%128,i%32,Math.floor(i/32),i%256);

// Frame rendering
window.setInterval(
	() => {
		// Screen drawing
		canvas.imageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;
		createImageBitmap(frame, 0, 0, SCREEN_W, SCREEN_H, {resizeQuality: 'pixelated'})
			.then( 
				(screen) => {
					ctx.drawImage(screen, 0, 0, SCREEN_W*screen_scale, SCREEN_H*screen_scale);
				}, 
				(error) => {
					console.log(error);
					window.clearInterval();
				}
			);
	},
	Math.floor(1000 / FPS)
);
