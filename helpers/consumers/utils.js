const axios =  require('axios')


consumerExportXLSPy = async (allInfo) => {
    console.log("todos los datos, ", allInfo)
    try {
        const {data} = await axios.post(
            //'http://localhost:3003/ms/export/xls',
            `${process.env.URL_EXPORT_XLSX}`,
            {
                data: allInfo.data
            }
          )
      
          console.log("respuesta de execute export.py", data)
          return data
    } catch (error) {
        console.log("error para traer datos del export.py")
    }
}

module.exports = {
    consumerExportXLSPy
}