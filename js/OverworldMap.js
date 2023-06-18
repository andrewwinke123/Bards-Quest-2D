class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects
    this.walls = config.walls || {}

    this.lowerImage = new Image()
    this.lowerImage.src = config.lowerSrc

    this.upperImage = new Image()
    this.upperImage.src = config.upperSrc

    this.isCutscenePlaying = false
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
  isSpaceTaken(currentX, currentY, direction) {
    const {x,y} = utils.nextPosition(currentX, currentY, direction)
    return this.walls[`${x}, ${y}`] || false
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach(key => {
      let object = this.gameObjects[key]
      object.id = key
      //in the future: determine if object should mount
      object.mount(this)
      object.mount(this)
    })
  }

  addWall(x,y) {
    this.walls[`${x}, ${y}`] = true
  }
  removeWall(x,y) {
    delete this.walls[`${x}, ${y}`]
  }
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY)
    const {x,y} = utils.nextPosition(wasX, wasY, direction)
    this.addWall(x,y)
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
        x: utils.widthGrid(7),
        y: utils.widthGrid(7),
        src: '/img/characters/people/wizard.png'
      })
    },
    walls: {
      [utils.asGridCoord(10,7)]: true,

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
        x: utils.widthGrid(7),
        y: utils.widthGrid(22),
        src: '/img/characters/people/wizard.png'
      })
    }
    },
    WoodsTwo: {
      lowerSrc: '/img/maps/woods-2.png',
      upperSrc: '/img/maps/woods-2-top.png',
      gameObjects: {
        hero: new Person({
          isPlayerControlled: true,
          x: utils.widthGrid(7),
          y: utils.widthGrid(22),
        }),
        wizard: new Person({
          x: utils.widthGrid(9),
          y: utils.widthGrid(7),
          src: '/img/characters/people/wizard.png'
        })
      }
  },
  WoodsThree: {
    lowerSrc: '/img/maps/woods-3.png',
    upperSrc: '',
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.widthGrid(7),
        y: utils.widthGrid(22),
      }),
      wizard: new Person({
        x: utils.widthGrid(9),
        y: utils.widthGrid(7),
        src: '/img/characters/people/wizard.png'
      })
    }
  },
  WoodsFour: {
    lowerSrc: '/img/maps/woods-4.png',
    upperSrc: '/img/maps/woods-4-top.png',
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.widthGrid(7),
        y: utils.widthGrid(22),
      }),
      wizard: new Person({
        x: utils.widthGrid(9),
        y: utils.widthGrid(7),
        src: '/img/characters/people/wizard.png',
        behaviorLoop: [
          { type: 'stand', direction: 'left', time: 800 },
          { type: 'stand', direction: 'up', time: 800 },
          { type: 'stand', direction: 'right', time: 1200 },
          { type: 'stand', direction: 'up', time: 300 },
        ]
      }),
      wizard2: new Person({
        x: utils.widthGrid(10),
        y: utils.widthGrid(8),
        src: '/img/characters/people/wizard.png',
        behaviorLoop: [
          { type: 'walk', direction: 'left' },
          { type: 'stand', direction: 'up', time: 800 },
          { type: 'walk', direction: 'up' },
          { type: 'walk', direction: 'right' },
          { type: 'walk', direction: 'down' },
        ]
      })
    }
  }
}