import GifService from "../Services/GifService.js";

//Private
let _gifService = new GifService()

function _drawApiGif() {
    let gifs = _gifService.apiGifs
    let template = '<ol>'
    gifs.forEach(g => {
        template += `<li onclick="app.controllers.gifController.getOne('${g.id}')">${g.title}</li>`
    })
    document.getElementById('api-gifs').innerHTML = template + '</ol>'
}

function _drawCurrentGif() {
    document.getElementById('current-Gifs').innerHTML = _gifService.CurrentGifs.Template
}

function _drawMyGif() {
    let gifs = _gifService.myGifs
    let template = '<ol>'
    gifs.forEach(g => {
        template += `<li onclick="app.controllers.gifController.setOne('${g._id}')">${g.title}</li>`
    })
    document.getElementById('my-gifs').innerHTML = template + "</ol>"
}

//Public
export default class GifController {
    constructor() {
        //NOTE Register all subscribers
        _gifService.addSubscriber('apiGifs', _drawApiGif)
        _gifService.addSubscriber("currentGifs", _drawCurrentGif)
        _gifService.addSubscriber('myGifs', _drawMyGif)
        //NOTE Retrieve data
        _gifService.getAllApi()
        _gifService.getMyGifs()
    }
    getOne(name) {
        _gifService.getOne(name)
    }


    setOne(id) {
        _gifService.setOne(id)
    }













}