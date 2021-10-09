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

## License

[MIT License](https://github.com/ourcade/phaser3-vs-kaboomjs/blob/master/LICENSE)
