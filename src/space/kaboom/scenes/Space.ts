import type { Character, PosComp, RotateComp, ScaleComp, Comp, AreaComp } from 'kaboom'
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

// bullet component that will simply move an entity
// in a direction for 500ms before destroying it
// this can be made longer or use a more advanced detection
// of when the bullet is off screen
function bullet(vx: number, vy: number) {
	const velocity = vec2(vx, vy)
	return {
		add(this: Character) {
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
		add(this: Character<RotateComp | AreaComp | PosComp>) {
			keyPress('space', () => {
				// when space is pressed, fire a bullet in the direction
				// that the ship is facing using the angle to get a
				// directional vector
				const vec = angleToVec2(this.angle)

				// radius takes the larger of width/height and divides by 2
				const radius = Math.max(this.areaWidth(), this.areaHeight()) * 0.5
				
				// the starting position will be where the ship is
				// plus the directional vector * the radius so that we
				// place the bullet at the front of the ship
				const x = this.pos.x + (vec.x * radius)
				const y = this.pos.y + (vec.y * radius)

				const speed = 10
		
				// create a bullet given starting position
				// and velocity; see bullet component above
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
				// on pressing the up key, move the ship
				// in the direction it is facing
				const dir = angleToVec2(this.angle)
				velocity.x += dir.x * acceleration
				velocity.y += dir.y * acceleration

				// set thrusting to true so that we don't
				// slow down
				thrusting = true
			})

			keyRelease('up', () => {
				// stop thrusting once we release the up key
				thrusting = false
			})
		},
		update(this: PosComp) {
			this.pos.x += velocity.x
			this.pos.y += velocity.y

			// deccelerate when no longer thrusting
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
		area(),
		rotate(0),
		origin('center'),
		// component to handle shooting bullets
		shooter(),
		// component to handle movement
		thrust()
	])

	// rotate ship using left/right arrow keys
	keyDown('left', () => {
		ship.angle -= 5
	})

	keyDown('right', () => {
		ship.angle += 5
	})
}
