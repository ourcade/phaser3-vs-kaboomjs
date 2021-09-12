import Phaser from 'phaser'

export default class Space extends Phaser.Scene
{
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	private ship?: Phaser.Physics.Arcade.Sprite

	constructor()
	{
		super('space')
	}

	init()
	{
		this.cursors = this.input.keyboard.createCursorKeys()
	}

	preload()
	{
		this.load.image('ship', '/assets/playerShip1_red.png')
		this.load.image('bullet', '/assets/laserRed08.png')
	}

	create()
	{
		const { width, height } = this.scale

		this.ship = this.physics.add.sprite(width * 0.5, height * 0.5, 'ship')
		this.ship.setDamping(true)
		this.ship.setDrag(0.5)
	}

	update()
	{
		if (!this.ship)
		{
			return
		}

		if (this.cursors.up.isDown)
		{
			this.thrust()
		}
		else
		{
			this.ship.setAcceleration(0, 0)
		}

		if (this.cursors.left.isDown)
		{
			this.ship.angle -= 5
		}
		else if (this.cursors.right.isDown)
		{
			this.ship.angle += 5
		}

		if (Phaser.Input.Keyboard.JustDown(this.cursors.space))
		{
			this.fireBullet()
		}
	}

	private thrust()
	{
		if (!this.ship)
		{
			return
		}

		const vec = new Phaser.Math.Vector2()
		vec.setToPolar(this.ship.rotation, 1)

		this.ship.setAcceleration(vec.x * 200, vec.y * 200)
	}

	private fireBullet()
	{
		if (!this.ship)
		{
			return
		}

		const vec = new Phaser.Math.Vector2()
		vec.setToPolar(this.ship.rotation, 1)
		const radius = Math.max(this.ship.width, this.ship.height) * 0.5
		const x = this.ship.x + (vec.x * radius)
		const y = this.ship.y + (vec.y * radius)
		const speed = 600

		const bullet = this.physics.add.sprite(x, y, 'bullet')
		bullet.setVelocity(vec.x * speed, vec.y * speed)
		
		this.time.delayedCall(500, () => {
			bullet.destroy()
		})
	}
}
