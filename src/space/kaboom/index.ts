import k from './kaboom'

import Space from './scenes/Space'

const {
	scene,
	go,
	loadSprite
} = k

loadSprite('logo', '/logos/kaboom.png')
loadSprite('ship', '/assets/playerShip1_red.png')
loadSprite('bullet', '/assets/laserRed08.png')

scene('space', Space)

go('space')