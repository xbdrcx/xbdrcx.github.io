// Nightsky v1.0
// Developed by Bruno Cruz
// Github => https://www.github.com/xbdrcx
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var stars = []
var starMaxSize = 0.10
var starGlow = 60
var numStars = 300
var randColorEnabled = 0

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

class Sky {
    // Has Stars
    // Has a button switch (between Day and Night) 
}

class Star {
    constructor(xpos, ypos, maxSize, context) {
        
        this.starId = stars.length
        this.x = xpos
        this.y = ypos
        this.size = Math.random() * (maxSize - 0.5) + 0.5 
        this.color = "white"
        this.shadow_color = "#" + Math.floor(Math.random()*16777215).toString(16)
        this.context = context
        this.hasGlow = Math.floor(Math.random() * (2 - 0) - 0)
        this.hasColor = Math.floor(Math.random() * (2 - 0) - 0)
        
        if(randColorEnabled && this.hasColor) {
            this.context.fillStyle = this.shadow_color
        } else {
            this.context.fillStyle = "white"
        }
        this.context.beginPath()
        this.context.arc(this.x, this.y, this.size, this.size, 4 * Math.PI)
        this.context.fill()

        if(this.hasGlow) {
            this.context.shadowBlur = starGlow
            this.context.shadowColor = this.shadow_color
            this.context.beginPath()
            this.context.arc(this.x, this.y, this.size + 1, this.size + 1, 4 * Math.PI)
            this.context.fill()
        }

        stars.push(this)

    }
    updatePosition() {

        this.x = this.x + 1
        this.y = this.y + 1
        
        if(randColorEnabled && this.hasColor) {
            this.context.fillStyle = this.shadow_color
        } else {
            this.context.fillStyle = "white"
        }
        this.context.beginPath()
        this.context.arc(this.x, this.y, this.size, this.size, 4 * Math.PI)
        this.context.fill()

        if(this.hasGlow) {
            var randBlur = Math.floor(Math.random() * (starGlow - 2) + 2)
            this.context.shadowBlur = randBlur
            this.context.shadowColor = this.shadow_color
            this.context.beginPath()
            this.context.arc(this.x, this.y, this.size + 1, this.size + 1, 4 * Math.PI)
            this.context.fill()
        }

        if(this.x == canvas.width || this.y == canvas.height) {
            var createStar = Math.floor(Math.random() * (2 - 0) + 0) // 0 = Doesnt Create Star | 1 = Creates Star
            var randomDirection = Math.floor(Math.random() * (2 - 0) + 0) // 0 = Star stars from Y | 1 = Star stars from X
            if(createStar == 1) {
                if(randomDirection == 0) {
                    var randomX = Math.floor(Math.random() * (canvas.width - 0) + 0) // Random X between 0 and Max Width
                    new Star(randomX, 0, starMaxSize, ctx)
                } else {
                    var randomY = Math.floor(Math.random() * (canvas.height - 0) + 0) // Random Y between 0 and Max Height
                    new Star(0, randomY, starMaxSize, ctx)
                }
            }
        }

    }
}

function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for(let i=0; i<stars.length; i++) {
        stars[i].updatePosition()
    }
    setTimeout(function(){
        requestAnimationFrame(tick)
    }, 40)
}

document.addEventListener("DOMContentLoaded", function() {
    for(let i=0; i<numStars; i++) {
        var randomX = Math.floor(Math.random() * (canvas.width - 0) + 0)
        var randomY = Math.floor(Math.random() * (canvas.height - 0) + 0)
        new Star(randomX, randomY, starMaxSize, ctx)
    }
    tick()
})
