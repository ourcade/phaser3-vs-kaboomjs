import k from './kaboom'

import Space from './scenes/Space'

const {
	scene,
	start,
	loadSprite
} = k

loadSprite('ship', '/assets/playerShip1_red.png')
loadSprite('bullet', '/assets/laserRed08.png')

scene('space', Space)

start('space')