const { GoogleSpreadsheet } = require('google-spreadsheet')

const credenciales = require('./public/claves/googledriveclaves.json')

// Este es el Id del archivo de google sheets (recordemos que lo podemos obtener de la URL)
let googleId = '1nmeZMYGuAXAxnGd3iZcXD2qK6gJsVxkPI96PczDptlA'

async function accederGoogleSheet(){
    //Hacemos la peticion al documento otorgando los accesos con las credenciales generadas en google console developer
    const documento = new GoogleSpreadsheet(googleId)
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    //Decidimos tomar la hoja de donde vamos a extraer la informacion y pedimos los datos
    const sheet = documento.sheetsByIndex[0]
    const registros = await sheet.getRows()
    //Definimos un arreglo para generar un JSON que almacenara la info 
    var jsonArr = [];
    //Llenamos la el array para generar el JSON con la data
    registros.forEach(function(registro) {
        jsonArr.push({
            numRifa: registro._rawData[0],
            apartado: registro._rawData[1],
            pagado: registro._rawData[2]
        });
    })

    return jsonArr

}

async function actualizarRegistroGS(listUpdate,WA,nombre,apellido,estado){
    const documento = new GoogleSpreadsheet(googleId)
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    const sheet = documento.sheetsByIndex[0]
    let registros = await sheet.getRows()
    await sheet.loadCells('A1:I50001');

    var date = new Date();
    var current_date = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();

    for(let index=0;index<registros.length;index++){
        for(i=0;i<listUpdate.length;i++){
            if(listUpdate[i]==registros[index].Num_Boleto){
                sheet.getCell(index+1,3).value = current_date
                sheet.getCell(index+1,5).value = nombre
                sheet.getCell(index+1,6).value = apellido
                sheet.getCell(index+1,7).value = estado
                sheet.getCell(index+1,8).value = WA
            }
        }
    }
    await sheet.saveUpdatedCells();

}

module.exports = {
    accederGoogleSheet: accederGoogleSheet,
    actualizarRegistroGS: actualizarRegistroGS,
}