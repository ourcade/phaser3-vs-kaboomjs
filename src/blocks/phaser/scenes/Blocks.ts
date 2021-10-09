import Phaser from 'phaser'

export default class Blocks extends Phaser.Scene
{
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	private alien?: Phaser.Physics.Arcade.Sprite

	constructor()
	{
		super('blocks')
	}

	init()
	{
		this.cursors = this.input.keyboard.createCursorKeys()
	}

	preload()
	{
		this.load.image('logo', '/logos/phaser.png')
		this.load.image('grass', '/assets/grass.png')
		this.load.image('alien', '/assets/alienGreen_suit.png')
		this.load.image('box', '/assets/elementWood010.png')
		this.load.image('debris', '/assets/debrisWood_1.png')
	}

	create()
	{
		this.add.image(16, 16, 'logo').setOrigin(0)

		const { width, height } = this.scale

		// NOTE: this should be a tilemap
		const floorTiles = this.physics.add.staticGroup()
		let x = 32
		for (let i = 0; i < 10; ++i)
		{
			floorTiles.get(x, height - 32, 'grass')
			x += 64
		}

		this.alien = this.physics.add.sprite(width * 0.5, height - 128, 'alien')

		const box = this.physics.add.staticSprite(width * 0.5, height * 0.5, 'box')

		this.physics.add.collider(floorTiles, this.alien)
		this.physics.add.collider(box, this.alien, this.handleBreakBox, undefined, this)
	}

	update()
	{
		if (!this.alien)
		{
			return
		}

		if (this.alien.body.touching.down && Phaser.Input.Keyboard.JustDown(this.cursors.space))
		{
			this.alien?.setVelocityY(-500)
		}
	}

	private handleBreakBox(b: Phaser.GameObjects.GameObject, a: Phaser.GameObjects.GameObject)
	{
		const alien = a as Phaser.Physics.Arcade.Sprite
		if (!alien.body.touching.up) {
			return
		}
		
		const box = b as Phaser.Physics.Arcade.Sprite
		box.disableBody(true, true)

		const particles = this.add.particles('debris')
		particles.createEmitter({
			x: box.x,
			y: box.y,
			maxParticles: 5,
			quantity: 5,
			speed: 300,
			lifespan: 300,
			radial: true,
			alpha: { start: 1, end: 0.2, ease: 'Sine.easeIn' },
			scale: { start: 1, end: 0.4 },
			rotate: { min: -180, max: 180 },
		})
		this.time.delayedCall(1000, () => {
			particles.destroy()

			box.enableBody(true, box.x, box.y, true, true)
		})
	}
}
