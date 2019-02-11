class LocalCache {

  constructor( key ) {
    this.key = key;
  }

  set( items ) {
    window.localStorage.setItem( this.key, JSON.stringify( items ))
  }


  getItems(){

    const items = window.localStorage.getItem( this.key )
    return JSON.parse( items )
  }

}