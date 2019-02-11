class TasksList {

  constructor(){

    this._cache = new LocalCache('todolist')
    this._tasks = this._cache.getItems() || []
    this._view = new TaskListView( document.querySelector( "table > tbody" ))
    this.ordered = ''
    this.reverse = true
    this.render()
  }

  add( task ){

    const t = this._tasks.filter( _task => task.title === _task.title)

    if( t.length ) throw new Error("Já existe uma task com este título.")

    this._tasks.push( task )
    this._cache.set( this._tasks )
    this.render()
  }

  remove( title ){

    this._tasks = this._tasks.filter( task => task.title !== title)

    this._cache.set( this._tasks )
    this.render()
  }

  update( task ){
    this._tasks = this._tasks.map( _task => {

      if( _task.title === task.title ) _task = task

      return _task
    })
    this.render()
  }

  filter( filter ){
    if( !filter ) {
      this._tasks = this._cache.getItems() || []
      this.render()
      return
    }
    this._tasks = this._tasks.filter( task =>

      task.title.includes( filter ) || task.description.includes( filter )
    )
    this.render()
  }

  orderBy( field ) {
    this.reverse = !this.reverse
    this._ordered = field;
    this._tasks.sort((taskA, taskB) => {

      let _return = 0
      if( taskA[ field ] < taskB[ field ] ) _return = -1;
      if( taskA[ field ] > taskB[ field ] ) _return = 1;
      if( _return && this.reverse ) _return = _return * -1

      return _return;
    })

    this.render()
  }

  getTask( title ){
    return this._tasks.filter( task => task.title === title)[0]
  }

  render(){
    this._view.render( this._tasks )
  }

}