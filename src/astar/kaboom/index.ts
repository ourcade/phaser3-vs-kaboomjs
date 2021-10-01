import k from './kaboom'

import AStar from './scenes/AStar'
import { TILE_SIZE, TileSymbol } from './shared'

const {
	scene,
	loadSprite,
	loadSpriteAtlas,
	go
} = k

loadSprite('logo', '/logos/kaboom.png')

// load level tiles sheet and define each tile to be used
loadSpriteAtlas('/assets/tiles.png', {
	// these enums are used so that we can more easily
	// change the string character to represent each
	// (x, y, width, height) is the position in the tile sheet where this frame is
	[TileSymbol.Grass]: {
		x: 144,
		y: 64,
		width: TILE_SIZE,
		height: TILE_SIZE
	},
	[TileSymbol.Grass2]: {
		x: 144,
		y: 48,
		width: TILE_SIZE,
		height: TILE_SIZE
	} ,
	[TileSymbol.WallBody]: {
		x: 64,
		y: 80,
		width: TILE_SIZE,
		height: TILE_SIZE
	},
	[TileSymbol.WallBody2]: {
		x: 48,
		y: 192,
		width: TILE_SIZE,
		height: TILE_SIZE
	},
	[TileSymbol.WallBody3]: {
		x: 64,
		y: 96,
		width: TILE_SIZE,
		height: TILE_SIZE
	},
	[TileSymbol.WallLeft]: {
		x: 48,
		y: 64,
		width: TILE_SIZE,
		height: TILE_SIZE
	},
	[TileSymbol.WallLeft2]: {
		x: 48,
		y: 80,
		width: TILE_SIZE,
		height: TILE_SIZE
	},
	[TileSymbol.WallRight]: {
		x: 112,
		y: 64,
		width: TILE_SIZE,
		height: TILE_SIZE
	},
	[TileSymbol.WallRight2]: {
		x: 112,
		y: 80,
		width: TILE_SIZE,
		height: TILE_SIZE
	},
	[TileSymbol.WallRight3]: {
		x: 112,
		y: 48,
		width: TILE_SIZE,
		height: TILE_SIZE
	},
	[TileSymbol.WallTop]: {
		x: 80,
		y: 32,
		width: TILE_SIZE,
		height: TILE_SIZE
	},
	[TileSymbol.WallTop2]: {
		x: 64,
		y: 32,
		width: TILE_SIZE,
		height: TILE_SIZE
	},
	[TileSymbol.WallBottom]: {
		x: 48,
		y: 240,
		width: TILE_SIZE,
		height: TILE_SIZE
	},
	[TileSymbol.WallBottom2]: {
		x: 48,
		y: 208,
		width: TILE_SIZE,
		height: TILE_SIZE
	},
	[TileSymbol.WallBottom3]: {
		x: 64,
		y: 112,
		width: TILE_SIZE,
		height: TILE_SIZE
	},
	[TileSymbol.WallTopLeft]: {
		x: 48,
		y: 32,
		width: TILE_SIZE,
		height: TILE_SIZE
	},
	[TileSymbol.WallTopRight]: {
		x: 112,
		y: 32,
		width: TILE_SIZE,
		height: TILE_SIZE
	},
	[TileSymbol.WallBotLeft]: {
		x: 48,
		y: 112,
		width: TILE_SIZE,
		height: TILE_SIZE
	},
	[TileSymbol.WallBotRight]: {
		x: 112,
		y: 112,
		width: TILE_SIZE,
		height: TILE_SIZE
	},
})

// load character spritesheet and create animations
loadSpriteAtlas('/assets/faune.png', {
	'faune': {
		x: 0,
		y: 0,
		width: 768,
		height: 32,
		sliceX: 24,
		anims: {
			'walk-down': { from: 0, to: 7, loop: true, speed: 15 },
			'walk-side': { from: 8, to: 15, loop: true, speed: 15 },
			'walk-up': { from: 16, to: 23, loop: true, speed: 15 },
			// NOTE: onEnd error when loop not set even though we don't need
			// to loop for a 1 frame animation
			'idle-up': { from: 19, to: 19, loop: true },
			'idle-side': { from: 10, to: 10, loop: true },
			'idle-down': { from: 1, to: 1, loop: true },
		}
	}
})

scene('a-star', AStar)

go('a-star')
