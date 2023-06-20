class OverworldEvent {
  constructor({ map, event }) {
    this.map = map
    this.event = event
  }

  stand(resolve) {
    console.log('map in walk', this.map)
    const who = this.map.gameObjects[ this.event.who ]
    who.startBehavior({
      map: this.map
    }, {
      type: 'stand',
      direction: this.event.direction,
      time: this.event.time
    })

    //set up a handler to complete when correct person is done walking, then resolve event
    const completeHandler = e => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener('PersonWalkingComplete', completeHandler)
        resolve()
    }
  }

    document.addEventListener('PersonStandComplete', completeHandler)
  }

  walk(resolve) {
    console.log('map in walk', this.map)
    const who = this.map.gameObjects[ this.event.who ]
    who.startBehavior({
      map: this.map
    }, {
      type: 'walk',
      direction: this.event.direction,
      retry: true
    })

    //set up a handler to complete when correct person is done walking, then resolve event
    const completeHandler = e => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener('PersonWalkingComplete', completeHandler)
        resolve()
    }
  }

    document.addEventListener('PersonWalkingComplete', completeHandler)
  }

  init() {
    return new Promise(resolve => {
      this[this.event.type](resolve)
    })
  }
}