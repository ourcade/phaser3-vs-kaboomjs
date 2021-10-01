import * as EasyStar from 'easystarjs'
import k from '../kaboom'
import { TILE_SIZE, Tile, TileSymbol, tileToSymbol } from '../shared'

// define level for EasyStar.js
const level = [
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass2, 	Tile.Grass2, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass2, 		Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass2, 	Tile.WallTopLeft, 	Tile.WallTop2, 		Tile.WallTop, 		Tile.WallTop2, 		Tile.WallTop, 		Tile.WallTopRight, 	Tile.Grass2, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass2, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass2, 		Tile.Grass2, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallLeft2, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass2, 		Tile.WallTopLeft, 		Tile.WallTop, 		Tile.WallTop, 		Tile.WallTop2, 		Tile.WallTopRight, 	Tile.Grass2, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass2, 	Tile.WallLeft, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight2, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft2, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight3, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallLeft, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass2, 	Tile.WallLeft2, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallLeft, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallLeft, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight2, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft2, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight2, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallLeft, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight3, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft2, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallLeft, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass2, 	Tile.WallLeft, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallLeft, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight2, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight2, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallLeft2, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft2, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass2, 	Tile.WallLeft, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass2, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight3, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass2, 	Tile.WallLeft, 		Tile.WallBody, 		Tile.WallBody2, 	Tile.WallBody, 		Tile.WallBody2, 	Tile.WallRight2, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass2, 	Tile.Grass2, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass2, 		Tile.Grass, 		Tile.Grass2, 		Tile.Grass2, 		Tile.WallLeft2, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallBotLeft, 	Tile.WallBottom, 	Tile.WallBottom2, 	Tile.WallBottom, 	Tile.WallBottom3, 	Tile.WallBotRight, 	Tile.Grass2, 	Tile.Grass2, 	Tile.Grass2, 	Tile.Grass2, 	Tile.Grass2, 	Tile.WallTopLeft, 		Tile.WallTop2, 		Tile.WallTop, 		Tile.WallTop, 		Tile.WallTop, 		Tile.WallTop2, 		Tile.WallTop, 		Tile.WallBody, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass2, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass2, 		Tile.Grass2, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.WallLeft2, 		Tile.WallBody2, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody2, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 			Tile.WallBody, 		Tile.WallBody2, 	Tile.WallBody, 		Tile.WallRight2, 	Tile.Grass2, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.WallBotLeft, 		Tile.WallBottom2, 	Tile.WallBottom, 	Tile.WallBottom, 	Tile.WallBottom3, 	Tile.WallBottom, 	Tile.WallBottom, 	Tile.WallBottom, 		Tile.WallBottom, 	Tile.WallBottom2, 	Tile.WallBottom, 	Tile.WallBotRight, 	Tile.Grass2, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass2, 	Tile.Grass2, 			Tile.Grass, 		Tile.Grass2, 		Tile.Grass2, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass2, 		Tile.Grass2, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass2, 		Tile.Grass2, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
	[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
]

// convert to an array of strings for Kaboom.js
const levelAsString = level.map(row => row.map(tileToSymbol).join(''))

// tile space <> world space conversions
function tileToWorld(value: number)
{
	// we are assuming origin 'center' for this or (0.5, 0.5)
	return (value * TILE_SIZE) + (TILE_SIZE * 0.5)
}

function worldToTile(value: number)
{
	return Math.floor(value / TILE_SIZE)
}

// convenience to automatically align a given x/y value to grid
function alignToGrid(value: number)
{
	return tileToWorld(worldToTile(value))
}

const {
	add,
	pos,
	sprite,
	addLevel,
	width,
	height,
	origin,
	mouseClick
} = k

export default function AStar() {
	addLevel(levelAsString, {
		width: TILE_SIZE,
		height: TILE_SIZE,
		[TileSymbol.Grass]: () => [
			sprite(TileSymbol.Grass)
		],
		[TileSymbol.Grass2]: () => [
			sprite(TileSymbol.Grass2)
		],
		[TileSymbol.WallTop]: () => [
			sprite(TileSymbol.WallTop)
		],
		[TileSymbol.WallTop2]: () => [
			sprite(TileSymbol.WallTop2)
		],
		[TileSymbol.WallLeft]: () => [
			sprite(TileSymbol.WallLeft)
		],
		[TileSymbol.WallLeft2]: () => [
			sprite(TileSymbol.WallLeft2)
		],
		[TileSymbol.WallRight]: () => [
			sprite(TileSymbol.WallRight)
		],
		[TileSymbol.WallRight2]: () => [
			sprite(TileSymbol.WallRight2)
		],
		[TileSymbol.WallRight3]: () => [
			sprite(TileSymbol.WallRight3)
		],
		[TileSymbol.WallBottom]: () => [
			sprite(TileSymbol.WallBottom)
		],
		[TileSymbol.WallBottom2]: () => [
			sprite(TileSymbol.WallBottom2)
		],
		[TileSymbol.WallBottom3]: () => [
			sprite(TileSymbol.WallBottom3)
		],
		[TileSymbol.WallBody]: () => [
			sprite(TileSymbol.WallBody)
		],
		[TileSymbol.WallBody2]: () => [
			sprite(TileSymbol.WallBody2)
		],
		[TileSymbol.WallBody3]: () => [
			sprite(TileSymbol.WallBody3)
		],
		[TileSymbol.WallTopLeft]: () => [
			sprite(TileSymbol.WallTopLeft)
		],
		[TileSymbol.WallTopRight]: () => [
			sprite(TileSymbol.WallTopRight)
		],
		[TileSymbol.WallBotRight]: () => [
			sprite(TileSymbol.WallBotRight)
		],
		[TileSymbol.WallBotLeft]: () => [
			sprite(TileSymbol.WallBotLeft)
		],
		// NOTE: this is only here because the typing requires it
		// possibly an error?
		any() { return undefined }
	})

	// see video on character animations
	const faune = add([
		pos(alignToGrid(width() * 0.5), alignToGrid(height() * 0.5)),
		sprite('faune'),
		origin('center')
	])

	faune.play('idle-down')

	// path of tiles to move through
	let path: { x: number, y: number }[] = []


	const easystar = new EasyStar.js()
	easystar.setGrid(level)
	// set tiles that can be walked on
	easystar.setAcceptableTiles([Tile.Grass, Tile.Grass2])
	// give a different cost to a specific tile
	easystar.setTileCost(Tile.Grass2, 5)

	mouseClick(pointer => {
		// get the tile positions of our character
		const sx = worldToTile(faune.pos.x)
		const sy = worldToTile(faune.pos.y)

		// get the tile positions of our click
		const tx = worldToTile(pointer.x)
		const ty = worldToTile(pointer.y)

		// have easystar find the path from (sx, sy) to (tx, ty)
		easystar?.findPath(sx, sy, tx, ty, (points) => {
			path = points
		})
		easystar?.calculate()
	})

	const determineMovement = () => {
		// always start out not moving
		const movement = {
			left: false,
			right: false,
			up: false,
			down: false
		}

		// nothing in the path so don't move
		if (path.length <= 0)
		{
			return movement
		}

		// look at the first element to know where to go next
		const target = path[0]

		// get the world position of the target tile
		const { x, y } = faune.pos
		const tx = tileToWorld(target.x)
		const ty = tileToWorld(target.y)

		// get the difference between where character is and where we should go
		const dx = Math.abs(x - tx)
		const dy = Math.abs(y - ty)

		if (dx <= 0 && dy <= 0)
		{
			// we've arrived at the target if no difference
			// remove the first element in the path array
			// return starting movement object
			path.shift()
			return movement
		}

		// determine which direction we should be moving in
		// this simulates only moving left, right, up, or down
		// so the character will not move diagonally
		if (x > tx)
		{
			movement.left = true
		}
		else if (x < tx)
		{
			movement.right = true
		}
		else if (y > ty)
		{
			movement.up = true
		}
		else if (y < ty)
		{
			movement.down = true
		}

		return movement
	}

	faune.action(() => {
		// determine where we should move each frame
		const { left, right, up, down } = determineMovement()

		const speed = 2
		const curAnim = faune.curAnim()

		if (left)
		{
			// if should move left and not already in the
			// walk-side animation then play it
			if (curAnim !== 'walk-side')
			{
				faune.play('walk-side')
			}

			// flip which way our character is facing when moving left
			faune.flipX(true)

			// move left by speed
			faune.pos.x -= speed
		}
		// right, up, and down animations all work like left above
		else if (right)
		{
			if (curAnim !== 'walk-side')
			{
				faune.play('walk-side')
			}
			faune.flipX(false)
			faune.pos.x += speed
		}
		else if (up)
		{
			if (curAnim !== 'walk-up')
			{
				faune.play('walk-up')
			}
			faune.pos.y -= speed
		}
		else if (down)
		{
			if (curAnim !== 'walk-down')
			{
				faune.play('walk-down')
			}
			faune.pos.y += speed
		}
		else
		{
			// once we stop, use the curAnim to get the last direction
			// we were moving in
			// then create the proper idle animation using that direction
			const direction = curAnim.split('-').pop() ?? 'down'
			faune.play(`idle-${direction}`)
		}
	})

	add([
		pos(16, 0),
		sprite('logo')
	])
}
