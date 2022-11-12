/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

canvas.width = 360
canvas.height = 550

const menuEl = document.querySelector('.menu-wrapper')
const pauseEl = document.querySelector('.pause-wrapper')
const gameoverEl = document.querySelector('.gameover-wrapper')
const gameEl = document.querySelector('.game-wrapper')
const gameTimerEl = document.querySelector('.timer-wrapper')
const gameScoreEl = document.querySelector('.score-game')
const gameOverScoreEl = document.querySelector('.score-gameover')
const gamePlayerEl = document.querySelector('.player')
const inputName = document.querySelector('.input-name')
const music = document.querySelector('.audio-list')
const btnPlay = document.querySelector('.btn-play')
const playerName = document.querySelector('.player')

function drawKeys(){
    let keys = [
        new Key({
            x: 0,
            y: canvas.height - 90
        }, 'D'),
        new Key({
            x: 90,
            y: canvas.height - 90
        }, 'F'),
        new Key({
            x: 180,
            y: canvas.height - 90
        }, 'J'),
        new Key({
            x: 270,
            y: canvas.height - 90
        }, 'K'),
    ]

    return keys
}

function drawLines(){
    let lines = [
        new Line({
            x: 90,
            y: 0
        }),
        new Line({
            x: 180,
            y: 0
        }),
        new Line({
            x: 270,
            y: 0
        })
    ]

    return lines
}

function drawBars(){
    let bars = [
        new Bar({
            x: 0,
            y: canvas.height - 90 - 10
        }),
        new Bar({
            x: 90,
            y: canvas.height - 90 - 10
        }),
        new Bar({
            x: 180,
            y: canvas.height - 90 - 10
        }),
        new Bar({
            x: 270,
            y: canvas.height - 90 - 10
        })
    ]

    return bars
}

function drawTiles(){
    const position = {
        x: Math.floor(Math.random() * 4) * 90,
        y: -100
    }

    const height = Math.floor(Math.random() * 120 + 90)

    return new Tile(position, height)
}

function tileGetHit(tile, key){
    return tile.position.x == key.position.x &&
        tile.position.y + tile.height > key.position.y
}

class Tile{
    constructor(position, height){
        this.width = 90
        this.height = height
        this.position = position
        this.speed = 4
    }

    draw(){
        ctx.fillStyle = 'rgba(255, 255, 255, .5)'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.position.y += this.speed
    }
}

class Key{
    constructor(keys, text){
        this.position = keys
        this.text = text
        this.width = 90
        this.height = 90
    }

    draw(){
        ctx.fillStyle = 'rgba(65,234,246,0.6)'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = 'white'
        ctx.font = '20px Arial'
        ctx.fillText(this.text, this.position.x + 40, this.position.y + 55)
    }

    update(){

    }
}

class Line{
    constructor(position){
        this.width = 1
        this.height = canvas.height
        this.color = 'white'
        this.position = position
    }

    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){

    }
}

class Bar{
    constructor(position){
        this.position = position
        this.width = 90
        this.height = 10
        this.color = 'rgba(255, 255, 255, .1)'
    }

    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){

    }
}

class inputHandler{
    constructor(game){
        document.addEventListener('keydown', (e) => {
            switch(e.key){
                case 'd':
                    game.bars[0].color = 'rgba(255, 255, 255, .7)'
                    game.tiles.forEach((tile, index) => {
                        if(tileGetHit(tile, game.bars[0])){
                            tileHit += 1
                            score = tileHit / (tileHit + tilePassed) * 100
                            gameScoreEl.innerHTML = score.toPrecision(4) + '%'
                            game.tiles.splice(index, 1)
                        }
                    })
                    break;
                case 'f':
                    game.bars[1].color = 'rgba(255, 255, 255, .7)'
                    game.tiles.forEach((tile, index) => {
                        if(tileGetHit(tile, game.bars[1])){
                            tileHit += 1
                            score = tileHit / (tileHit + tilePassed) * 100
                            gameScoreEl.innerHTML = score.toPrecision(4) + '%'
                            game.tiles.splice(index, 1)
                        }
                    })
                    break;
                case 'j':
                    game.bars[2].color = 'rgba(255, 255, 255, .7)'
                    game.tiles.forEach((tile, index) => {
                        if(tileGetHit(tile, game.bars[2])){
                            tileHit += 1
                            score = tileHit / (tileHit + tilePassed) * 100
                            gameScoreEl.innerHTML = score.toPrecision(4) + '%'
                            game.tiles.splice(index, 1)
                        }
                    })
                    break;
                case 'k':
                    game.bars[3].color = 'rgba(255, 255, 255, .7)'
                    game.tiles.forEach((tile, index) => {
                        if(tileGetHit(tile, game.bars[3])){
                            tileHit += 1
                            score = tileHit / (tileHit + tilePassed) * 100
                            gameScoreEl.innerHTML = score.toPrecision(4) + '%'
                            game.tiles.splice(index, 1)
                        }
                    })
                    break;
                case 'Escape':
                    if(gameover){
                        return
                    }

                    if(!pause){
                        audio.pause()
                        pause = true
                        pauseEl.style.display = 'flex'
                    }else{
                        audio.play()
                        pauseEl.style.display = 'none'
                        pause = false
                        animate()
                    }
                    break;
                default:
                    break;
            }
        })

        document.addEventListener('keyup', (e) => {
            switch(e.key){
                case 'd':
                    game.bars[0].color = 'rgba(255, 255, 255, .1)'
                    break;
                case 'f':
                    game.bars[1].color = 'rgba(255, 255, 255, .1)'
                    break;
                case 'j':
                    game.bars[2].color = 'rgba(255, 255, 255, .1)'
                    break;
                case 'k':
                    game.bars[3].color = 'rgba(255, 255, 255, .1)'
                    break;
                default:
                    break;
            }
        })
    }
}

class Game{
    constructor(){
        this.setup()
    }

    setup(){
        this.keys = drawKeys()
        this.bars = drawBars()
        this.lines = drawLines()
        this.tiles = []
        new inputHandler(this)
    }

    draw(){
        [...this.tiles, ...this.keys, ...this.bars, ...this.lines].forEach(e => e.draw())
    }
    
    update(){

        [...this.tiles, ...this.keys, ...this.bars, ...this.lines].forEach(e => e.update())

        this.tiles.forEach((tile, index) => {
            if(tile.position.y + tile.height - 10 > canvas.height){
                this.tiles.splice(index, 1)
                tilePassed += 1
                score = tileHit / (tileHit + tilePassed) * 100
                gameScoreEl.innerHTML = score.toPrecision(4) + '%'
            }
        })

        let timeSpawn = audio.duration - audio.currentTime

        if(spawnTileInterval > Math.random() * 50 + 50){
            if(timeSpawn < 2){
                return
            }else{
                this.tiles.push(drawTiles())
                spawnTileInterval = 0
            }
        }else{
            spawnTileInterval++
        }

        if(audio.ended){
            gameoverEl.style.display = 'flex'
            gameOverScoreEl.innerHTML = score.toPrecision(4) + '%'
            gameover = true
        }
    }
}

const game = new Game()
let time = 0
let time_second = 0
let time_minute = 0
let time_hour = 0
let time_format = '00:00:00'

let pause = true
let gameover = false
let score = 0
let tilePassed = 0
let tileHit = 0
const audio = new Audio()

let spawnTileInterval = 0

setInterval(() => {
    if(pause || gameover) return

    time++
    
    let second = Math.floor(time % 60)
    let minute = Math.floor(time / 60)
    let hour = Math.floor(minute / 60)

    if(second < 10){
        time_second = '0' + second
    }else{
        time_second = second
    }

    if(minute < 10){
        time_minute = '0' + minute
    }else{
        time_minute = minute
    }

    if(hour < 10){
        time_hour = '0' + hour
    }else{
        time_hour = hour
    }

    time_format = `${time_hour}:${time_minute}:${time_second}`
    gameTimerEl.innerHTML = time_format
    gameTimerEl.style.fontSize = '1.5rem'
    gameTimerEl.style.fontWeight = 'bold'
}, 1000)

function animate(){
    if(pause || gameover){
        return
    }else{
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update()
        game.draw()
        requestAnimationFrame(animate)
    }
}

function play(){
    if(music.value){
        localStorage.setItem('player', inputName.value)
        localStorage.setItem('music', music.value)
        menuEl.style.display = 'none'
        gameEl.style.display = 'flex'
        pause = false
        animate()
        audio.src = './assets/audio/' + localStorage.getItem('music') + '.mp3'
        audio.play()
        playerName.innerHTML = inputName.value
    }else{
        alert('Select music to play the game!')
    }
}

inputName.addEventListener('input', () => {
    if(inputName.value){
        btnPlay.style.pointerEvents = 'visible'
        btnPlay.style.backgroundColor = 'salmon'
    }else{
        btnPlay.style.pointerEvents = 'none'
        btnPlay.style.backgroundColor = 'rgb(250, 128, 114, .5)'
    }
})

btnPlay.addEventListener('click', play)