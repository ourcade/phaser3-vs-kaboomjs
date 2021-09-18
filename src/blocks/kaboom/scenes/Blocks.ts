import type { GameObj, Vec2, SpriteComp, ScaleComp, PosComp } from 'kaboom'
import k from '../kaboom'

const {
	add,
	pos,
	sprite,
	width,
	height,
	solid,
	origin,
	body,
	keyPress,
	collides,
	wait,
	vec2,
	rand,
	destroy,
	scale,
	rotate
} = k

type Particle =
	& GameObj 
	& PosComp 
	& SpriteComp 
	& ScaleComp 
	& { dir: Vec2, speed: number }
function explode(x: number, y: number) {
	const particles: Particle[] = []
	return {
		add() {
			for (let i = 0; i < 5; ++i) {
				const particle = add([
					pos(x, y),
					sprite('debris'),
					origin('center'),
					scale(),
					rotate(rand(180, -180)),
					// TODO: add opacity()
					{ 
						dir: vec2(rand(-1, 1), rand(1, -1)),
						speed: 10
					}
				])
				particles.push(particle as Particle)
			}
		},
		update() {
			for (const particle of particles) {
				particle.pos.x += particle.dir.x * particle.speed
				particle.pos.y += particle.dir.y * particle.speed
				particle.scale.x *= 0.99
				particle.scale.y *= 0.99
			}
		},
		destroy() {
			for (const particle of particles) {
				destroy(particle)
			}
		}
	}
}

export default function Blocks() {
	add([
		pos(16, 0),
		sprite('logo')
	])

	// NOTE: shoudl load as tiles
	let x = 0
	for (let i = 0; i < 10; ++i)
	{
		add([
			pos(x, height() - 64),
			sprite('grass'),
			solid()
		])
		x += 64
	}

	const alien = add([
		pos(width() * 0.5, height() - 128),
		sprite('alien'),
		origin('center'),
		body(),
		'alien'
	])

	add([
		pos(width() * 0.5, height() * 0.5),
		sprite('box'),
		origin('center'),
		solid(),
		'breakable-box'
	])

	keyPress('space', () => {
		if (alien.grounded())
		{
			alien.jump()
		}
	})

	collides('breakable-box', 'alien', (box) => {
		box.hidden = true
		box.solid = false

		const particles = add([
			explode(box.pos.x, box.pos.y)
		])

		wait(1, () => {
			destroy(particles)
			box.hidden = false
			box.solid = true
		})
	})
}
