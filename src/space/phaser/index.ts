import Phaser from 'phaser'

import Space from './scenes/Space'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'phaser',
	width: 640,
	height: 480,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	scene: [Space]
}

export default new Phaser.Game(config)
