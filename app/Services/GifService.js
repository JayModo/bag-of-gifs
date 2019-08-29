import Gifs from "../Models/Gifs.js";

// @ts-ignore
let _gifApi = axios.create({
    baseURL: 'https://api.giphy.com/v1/gifs/trending?api_key=Uu9QBityEx8E7TKYRLmwEmPW2dbmdxwu'
})

// @ts-ignore
let _sandBox = axios.create({
    baseURL: "https://bcw-sandbox.herokuapp.com/api/jeremy/gifs"
})

//Private
let _state = {
    myGifs: [],
    apiGifs: [],
    currentGifs: {},

}

//NOTE methods to run when a given property in state changes
let _subscribers = {
    myGifs: [],
    apiGifs: [],
    currentGifs: []
}

function _setState(propName, data) {
    //NOTE add the data to the state
    _state[propName] = data
    //NOTE run every subscriber function that is watching that data
    _subscribers[propName].forEach(fn => fn());
}

//Public
export default class GifService {
    setActive(id) {
        let gif = _state.myGifs.find(s => s._id == id)
        _setState('currentGifs', gif)
    }
    get myGifs() {
        return _state.myGifs.map(g => new Gifs(g))
    }
    get apiGifs() {
        return _state.apiGifs
    }
    get CurrentGifs() {
        return new Gifs(_state.currentGifs)
    }



    //NOTE adds the subscriber function to the array based on the property it is watching
    addSubscriber(propName, fn) {

        _subscribers[propName].push(fn)
    }

    setOne(id) {
        _gifApi.get(id)
            .then(res => {
                console.log(res.data)
                _setState('currentGif', new Gifs(res.data))
            })
    }



    getAllApi() {
        _gifApi.get()
            .then(res => {
                _setState('apiGifs', res.data.data)
                console.log(res.data.data)
            })
            .catch(err => console.error(err))
    }

    getOne(name) {
        _gifApi.get()
            .then(res => {
                let gif = new Gifs(res.data.data)
                _setState('currentGifs', gif)
                console.log(gif);

            })
            .catch(err => console.error(err))
    }

    //end gifApi


    //my api

    getMyGifs() {
        _sandBox.get()
            .then(res => {
                let data = res.data.data.map(g => new Gifs(g))
                _setState('myGifs', data)
                console.log(data);
            })
            .catch(err => console.error(err))
    }













}
