const model = await tf.loadLayersModel("https://xbdrcx.github.io/projects/mnistjs/mnist_model.json")

const PREDICTION_ELEMENT = document.getElementById("pred")

function evaluate(image) {
    let answer = tf.tidy(function() {
        let newInput = tf.tensor1d(image).expandDims()
        let output = model.predict(newInput)
        return output.squeeze().argMax()
    })
    answer.array().then(function(index) {
        PREDICTION_ELEMENT.innerText = index
        answer.dispose()
    })
}

// Canvas Code
const canvas = document.getElementById("board")
const ctx = canvas.getContext("2d")
var rect = canvas.getBoundingClientRect()
var dpRatio = window.devicePixelRatio
canvas.width = rect.width * dpRatio
canvas.height = rect.height * dpRatio
canvas.fillStyle = "black"
ctx.fillRect(0, 0, canvas.width, canvas.height)

var mouseDown = false

let temp_canvas = document.createElement('canvas')
temp_canvas.width = 28
temp_canvas.height = 28
let temp_ctx = temp_canvas.getContext('2d')

window.onresize = () => {
    rect = canvas.getBoundingClientRect()
    dpRatio = window.devicePixelRatio
    canvas.width = rect.width * dpRatio
    canvas.height = rect.height * dpRatio
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

canvas.onmousedown = (e) => {
    $("#predtext").css("opacity", "0")
    mouseDown = !mouseDown
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.lineWidth = 15
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
}

canvas.onmouseup = (e) => {
    prediction()
}

function prediction() {
    mouseDown = !mouseDown
    let image = canvas.toDataURL()
    temp_ctx.drawImage(canvas, 0, 0, 28, 28)
    let imageData = temp_ctx.getImageData(0, 0, temp_canvas.width, temp_canvas.height)
    const data = imageData.data
    const grayscaleChannel = new Uint8ClampedArray(28 * 28)
    for (let i = 0; i < data.length; i += 4) {
        grayscaleChannel[i / 4] = data[i]
    }
    evaluate(grayscaleChannel)
    $("#predtext").css("opacity", "1")
}

canvas.onmousemove = (e) => {
    if (mouseDown) {
        ctx.strokeStyle = "white"
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
        ctx.stroke()
    }
}

function downloadCanvasContent() {
    let link = document.createElement('a')
    link.download = 'filename.png'
    link.href = canvas.toDataURL()
    link.click()
}
