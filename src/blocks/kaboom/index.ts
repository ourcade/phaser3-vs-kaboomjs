import k from './kaboom'

import Blocks from './scenes/Blocks'

const {
	scene,
	go,
	loadSprite
} = k

loadSprite('logo', '/logos/kaboom.png')
loadSprite('grass', '/assets/grass.png')
loadSprite('alien', '/assets/alienGreen_suit.png')
loadSprite('box', '/assets/elementWood010.png')
loadSprite('debris', '/assets/debrisWood_1.png')

scene('blocks', Blocks)

go('blocks')
