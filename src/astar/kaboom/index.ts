import k from './kaboom'

import AStar from './scenes/AStar'

const {
	scene,
	start,
	loadSprite
} = k

loadSprite('logo', '/logos/kaboom.png')

scene('a-star', AStar)

start('a-star')
