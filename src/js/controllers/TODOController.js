
class TODOController {

  constructor(){
    this._tasks = new TasksList()
    this._message = new MessageView(document.getElementById("info-message"))
    this._taskView = new TaskView(document.getElementById("task-view"))

    this._inputTitle = document.getElementById('task-title')
    this._textareaDescription = document.getElementById('task-description')
    this._checkActive = document.getElementById('task-active')
    document.getElementById('btn-submit').addEventListener('click', ( e ) => this.addTask( e ))
    document.getElementById('task-filter').addEventListener('keyup', ( e ) => this.filter( e ))
    document.querySelectorAll('.data-table > table th').forEach( element => {
      if( element.dataset.field ) element.addEventListener('click', () => this.orderBy( element.dataset.field ))
    })

  }

  clearForm(){

    this._inputTitle.value = ""
    this._textareaDescription.value = ""
    this._checkActive.checked = true
  }

  addTask( e ){

    e.preventDefault()

    const title = this._inputTitle.value
    const description = this._textareaDescription.value
    const active = this._checkActive.checked

    const task = new Task(title, description, active)

    try{

      this._tasks.add( task )
      this._message.render("Tarefa criada com sucesso!", "success")
      this.clearForm()
    } catch ( erro ){

      this._message.render(erro.message, "error")
    }

  }

  filter( e ){
    const filter = e.target.value
    this._tasks.filter( filter )
  }

  remove( title ) {

    this._tasks.remove( title )
    this._message.render("Tarefa removida com sucesso!", "success")
  }

  orderBy( field ){

    this._tasks.orderBy( field )
  }

  show( title ){

    const task = this._tasks.getTask( title )
    this._taskView.render( task )
  }

  closeModal(){

    this._taskView.close()
  }

}