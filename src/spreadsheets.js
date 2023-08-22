const { GoogleSpreadsheet } = require('google-spreadsheet')

const credenciales = require('./public/claves/googledriveclaves.json')

// Este es el Id del archivo de google sheets (recordemos que lo podemos obtener de la URL)
let googleId = '1jbhWfc_z2lMxKCuNNWHr8xfiN_jKvqcym_TncfNz-go'

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
            column1: registro._rawData[0],
            column2: registro._rawData[1],
            column3: registro._rawData[2],
            column4: registro._rawData[3],
            column5: registro._rawData[4],
            column6: registro._rawData[5],
            column7: registro._rawData[6],
            column8: registro._rawData[7],
            column9: registro._rawData[8],
            column10: registro._rawData[9],
            column11: registro._rawData[10],
            column12: registro._rawData[11],
            column13: registro._rawData[12]
        });
    })

    return jsonArr

}

async function actualizarRegistroGS(statusToUpdate,idToUpdate,columnToUpdate){
    const documento = new GoogleSpreadsheet(googleId)
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    const sheet = documento.sheetsByIndex[0]
    let registros = await sheet.getRows()
    await sheet.loadCells('A1:I50001');

    sheet.getCell(Number(idToUpdate),Number(columnToUpdate)-1).value = statusToUpdate

    await sheet.saveUpdatedCells();
}

module.exports = {
    accederGoogleSheet: accederGoogleSheet,
    actualizarRegistroGS: actualizarRegistroGS,
}