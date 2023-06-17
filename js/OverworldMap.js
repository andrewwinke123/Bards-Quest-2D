class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects

    this.lowerImage = new Image()
    this.lowerImage.src = config.lowerSrc

    this.upperImage = new Image()
    this.upperImage.src = config.upperSrc
  }

  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage,
      utils.widthGrid(10.5) - cameraPerson.x,
      utils.widthGrid(6) - cameraPerson.y,
      )
  }

  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage,
      utils.widthGrid(10.5) - cameraPerson.x,
      utils.widthGrid(6) - cameraPerson.y,
      )
  }
}

window.OverworldMaps = {
  FieldTwo: {
    lowerSrc: '/img/maps/field-2.png',
    upperSrc: '/img/maps/field-2-top.png',
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.widthGrid(5),
        y: utils.widthGrid(6),
      }),
      wizard: new Person({
        x: utils.widthGrid(9),
        y: utils.widthGrid(7),
        src: '/img/characters/people/wizard.png'
      })
    }
  },
  WoodsOne: {
    lowerSrc: '/img/maps/woods-1.png',
    upperSrc: '/img/maps/woods-1-top.png',
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.widthGrid(5),
        y: utils.widthGrid(6),
      }),
      wizard: new Person({
        x: utils.widthGrid(9),
        y: utils.widthGrid(7),
        src: '/img/characters/people/wizard.png'
      })
    }
  }
}