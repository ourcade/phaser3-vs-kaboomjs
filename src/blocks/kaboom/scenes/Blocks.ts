import type { Character, Vec2, SpriteComp, ScaleComp, PosComp, OpacityComp } from 'kaboom'
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
	rotate,
	area,
	opacity
} = k

type Particle = Character<
	| PosComp 
	| SpriteComp
	| ScaleComp
	| OpacityComp
	| { dir: Vec2, speed: number }
>
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
					opacity(1),
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
				particle.scale.x *= 0.95
				particle.scale.y *= 0.95
				particle.opacity -= 0.05
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

	let x = 0
	for (let i = 0; i < 10; ++i)
	{
		add([
			pos(x, height() - 64),
			sprite('grass'),
			area({}),
			solid()
		])
		x += 64
	}

	const alien = add([
		pos(width() * 0.5, height() - 128),
		sprite('alien'),
		origin('center'),
		area({}),
		body(),
		'alien'
	])

	add([
		pos(width() * 0.5, height() * 0.5),
		sprite('box'),
		origin('center'),
		area({}),
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
