const axios = require('axios');

/**
 * nomenclatura para consumir Loopback
 * DE INICIO: lb<nombre de la funcion declarativa>
 */

lbValidaCliente = async (dataInput) => {
    try {
        const {data} = await axios.post(
            `${process.env.LP_ACCESO}/lb/acceso/v1.0/cliente-accesos`,
            {
                tipoDocumento: dataInput.tipoDocumento,
                documento: dataInput.documento
            }
        );
        return data;
    } catch (error) {
        //console.log("Error para consumir loopback", error)
        return {codRes: "99", message: 'Error para validar cliente de acceso lb'}
    }
}

lbValidaClienteRefinanciamiento = async (dataInput) => {
    try {
        console.log(`${process.env.LP_ACCESO}/lb/acceso/v1.0/cliente-refinanciamientos/clienterefinanciamiento`)
        const {data} = await axios.post(
            `${process.env.LP_ACCESO}/lb/acceso/v1.0/cliente-refinanciamientos/clienterefinanciamiento`,
            {
                tipoDocumento: dataInput.tipoDocumento,
                documento: dataInput.documento
            }
        );
        return data;
    } catch (error) {
        //console.log("Error para consumir loopback", error)
        return {codRes: "99", message: 'Error para validar cliente de acceso lb'}
    }
}

module.exports = {
    lbValidaCliente,
    lbValidaClienteRefinanciamiento
}