export default class Gifs {
    constructor(data) {
        this._id = data._id
        this.name = data.name
        this.title = data.title
        this.embed_url = data.embed_url
    }

    get Template() {
        return `
        <div class="card ${this._id}">
        <div class="card-body" <iframe src="${this.embed_url}" frameborder="0"></iframe>>
         <h4 class="card-title">${this.title}</h4>
            <p class="card-text"></p>
            
            <button class="btn btn-warning" onclick="app.controllers.gifController.setOne">collect</button>
      </div>
      </div>
            `
    }
}