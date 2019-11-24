---
title: First Phaser 3 Game
description: Get started with your very first phaser 3 game
author:
  name: yandeu
  website: https://github.com/yandeu
---

# First Phaser Game

Some text

```ts
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
}

var game = new Phaser.Game(config)

function preload() {}

function create() {}

function update() {}
```

[Read part 2](/tutorials/first-phaser-game-part2)
