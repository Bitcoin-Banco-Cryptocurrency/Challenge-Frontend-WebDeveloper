class TaskListView {

  constructor( elemento ) {

    this._elemento = elemento;
  }

  template( tasksList ) {

      return `
        ${tasksList.map( task => `
          <tr>
            <td>${task.title}</td>
            <td>
              ${[...task.description].map(( letter, index ) => {
                if( index <= 20 ) return letter
                return ''
              }).join('')}
              ${
                ( task.description.length > 20 ) ? '...' : ''
              }
            </td>
            <td>${task.active ? 'Sim' : 'Não'}</td>
            <td>
              <button class="btn-error" onClick="todo.remove('${task.title}')">Remover</button>
              <button class="btn-warning" onClick="todo.show('${task.title}')">Visualizar</button>
            </td>
          </tr>
        `).join('')}
      `;
  }

  render( tasksList ) {
    this._elemento.innerHTML = this.template( tasksList );
  }

}