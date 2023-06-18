class OverworldEvent {
  constructor({ map, event}) {
    this.map = mapthis.event = event
  }

  stand(resolve) {

  }
  walk(resolve) {
    const who = this.map.gameObjects[ this.event.who ]
    who.startBehavior({}, {
      type: 'walk',
      direction: this.event.direction 
    })
  }

  init() {
    return new Promise(resolve => {
      this[this.event.type](resolve)
    })
  }
}