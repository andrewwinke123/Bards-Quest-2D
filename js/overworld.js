class Overworld {
  constructor(config) {
    this.element = config.element
    this.canvas = this.element.querySelector('.game-canvas')
    this.ctx = this.canvas.getContext('2d')
    this.map = null
  }

  startGameLoop() {
    const step = () => {
      //clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      //Update all objects
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow:this.directionInput.direction,
          map: this.map,
          
        })
      })

      //Establish camera person
      let cameraPerson;
    if (this.map.stationaryCamera) {
      cameraPerson = {
        x: 0,
        y: 0,
      };
    } else {
      cameraPerson = this.map.gameObjects.hero;
    }

      //Lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson)

      //Game objects
      Object.values(this.map.gameObjects).sort((a,b) => {
        return a.y - b.y
      }).forEach(object => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        })
        object.sprite.draw(this.ctx, cameraPerson)
      })
      //Upper layer
      this.map.drawUpperImage(this.ctx, cameraPerson)

    requestAnimationFrame(() => {
      step()
    })
  }
  step()
}

bindActionInput() {
  new KeyPressListener('Enter', () => {
    //asking if there is an NPC to talk to
    this.map.checkForActionCutscene()
  })
}

bindHeroPositionCheck() {
  document.addEventListener('PersonWalkingComplete', e => {
    if (e.detail.whoId === 'hero') {
      //heros position has changed
      this.map.checkForFootstepsCutscene()
    }
  })
}

startMap(mapConfig) {
  this.map = new OverworldMap(mapConfig)
  this.map.overworld = this
  this.map.mountObjects()
}

  init() {
    this.startMap(window.OverworldMaps.FieldTwo)

    this.bindActionInput()
    this.bindHeroPositionCheck()

    this.directionInput = new DirectionInput()
    this.directionInput.init()
    
    this.startGameLoop()

    this.map.startCutscene([
      { type: 'changeMap', map: 'WoodsOne'},
      // { type: 'textMessage', text: 'Hello friend, welcome!'},
    ])
  }
}