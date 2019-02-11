class MessageView {

  constructor( element ){

    this._element = element;
  }

  render( message, cssClass ){

    this._element.classList.remove("warning")
    this._element.classList.remove("error")
    this._element.classList.remove("success")

    this._element.innerHTML = message;
    this._element.classList.add( cssClass )
  }

}