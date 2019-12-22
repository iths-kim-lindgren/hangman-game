let keyboard = document.querySelector(".keyboard")
let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ"
let secretWordContainer = document.querySelector(".secretWordContainer")
let wrongGuesses = 0
let allGuesses = []
let failSound = new Audio("fail.mp4")
let canvas = document.querySelector("#canvas")
let ctx = canvas.getContext("2d")
let canvasWidth = 200
let canvasHeight = 200
let secretWord = window.localStorage.getItem("secretWord")

function main(){
    if (window.location.pathname == ("/")){
        window.localStorage.clear()
        for (let i = 0; i < 5; i++){
            draw()
            wrongGuesses++
        }
        setGameSettings()
        // document.querySelector("a.newGame").addEventListener("click", function(_){
        //     setGameSettings()
        // })
        return
    }
    // var secretWord = window.localStorage.getItem("secretWord")
    renderSecretWord(secretWord)
    if (window.localStorage.key(1)){
        let img = window.localStorage.getItem("img")
        renderImage(img)
    }
    renderKeyboard()
    draw()
}

function setGameSettings(){
    document.querySelectorAll("input").forEach(input => input.addEventListener("change", function(event){
        if (event.target.value == "geo"){
            window.localStorage.setItem("secretWord", geoArr[(Math.floor(Math.random() * geoArr.length))])
        } else if (event.target.value == "bio"){
            window.localStorage.setItem("secretWord", bioArr[(Math.floor(Math.random() * bioArr.length))])
        } else if (event.target.value == "pers") {
            window.localStorage.setItem("secretWord", persArr[(Math.floor(Math.random() * persArr.length))])
        } else if (event.target.value == "simple"){
            let thisObj = simpleObjs[(Math.floor(Math.random() * simpleObjs.length))]
            let thisObjName = thisObj.name
            let thisObjImg = thisObj.img
            window.localStorage.setItem("secretWord", thisObjName)
            window.localStorage.setItem("img", thisObjImg)
        } else {
            window.localStorage.setItem("secretWord", event.target.value)
        }
        console.log(window.localStorage.getItem("secretWord"))
}))}

function renderKeyboard(){
    letters.split("").forEach(function (letter) {
        let key = document.createElement("button")
        keyboard.children[2].appendChild(key)
        keyboard.children[Math.floor(letters.indexOf(letter) / 10)].appendChild(key)
        key.classList.add("key")
        key.innerText = letter
        key.addEventListener("click", function (_) {
            key.style.visibility = "hidden"
            checkLetter(letter)
        })
    })
}

function renderImage(img){
    document.querySelector("img").src = img
}

function renderSecretWord(secretWord) {
    for (let letter of secretWord) {
        let letterContainer = document.createElement("div")
        secretWordContainer.appendChild(letterContainer)
        letterContainer.classList.add("letterContainer")
        if (letter == " ") letterContainer.style.borderBottom = "none"
    }
}

function checkLetter(letterGuessed) {
    // let secretWord = window.localStorage.getItem("secretWord")
    let correctGuess = false
    for (let letter in secretWord) {
        if (secretWord[letter].toUpperCase() == letterGuessed) {
            secretWordContainer.children[letter].innerText = letterGuessed
            correctGuess = true
        }
    }
    if (correctGuess == true) {
        allGuesses.push(letterGuessed)
        checkIfWin(allGuesses)
    } else {
        wrongGuess()
    }
}

function wrongGuess() {
    wrongGuesses++
    draw()
    if (wrongGuesses == 10) {
        document.querySelector(".message").innerText = "Du förlorade. Fortsätt gissa eller spela igen."
        playSound(failSound)
    }
}

function checkIfWin(allGuesses) {
    let match = 0
    for (let letter of secretWord) {
        if (letter != " ") {
            if (allGuesses.includes(letter.toUpperCase())) {
                match++
            }
        }
    }
    if (match == secretWord.length - numberOfSpaces(secretWord)) {
        if (wrongGuesses >= 10){ 
            document.querySelector(".message").innerText = "Det var på tiden att du fick fram det!"
        } else {
            document.querySelector(".message").innerText = "Du klarade det! Grattis!" 
        }
    }
}

function numberOfSpaces(secretWord) {
    let spaces = 0
    for (letter of secretWord) {
        if (letter == " ") spaces++
    }
    return spaces
}


let hangman = [
    {
        type:"line",
        start: {x:100,y:100},
        end: {x: 150, y:100}
    },
    {
        type: "circle",
        center: {x:50,y:50},
        radius: 25
    }
]

    function drawShape(shape){
        switch(shape.type){
            case 'circle':
            break;
            case 'line':
                ctx.beginPath()
                ctx.moveTo(shape.start.x, shape.start.y)
                ctx.lineTo(shape.end.x, shape.end.y)
                ctx.stroke()
            break;
        }
    }

    let currentGraphic = 0;

    function drawNextGraphic(){
        for(let shape of hangman[currentGraphic++]){
            drawShape(shape)
        }
    }


function draw() {
    switch (true) {
        case wrongGuesses == 0:
            ctx.beginPath()
            ctx.moveTo(20, 180)
            ctx.lineTo(180, 180)
            ctx.stroke()
            break;
        case wrongGuesses == 1:
            ctx.beginPath()
            ctx.moveTo(20, 180)
            ctx.lineTo(20, 20)
            ctx.stroke()
            break;
        case wrongGuesses == 2:
            ctx.beginPath()
            ctx.moveTo(20, 20)
            ctx.lineTo(120, 20)
            ctx.stroke()
            break;
        case wrongGuesses == 3:
            ctx.beginPath()
            ctx.moveTo(20, 50)
            ctx.lineTo(50, 20)
            ctx.stroke()
            break;
        case wrongGuesses == 4:
            ctx.beginPath()
            ctx.moveTo(120, 20)
            ctx.lineTo(120, 40)
            ctx.stroke()
            break;
        case wrongGuesses == 5:
            ctx.beginPath()
            ctx.arc(120, 52, 12, 0, Math.PI * 2) //huvud
            ctx.stroke()
            ctx.beginPath()
            ctx.arc(120, 55, 5, 0, Math.PI * 1) //mun
            ctx.stroke()
            ctx.beginPath()
            ctx.arc(123.5, 48, 1.5, 0, Math.PI * 2) //ögon
            ctx.stroke()
            ctx.beginPath()
            ctx.arc(116.5, 48, 1.5, 0, Math.PI * 2)
            ctx.stroke()
            break;
        case wrongGuesses == 6:
            ctx.beginPath()
            ctx.moveTo(120, 65)
            ctx.lineTo(120, 110)
            ctx.stroke()
            break;
        case wrongGuesses == 7:
            ctx.beginPath()
            ctx.moveTo(120, 65)
            ctx.lineTo(90, 90)
            ctx.stroke()
            ctx.clearRect(113,55,14,6) //ta bort glad mun
            ctx.beginPath()
            ctx.moveTo(115, 58) //neutral mun
            ctx.lineTo(125, 58) //neutral mun
            ctx.stroke()
            break;
        case wrongGuesses == 8:
            ctx.beginPath()
            ctx.moveTo(120, 65)
            ctx.lineTo(150, 90)
            ctx.stroke()
            break;
        case wrongGuesses == 9:
            ctx.beginPath()
            ctx.moveTo(120, 110)
            ctx.lineTo(100, 140)
            ctx.stroke()
            ctx.clearRect(113,55,14,6) //ta bort neutral mun
            ctx.beginPath()
            ctx.arc(120, 60, 5, 0, Math.PI * 1, true) //ledsen mun
            ctx.stroke()
            break;
        case wrongGuesses == 10:
            ctx.clearRect(113,45,14,6)
            ctx.beginPath()
            ctx.moveTo(122, 47) //höger öga
            ctx.lineTo(125, 50)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(122, 50) //höger öga
            ctx.lineTo(125, 47)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(115, 47) //vänster öga
            ctx.lineTo(118, 50)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(115, 50) //vänster öga
            ctx.lineTo(118, 47)
            ctx.stroke()
            ctx.beginPath() //höger ben
            ctx.moveTo(120, 110)
            ctx.lineTo(140, 140)
            ctx.stroke()
            break;
    }
}

let geoArr = ["Andorra", "Belize", "Myanmar", "Dubai", "Helsingfors", "Kairo", "Togo", "Tchad", "Canberra", "Belarus"]
let bioArr = ["Pelargon", "Maskros", "Hängpetunia", "Svärmorstunga", "Vildviol", "Begonia", "Doftpelargon", "Krysantemum", "Orkide", "Azalea", "Julamaryllis", "Julstjärna"]
let persArr = ["Napoleon", "Barack Obama", "Greta Garbo", "Franz Liszt", "Winston Churchill", "Margaret Thatcher", 
"Gilgamesh", "Julius Caesar", "Bill Gates", "Hans Rosling", "Greta Thunberg", "Madonna"]
let simpleObjs = [{name: "Morot", img: "img/morot.jpg"}, {name: "Ko", img: "img/ko.jpg"}, {name: "Katt", img: "img/katt.jpg"}, {name: "Hund", img: "img/hund.webp"}, {name: "Potatis", img: "img/potatis.png"}, {name: "Bebis", img: "img/bebis.jpg"}, {name: "Ugglis", img: "img/ugglis.png"}, {name: "Gecko", img: "img/gecko.png"}, {name: "Kattpojken", img: "img/kattpojken.png"}]

function playSound ( soundname ){
    soundname.play();
  }

// let secretWord = ""
main()