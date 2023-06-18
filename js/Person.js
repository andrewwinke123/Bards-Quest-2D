class Person extends GameObject{
  constructor(config) {
    super(config)
    this.movingProgressRemaining = 0

    this.isPlayerControlled = config.isPlayerControlled || false

    this.directionUpdate = {
      'up': ['y', -1],
      'down': ['y', 1],
      'left': ['x', -1],
      'right': ['x', 1],
    }
  }

  update(state) {
    if (this.movingProgressRemaining > 0) {
    this.updatePosition()
    } else {

      //cases for starting to walk

      //keyboard ready and have key pressed
      if (this.isPlayerControlled && state.arrow) {
        this.startBehavior(state, {
          type: 'walk',
          direction: state.arrow
        })
      }
      this.updateSprite(state)
    }
  }

  //set character direction to behavior
  startBehavior(state, behavior) {
    this.direction = behavior.direction
    console.log('Hero position:', this.x, this.y)
    if (behavior.type === 'walk') {
      //stop here if space is not free
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        return; //stop function execution if space is not free
      }
      //ready to walk
      this.movingProgressRemaining = 16
    }
  }


  updatePosition() {
      const [property, change] = this.directionUpdate[this.direction]
      this[property] += change
      this.movingProgressRemaining -= 1
  }

  updateSprite() {
    if(this.movingProgressRemaining > 0) {
      this.sprite.setAnimation('walk-'+this.direction)
      return
    }
    this.sprite.setAnimation('idle-'+this.direction)
  }

}