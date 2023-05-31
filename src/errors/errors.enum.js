const ErrorEnum = {
    // Los errores de Entrada de 100-199
    NOT_FOUND: 104,
    INVALID_ID: 105,

    // Los errores Lógicos de 200-299
    CART_NOT_FOUND: 204,
    USER_NOT_FOUND: 205,
    PRODUCT_NOT_FOUND: 206,
    INSUFFICIENT_STOCK: 207,
    ERROR_ON_CREATING: 208,
    ERROR_ON_UPDATING: 209,
    ERROR_ON_DELETING: 210,
    ERROR_ON_MAIL_SENDING: 211,
    ERROR_ON_VALIDATING: 212,

    // Los errores de petición incorrecta
    BAD_REQUEST: 400,

    // Los errores de servidor 500-599
    SERVER_ERROR: 500
}

export default ErrorEnum