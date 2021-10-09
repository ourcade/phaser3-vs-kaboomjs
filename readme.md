![phaser3-vs-kaboomjs](https://user-images.githubusercontent.com/2236153/136664664-1e280a4b-946b-418f-9afd-30e8cee315a1.png)

# Phaser 3 vs Kaboom.js in 3 Examples
> Compare and contrast 2 different ways to create the same mechanics

![License](https://img.shields.io/badge/license-MIT-green)

## Overview

This repository contains 3 game mechanic examples using Phaser 3 and Kaboom.js.

- space shooting
- exploding block
- A* pathfinding

Each example has a Phaser 3 version and a Kaboom.js version as a means to compare and contrast a class-based paradigm against a functional, component-based paradigm.

## Getting Started

Clone this repository with git, install dependencies, and then each example has a separate run command.

First install dependencies:

```
npm install
```

Then for each example run one of the following at a time:

```
npm run start:space 	# for the space example
npm run start:blocks	# for the blocks example
npm run start:astar	# for the astar example
```

Go to http://localhost:3000 to see the example with a side-by-side comparison.

If the running example doesn't appear to change then try running the `clean` script and try again:

```
npm run clean
```

You can also try a hard reload by holding shift and then pressing the refresh button just in case things are cached by the browser.

## Resources

Check out the [Phaser 3 website](https://phaser.io/) and the [Kaboom.js](https://kaboomjs.com/) website for more on each library.

For more tutorials on making games with Phaser 3 or Kaboom.js, check out these Ourcade resources:

### From YouTube

- [Getting Started with Phaser 3.50+](https://youtu.be/3Q5jP85PXrE)
- [Making Your First Phaser 3 Game with TypeScript](https://www.youtube.com/playlist?list=PLumYWZ2t7CRvLU1E-n6VDiOdfEeRQSXPE)
- [5 Tips for Getting Started with Kaboom.js](https://youtu.be/5F7eaCcZFTk)
- [Snake Game with Kaboom.js](https://www.youtube.com/playlist?list=PLumYWZ2t7CRui4Td_ZYDYc5jTDmisYqid)

Check out the [Ourcade channel page for even more](https://www.youtube.com/ourcadehq) including ECS in Phaser 3, custom components in Kaboom.js, and multiplayer games with Colyseus. Be sure to subscribe!

### From the Blog

- [Making Your First Phaser 3 Game in Modern JavaScript](https://blog.ourcade.co/series/making-your-first-phaser-3-game-in-modern-javascript/)
- [5 Tips for Getting Started with Kaboom.js](https://blog.ourcade.co/posts/2021/5-tips-getting-started-kaboom-js/)

Check out the [full blog for more](https://blog.ourcade.co/) including a pair of free ebooks!

## Assets

The game art from this example was provided by [Kenney.nl](http://kenney.nl) and [ansimuz](https://ansimuz.itch.io/legend-of-faune).

## License

[MIT License](https://github.com/ourcade/phaser3-vs-kaboomjs/blob/master/LICENSE)
