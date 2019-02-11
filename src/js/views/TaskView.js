class TaskView {

  constructor( element ) {

    this._element = element
  }

  close(){
    this._element.style.display = "none"
    this._element.innerHTML = ''

  }

  template( task ){

    return `
      <div class="task-view__container">
        <div class="task-view__content">
          <div class="task-view__title">${task.title}</div>
          <div class="task-view__description">${task.description}</div>
        </div>
        <div class="task-view__footer">
          <button class="btn-success" onClick="todo.closeModal()">OK</button>
        </div>
      </div>
    `
  }

  render( task ) {

    this._element.innerHTML = this.template( task )
    this._element.style.display = "block"
  }

}