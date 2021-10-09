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
	wait,
	vec2,
	rand,
	destroy,
	scale,
	rotate,
	area,
	opacity,
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
			// create 5 sprites using the "debris" image and
			// randomly adjust their direction and rotation
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
				particles.push(particle as unknown as Particle)
			}
		},
		update() {
			// on each frame, move the particiles by their velocity
			// and shrink/fade over time
			for (const particle of particles) {
				particle.pos.x += particle.dir.x * particle.speed
				particle.pos.y += particle.dir.y * particle.speed
				particle.scale.x *= 0.95
				particle.scale.y *= 0.95
				particle.opacity -= 0.05
			}
		},
		destroy() {
			// cleanup by destroying each created particle
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

	// simple floor creation
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

	// create the box
	add([
		pos(width() * 0.5, height() * 0.5),
		sprite('box'),
		origin('center'),
		area({}),
		solid(),
		'breakable-box'
	])

	keyPress('space', () => {
		// jump when press space
		if (alien.grounded())
		{
			alien.jump()
		}
	})

	alien.collides('breakable-box', (box, side) => {
		if (side !== 'top') {
			return
		}

		// hide the box when alien collides with box
		box.hidden = true
		box.solid = false

		// create a new entity of explosion particles
		const particles = add([
			explode(box.pos.x, box.pos.y)
		])

		// bring the box back after 1s and destroy the particles
		wait(1, () => {
			destroy(particles)
			box.hidden = false
			box.solid = true
		})
	})
}
