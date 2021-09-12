import k from './kaboom'

import Space from './scenes/Space'

// - update alias path in tsconfig
// - use 'this' in component functions
// - import component types; combine to augment 'this'
// - creating custom component types

const {
	scene,
	start,
	loadSprite
} = k

loadSprite('ship', '/assets/playerShip1_red.png')
loadSprite('bullet', '/assets/laserRed08.png')

scene('space', Space)

start('space')