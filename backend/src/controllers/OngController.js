const crypto = require('crypto');

const connection = require('../database/connection');

module.exports = {
    async index (req, res) {
        const ongs = await connection('ongs').select('*'); // aguarda a conexão, pra depois executar o select
    
        return res.json(ongs);
    },

    async create(req, res){
        const { name, email, whatsapp, city, uf } = req.body;

        const id = crypto.randomBytes(4).toString('HEX'); // gerando um id aleatorio com 4 bytes em hexadecimal utilizando Crypto

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return res.json({ id })
    }
}