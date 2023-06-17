class Overworld {
  constructor(config) {
    this.element = config.element
    this.canvas = this.element.querySelector('.game-canvas')
    this.ctx = this.canvas.getContext('2d')
  }
  init() {
    const image = new Image()
    image.onload = () => {
      this.ctx.drawImage(image,0,0)
    }
    image.src = '/img/maps/field-2.png'
    
    //Game Objects
    const hero = new GameObject( {
      x: 5,
      y: 6,
    })
    const wizard = new GameObject( {
      x: 7,
      y: 9,
      src: '/img/characters/people/wizard.png'
    })

    setTimeout(() => {
      hero.sprite.draw(this.ctx)
      wizard.sprite.draw(this.ctx)
    }, 200)
  }
}