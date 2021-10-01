export const TILE_SIZE = 16

export enum Tile
{
	Grass = 125,
	Grass2 = 96,
	WallTopLeft = 61,
	WallTopRight = 65,
	WallTop = 63,
	WallTop2 = 62,
	WallRight = 123,
	WallRight2 = 152,
	WallRight3 = 94,
	WallLeft = 119,
	WallLeft2 = 148,
	WallBody = 149,
	WallBody2 = 351,
	WallBody3 = 178,
	WallBotLeft = 206,
	WallBottom = 438,
	WallBottom2 = 380,
	WallBottom3 = 207,
	WallBotRight = 210,
}

export enum TileSymbol
{
	Grass = ' ',
	Grass2 = 'a',
	WallTopLeft = 'b',
	WallTopRight = 'c',
	WallTop = 'd',
	WallTop2 = 'e',
	WallRight = 'f',
	WallRight2 = 'g',
	WallRight3 = 'h',
	WallLeft = 'i',
	WallLeft2 = 'j',
	WallBody = 'k',
	WallBody2 = 'l',
	WallBody3 = 'm',
	WallBotLeft = 'n',
	WallBottom = 'o',
	WallBottom2 = 'p',
	WallBottom3 = 'q',
	WallBotRight = 'r',
}

// mapping of Tile number to Tile string character
const convertToSymbol = {
	[Tile.Grass]: TileSymbol.Grass,
	[Tile.Grass2]: TileSymbol.Grass2,
	[Tile.WallTopLeft]: TileSymbol.WallTopLeft,
	[Tile.WallTopRight]: TileSymbol.WallTopRight,
	[Tile.WallTop]: TileSymbol.WallTop,
	[Tile.WallTop2]: TileSymbol.WallTop2,
	[Tile.WallRight]: TileSymbol.WallRight,
	[Tile.WallRight2]: TileSymbol.WallRight2,
	[Tile.WallRight3]: TileSymbol.WallRight3,
	[Tile.WallLeft]: TileSymbol.WallLeft,
	[Tile.WallLeft2]: TileSymbol.WallLeft2,
	[Tile.WallBody]: TileSymbol.WallBody,
	[Tile.WallBody2]: TileSymbol.WallBody2,
	[Tile.WallBody3]: TileSymbol.WallBody3,
	[Tile.WallBotLeft]: TileSymbol.WallBotLeft,
	[Tile.WallBottom]: TileSymbol.WallBottom,
	[Tile.WallBottom2]: TileSymbol.WallBottom2,
	[Tile.WallBottom3]: TileSymbol.WallBottom3,
	[Tile.WallBotRight]: TileSymbol.WallBotRight,
}

// this is used to convert the numerical level used by easystar.js
// to a string based level definition used by Kaboom.js
export function tileToSymbol(tile: Tile) {
	return convertToSymbol[tile]
}
