import type { Character, PosComp, SpriteComp, Comp } from 'kaboom'
import * as EasyStar from 'easystarjs'
import k from '../kaboom'
import { TILE_SIZE, Tile, TileSymbol, tileToSymbol } from '../shared'

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

const levelAsString = level.map(row => row.map(tileToSymbol).join(''))

function tileToWorld(value: number)
{
	return (value * TILE_SIZE) + (TILE_SIZE * 0.5)
}

function worldToTile(value: number)
{
	return Math.floor(value / TILE_SIZE)
}

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

	const faune = add([
		pos(alignToGrid(width() * 0.5), alignToGrid(height() * 0.5)),
		sprite('faune'),
		origin('center')
	])

	faune.play('idle-down')

	let path: { x: number, y: number }[] = []
	const easystar = new EasyStar.js()
	easystar.setGrid(level)
	easystar.setAcceptableTiles([Tile.Grass, Tile.Grass2])
	easystar.setTileCost(Tile.Grass2, 5)

	mouseClick(pointer => {
		const sx = worldToTile(faune.pos.x)
		const sy = worldToTile(faune.pos.y)
		const tx = worldToTile(pointer.x)
		const ty = worldToTile(pointer.y)

		easystar?.findPath(sx, sy, tx, ty, (points) => {
			path = points
		})
		easystar?.calculate()
	})

	const determineMovement = () => {
		const movement = {
			left: false,
			right: false,
			up: false,
			down: false
		}

		if (path.length <= 0)
		{
			return movement
		}

		const target = path[0]
		const { x, y } = faune.pos
		const tx = (target.x * 16) + 8
		const ty = (target.y * 16) + 8

		const dx = Math.abs(x - tx)
		const dy = Math.abs(y - ty)

		if (dx <= 0 && dy <= 0)
		{
			path.shift()
			return movement
		}

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
		const { left, right, up, down } = determineMovement()

		const speed = 2
		const curAnim = faune.curAnim()

		if (left)
		{
			if (curAnim !== 'walk-side')
			{
				faune.play('walk-side')
			}
			faune.flipX(true)
			faune.pos.x -= speed
		}
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
			const direction = faune.curAnim().split('-').pop() ?? 'down'
			faune.play(`idle-${direction}`)
		}
	})

	add([
		pos(16, 0),
		sprite('logo')
	])
}
