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


/* Datos del hospital Acoxpa*/

let googleIdAcoxpa = '1d_lB85pvlTD7V60MJZIDjz4QNj9EvtyDezvhJteAcdI'

async function extraerDoctoresAcoxpa(){
    //Hacemos la peticion al documento otorgando los accesos con las credenciales generadas en google console developer
    const documento = new GoogleSpreadsheet(googleIdAcoxpa)
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
            nombre: registro._rawData[16],
            apellido: registro._rawData[2],
            especialidad: registro._rawData[4],
            consultorio: registro._rawData[8],
            extension: registro._rawData[5],
            qr:registro._rawData[15],
        });
    })

    return jsonArr
}

async function extraerEspecialidadesAcoxpa(){
    //Hacemos la peticion al documento otorgando los accesos con las credenciales generadas en google console developer
    const documento = new GoogleSpreadsheet(googleIdAcoxpa)
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    //Decidimos tomar la hoja de donde vamos a extraer la informacion y pedimos los datos
    const sheet = documento.sheetsByIndex[1]
    const registros = await sheet.getRows()
    //Definimos un arreglo para generar un JSON que almacenara la info 
    var jsonArr = [];
    //Llenamos la el array para generar el JSON con la data
    registros.forEach(function(registro) {
        jsonArr.push({
            especialidad: registro._rawData[0]
        });
    })

    return jsonArr

}


/* Datos del hosìtal pedregal*/

// Este es el Id del archivo de google sheets (recordemos que lo podemos obtener de la URL)
let googleIdpedregal = '1z86Rrimu0V4OqVATSOKr0LzuOptXHpOLeEyBhWgdD2s'

async function extraerDoctores(){
    //Hacemos la peticion al documento otorgando los accesos con las credenciales generadas en google console developer
    const documento = new GoogleSpreadsheet(googleIdpedregal)
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
            nombre: registro._rawData[3],
            apellido: registro._rawData[1],
            especialidad: registro._rawData[5],
            consultorio: registro._rawData[7],
            torre: registro._rawData[6]
        });
    })

    return jsonArr
}

async function extraerEspecialidades(){
    //Hacemos la peticion al documento otorgando los accesos con las credenciales generadas en google console developer
    const documento = new GoogleSpreadsheet(googleIdpedregal)
    await documento.useServiceAccountAuth(credenciales)
    await documento.loadInfo()
    //Decidimos tomar la hoja de donde vamos a extraer la informacion y pedimos los datos
    const sheet = documento.sheetsByIndex[1]
    const registros = await sheet.getRows()
    //Definimos un arreglo para generar un JSON que almacenara la info 
    var jsonArr = [];
    //Llenamos la el array para generar el JSON con la data
    registros.forEach(function(registro) {
        jsonArr.push({
            especialidad: registro._rawData[0]
        });
    })

    return jsonArr

}


module.exports = {
    accederGoogleSheet: accederGoogleSheet,
    actualizarRegistroGS: actualizarRegistroGS,
    extraerDoctores: extraerDoctores,
    extraerEspecialidades: extraerEspecialidades,
    extraerDoctoresAcoxpa: extraerDoctoresAcoxpa,
    extraerEspecialidadesAcoxpa: extraerEspecialidadesAcoxpa,
}