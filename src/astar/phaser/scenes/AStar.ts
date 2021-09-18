import Phaser from 'phaser'

enum Tile
{
	Grass = 125,
	WallTopLeft = 61,
	WallTopRight = 65,
	WallTop = 63,
	WallRight = 123,
	WallLeft = 119,
	WallBody = 149,
	WallBotLeft = 206,
	WallBottom = 207,
	WallBotRight = 210,
}

export default class AStar extends Phaser.Scene
{
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	private faune?: Phaser.GameObjects.Sprite

	constructor()
	{
		super('a-star')
	}

	init()
	{
		this.cursors = this.input.keyboard.createCursorKeys()
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
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.WallTopLeft, 	Tile.WallTop, 		Tile.WallTop, 		Tile.WallTop, 		Tile.WallTop, 		Tile.WallTopRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.WallLeft, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallTopLeft, 		Tile.WallTop, 		Tile.WallTop, 		Tile.WallTop, 		Tile.WallTopRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.WallLeft, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.WallLeft, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.WallLeft, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.WallLeft, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.WallLeft, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.WallLeft, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.WallLeft, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.WallLeft, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.WallLeft, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.WallLeft, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.WallLeft, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.WallLeft, 	Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.WallBotLeft, 	Tile.WallBottom, 	Tile.WallBottom, 	Tile.WallBottom, 	Tile.WallBottom, 	Tile.WallBotRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.WallTopLeft, 		Tile.WallTop, 		Tile.WallTop, 		Tile.WallTop, 		Tile.WallTop, 		Tile.WallTop, 		Tile.WallTop, 		Tile.WallBody, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.WallLeft, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 			Tile.WallBody, 		Tile.WallBody, 		Tile.WallBody, 		Tile.WallRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.WallBotLeft, 		Tile.WallBottom, 	Tile.WallBottom, 	Tile.WallBottom, 	Tile.WallBottom, 	Tile.WallBottom, 	Tile.WallBottom, 	Tile.WallBottom, 		Tile.WallBottom, 	Tile.WallBottom, 	Tile.WallBottom, 	Tile.WallBotRight, 	Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
			[Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 			Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, 		Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass, Tile.Grass],
		]
		const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 })
		const tiles = map.addTilesetImage('tiles')
		map.createLayer(0, tiles, 0, 0)

		const { width, height } = this.scale

		this.faune = this.add.sprite(width * 0.5, height * 0.5, 'faune', 0)
		
		this.createPlayerAnimations()

		this.faune.play('idle-down')

		this.add.image(16, 16, 'logo').setOrigin(0)
	}

	update(t: number, dt: number)
	{
		if (!this.faune)
		{
			return
		}

		if (this.cursors.left.isDown)
		{
			this.faune.setFlipX(true)
			this.faune.play('walk-side', true)
		}
		else if (this.cursors.right.isDown)
		{
			this.faune.setFlipX(false)
			this.faune.play('walk-side', true)
		}
		else if (this.cursors.up.isDown)
		{
			this.faune.play('walk-up', true)
		}
		else if (this.cursors.down.isDown)
		{
			this.faune.play('walk-down', true)
		}
		else
		{
			const direction = this.faune.anims.currentAnim.key.split('-').pop() ?? 'down'
			this.faune.play(`idle-${direction}`, true)
		}
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
