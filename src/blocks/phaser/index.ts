import Phaser from 'phaser'

import Blocks from './scenes/Blocks'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'phaser',
	width: 640,
	height: 480,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 900 }
		}
	},
	scene: [Blocks]
}

export default new Phaser.Game(config)
