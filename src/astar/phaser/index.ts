import Phaser from 'phaser'

import AStar from './scenes/AStar'

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
	scene: [AStar]
}

export default new Phaser.Game(config)
