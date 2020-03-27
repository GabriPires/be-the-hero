const crypto = require('crypto');

module.exports = function generateUniqueId(){
    return crypto.randomBytes(4).toString('HEX'); // gerando um id aleatorio com 4 bytes em hexadecimal utilizando Crypto
}