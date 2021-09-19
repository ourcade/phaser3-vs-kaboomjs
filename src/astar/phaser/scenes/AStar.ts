import Phaser from 'phaser'
import * as EasyStar from 'easystarjs'

enum Tile
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

const TILE_SIZE = 16

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

export default class AStar extends Phaser.Scene
{
	private faune?: Phaser.GameObjects.Sprite
	private easystar?: EasyStar.js
	private path: { x: number, y: number }[] = []

	constructor()
	{
		super('a-star')
	}

	preload()
	{
		this.load.image('logo', '/logos/phaser.png')
		this.load.spritesheet('faune', '/assets/faune.png', {
			frameWidth: 32
		})

		// horizontal: 0 - 28
		// verticak: 0 - 15
		this.load.spritesheet('tiles', '/assets/tiles.png', {
			frameWidth: 16,
			frameHeight: 16
		})
	}

	create()
	{
		const level = [
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass2, 	Tile.Grass2, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass2, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass2, 	Tile.WallTopLeft, 	Tile.WallTop2, 		Tile.WallTop, 		Tile.WallTop2, 		Tile.WallTop, 		Tile.WallTopRight, 	Tile.Grass2, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass2, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass2, 		Tile.Grass2, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallLeft2, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass2, 		Tile.WallTopLeft, 		Tile.WallTop, 		Tile.WallTop, 		Tile.WallTop2, 		Tile.WallTopRight, 	Tile.Grass2, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass2, 	Tile.WallLeft, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight2, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft2, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight3, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallLeft, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass2, 	Tile.WallLeft2, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallLeft, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallLeft, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight2, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft2, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight2, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallLeft, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight3, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft2, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallLeft, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass2, 	Tile.WallLeft, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallLeft, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight2, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight2, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallLeft2, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft2, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass2, 	Tile.WallLeft, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass2, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight3, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass2, 	Tile.WallLeft, 		Tile.WallBody, 		Tile.WallBody2, 	Tile.WallBody, 		Tile.WallBody2, 	Tile.WallRight2, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass2, 	Tile.Grass2, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass2, 		Tile.Grass, 		Tile.Grass2, 		Tile.Grass2, 		Tile.WallLeft2, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallBotLeft, 	Tile.WallBottom, 	Tile.WallBottom2, 	Tile.WallBottom, 	Tile.WallBottom3, 	Tile.WallBotRight, 	Tile.Grass2, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass2, 	Tile.WallTopLeft, 		Tile.WallTop2, 		Tile.WallTop, 		Tile.WallTop, 		Tile.WallTop, 		Tile.WallTop2, 		Tile.WallTop, 		Tile.WallBody, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass2, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass2, 		Tile.Grass2, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallLeft2, 		Tile.WallBody2, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody2, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 			Tile.WallBody, 		Tile.WallBody2, 	Tile.WallBody, 		Tile.WallRight2, 	Tile.Grass2, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.WallBotLeft, 		Tile.WallBottom2, 	Tile.WallBottom, 	Tile.WallBottom, 	Tile.WallBottom3, 	Tile.WallBottom, 	Tile.WallBottom, 	Tile.WallBottom, 		Tile.WallBottom, 	Tile.WallBottom2, 	Tile.WallBottom, 	Tile.WallBotRight, 	Tile.Grass2, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass2, 	Tile.Grass2, 			Tile.Grass, 		Tile.Grass2, 		Tile.Grass2, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass2, 		Tile.Grass2, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass2, 		Tile.Grass2, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 	Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
		]
		const map = this.make.tilemap({ data: level, tileWidth: TILE_SIZE, tileHeight: TILE_SIZE })
		const tiles = map.addTilesetImage('tiles')
		map.createLayer(0, tiles, 0, 0)

		this.easystar = new EasyStar.js()
		this.easystar.setGrid(level)
		this.easystar.setAcceptableTiles([Tile.Grass])
		this.easystar.setTileCost(Tile.Grass2, 5)

		const { width, height } = this.scale

		this.faune = this.add.sprite(alignToGrid(width * 0.5), alignToGrid(height * 0.5), 'faune', 0)
		
		this.createPlayerAnimations()

		this.faune.play('idle-down')

		this.add.image(16, 16, 'logo').setOrigin(0)

		this.input.on(Phaser.Input.Events.POINTER_UP, (pointer: Phaser.Input.Pointer) => {
			if (!this.faune)
			{
				return
			}

			const sx = Math.floor(this.faune.x / 16)
			const sy = Math.floor(this.faune.y / 16)
			const tx = Math.floor(pointer.downX / 16)
			const ty = Math.floor(pointer.downY / 16)
			this.easystar?.findPath(sx, sy, tx, ty, (path) => {
				this.path = path
			})
			this.easystar?.calculate()
		})
	}

	update(t: number, dt: number)
	{
		if (!this.faune)
		{
			return
		}

		const { left, right, up, down } = this.determineMovement()

		const speed = 2

		if (left)
		{
			this.faune.setFlipX(true)
			this.faune.play('walk-side', true)
			this.faune.x -= speed
		}
		else if (right)
		{
			this.faune.setFlipX(false)
			this.faune.play('walk-side', true)
			this.faune.x += speed
		}
		else if (up)
		{
			this.faune.play('walk-up', true)
			this.faune.y -= speed
		}
		else if (down)
		{
			this.faune.play('walk-down', true)
			this.faune.y += speed
		}
		else
		{
			const direction = this.faune.anims.currentAnim.key.split('-').pop() ?? 'down'
			this.faune.play(`idle-${direction}`, true)
		}
	}

	private determineMovement()
	{
		const movement = {
			left: false,
			right: false,
			up: false,
			down: false
		}

		if (!this.faune || this.path.length <= 0)
		{
			return movement
		}

		const target = this.path[0]
		const { x, y } = this.faune
		const tx = (target.x * 16) + 8
		const ty = (target.y * 16) + 8

		const dx = Math.abs(x - tx)
		const dy = Math.abs(y - ty)

		if (dx <= 0 && dy <= 0)
		{
			this.path.shift()
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

	private createPlayerAnimations() {
		if (!this.faune)
		{
			return
		}

		this.faune.anims.create({
			key: 'walk-down',
			frames: this.faune.anims.generateFrameNumbers('faune', {
				start: 0,
				end: 7
			}),
			frameRate: 15,
			repeat: -1
		})

		this.faune.anims.create({
			key: 'walk-side',
			frames: this.faune.anims.generateFrameNumbers('faune', {
				start: 8,
				end: 15
			}),
			frameRate: 15,
			repeat: -1
		})

		this.faune.anims.create({
			key: 'walk-up',
			frames: this.faune.anims.generateFrameNumbers('faune', {
				start: 16,
				end: 23
			}),
			frameRate: 15,
			repeat: -1
		})

		this.faune.anims.create({
			key: 'idle-up',
			frames: [{ key: 'faune', frame: 19 }]
		})

		this.faune.anims.create({
			key: 'idle-side',
			frames: [{ key: 'faune', frame: 10 }]
		})

		this.faune.anims.create({
			key: 'idle-down',
			frames: [{ key: 'faune', frame: 1 }]
		})
	}
}
