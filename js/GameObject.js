class GameObject {
  constructor(config) {
    this.id = null
    this.isMounted = false
    this.x = config.x || 0
    this.y = config.y || 0
    this.direction = config.direction || 'down'
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || '/img/characters/people/little-goblin.png',
    })

    this.behaviorLoop = config.behaviorLoop || []
    this.behaviorLoopIndex = 0

    this.talking = config.talking || []
  }

  mount(map) {
    this.isMounted = true
    map.addWall(this.x, this.y)

    //if behavior, start after a short delay
    setTimeout(() => {
      this.doBehaviorEvent(map)
    }, 10)
  }

  update() {

  }

  async doBehaviorEvent(map) {
    //dont do anything if there is a cutscene or if there is nothing to do
    if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
      return
    }
    //setting up event with relevant info
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex]
    eventConfig.who = this.id
    //create an event instance out of next event config
    const eventHandler = new OverworldEvent ({ map, event: eventConfig })
    await eventHandler.init()
    //setting nect event to fire
    this.behaviorLoopIndex += 1
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0
    }

    this.doBehaviorEvent(map)
  }
}