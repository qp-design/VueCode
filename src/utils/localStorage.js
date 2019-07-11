
  class Storage {

      get(key) {

          let data = localStorage.getItem(key);

          if( /^\{(.*?)\}$/.test(data) || /^\[(.*?)\]$/.test(data) ){

              data = JSON.parse(data);
          }

          return data;
      }

      set(key, value) {

          if(typeof value === 'object'){

              return localStorage.setItem( key, JSON.stringify(value) );
          }

          localStorage.setItem( key, value );
      }

      remove(key) {

          localStorage.removeItem(key);
      }

      clear(){

          localStorage.clear()
      }
  };

  export default new Storage();
