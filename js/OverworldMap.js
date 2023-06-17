class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects

    this.lowerImage = new Image()
    this.lowerImage.src = config.lowerSrc

    this.upperImage = new Image()
    this.upperImage.src = config.upperSrc
  }

  drawLowerImage(ctx) {
    ctx.drawImage(this.lowerImage, 0, 0)
  }

  drawUpperImage(ctx) {
    ctx.drawImage(this.upperImage, 0, 0)
  }
}

window.OverworldMaps = {
  FieldTwo: {
    lowerSrc: '/img/maps/field-2.png',
    upperSrc: '/img/maps/field-2-top.png',
    gameObjects: {
      hero: new GameObject({
        x: 5,
        y: 6,
      }),
      wizard: new GameObject({
        x: 7,
        y: 9,
        src: '/img/characters/people/wizard.png'
      })
    }
  },
  WoodsOne: {
    lowerSrc: '/img/maps/woods-1.png',
    upperSrc: '/img/maps/woods-1-top.png',
    gameObjects: {
      hero: new GameObject({
        x: 3,
        y: 1,
      }),
      wizard: new GameObject({
        x: 9,
        y: 2,
        src: '/img/characters/people/wizard.png'
      })
    }
  }
}