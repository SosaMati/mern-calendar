const moment = require("moment");


const isDate = ( value ) => { // Función que valida si un valor es una fecha válida
    
    if ( !value ) { 
        return false;
    }

    const date = moment( value ); 
    if ( date.isValid() ) {
        return true;
    } else {
        return false;
    }

}


module.exports = {
    isDate
}