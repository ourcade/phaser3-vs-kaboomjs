import type { CharacterRaw, PosComp, RotateComp } from 'kaboom'
import k from '../kaboom'

const {
	add,
	sprite,
	area,
	pos,
	width,
	height,
	origin,
	rotate,
	keyDown,
	keyPress,
	keyRelease,
	deg2rad,
	vec2,
	destroy
} = k

function angleToVec2(angle: number) {
	const vx = Math.cos(deg2rad(angle))
	const vy = Math.sin(deg2rad(angle))
	return vec2(vx, vy)
}

function bullet(vx: number, vy: number) {
	const velocity = vec2(vx, vy)
	return {
		add(this: CharacterRaw) {
			setTimeout(() => {
				destroy(this)
			}, 500)
		},
		update(this: PosComp) {
			if (!this.pos) {
				return
			}

			this.pos.x += velocity.x
			this.pos.y += velocity.y
		},
		setVelocity(vx: number, vy: number) {
			velocity.x = vx
			velocity.y = vy
		}
	}
}

function shooter() {
	return {
		add(this: any) {
			keyPress('space', () => {
				// showcase this logic
				const vec = angleToVec2(this.angle)
				const radius = Math.max(this.areaWidth(), this.areaHeight()) * 0.5
				
				const x = this.pos.x + (vec.x * radius)
				const y = this.pos.y + (vec.y * radius)

				const speed = 10
		
				add([
					sprite('bullet'),
					pos(x, y),
					origin('center'),
					bullet(vec.x * speed, vec.y * speed)
				])
			})
		}
	}
}

// thrust component
function thrust() {
	let acceleration = 0.1
	let thrusting = false
	let velocity = vec2(0, 0)
	return {
		add(this: RotateComp) {
			keyDown('up', () => {
				const dir = angleToVec2(this.angle)
				velocity.x += dir.x * acceleration
				velocity.y += dir.y * acceleration
				thrusting = true
			})

			keyRelease('up', () => {
				thrusting = false
			})
		},
		update(this: PosComp) {
			this.pos.x += velocity.x
			this.pos.y += velocity.y

			if (!thrusting) {
				velocity.x *= 0.98
				velocity.y *= 0.98
			}
		}
	}
}

export default function Space() {
	add([
		pos(16, 0),
		sprite('logo')
	])

	const ship = add([
		sprite('ship'),
		pos(width() * 0.5, height() * 0.5),
		// TODO: param not optional
		area({}),
		rotate(0),
		origin('center'),
		shooter(),
		// thrust
		thrust()
	])

	keyDown('left', () => {
		ship.angle -= 5
	})

	keyDown('right', () => {
		ship.angle += 5
	})
}
