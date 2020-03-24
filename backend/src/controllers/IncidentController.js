const connection = require('../database/connection');

module.exports = {
    async index(req, res){
        const { page = 1 } = req.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5) // limitando o numero de resultados da busca
        .offset((page - 1)*5) // pagina 0 => 5 registros e assim por diante
        .select(['incidents.*', // todos valores da tabela incidents
        'ongs.name', // valores necessarios da tabela ongs
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf']);

        res.header('X-Total-Count', count['count(*)']); // retornando o numero de registros de casos
        
        return res.json(incidents);
    },

    async create (req, res){
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;  

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        // const id = result[1]
        return res.json({id});
    },

    async delete(req, res){
        const {id} = req.params;
        const ong_id = req.headers.authorization;  
        
        const incident = await connection('incidents').where('id', id).select('ong_id').first();

        if(incident.ong_id != ong_id){
            return res.status(401).json({error: 'Operation not permitted.'})
        }

        await connection('incidents').where('id', id).delete();

        return res.status(204).send();
    }
}