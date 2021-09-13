const { MongoClient } = require('mongodb');
require('dotenv').config();

class Database {

    async insertUsuarioCollection(usuario) {
        const conn = await this.connect();
        const database = conn.db("Felipao");
        const usuarios = database.collection("usuarios");

        const usuario_template = {
            name: usuario.name,
            id: usuario.id,
            nick_steam: usuario.nick || ''
        }
        const result = await usuarios.insertOne(usuario_template);
        conn.close();
        console.log(`${usuario.name} usuario foi adicionado`);
    }

    async findUser(user_id) {
        const conn = await this.connect();
        const database = conn.db("Felipao");
        const usuario = await database.collection("usuarios")
            .find({ id: user_id })
            .toArray();
        conn.close();

        return usuario;
    }

    async updateUser(user_id, set) {
        const conn = await this.connect();
        const database = conn.db("Felipao");
        const usuario = await database.collection("usuarios")
            .update(
                { id: user_id },
                {
                    $set: {
                        nick_steam: set
                    }
                }
            )
        conn.close();

        return usuario;
    }

    async getUsuarios() {
        const conn = await this.connect();
        const database = conn.db("Felipao") //selecionando banco
        const usuarios = await database.collection("usuarios").find({}).toArray();
        conn.close();

        return usuarios;
    }

    async connect() {
        try {

            const client = new MongoClient(process.env.NODE_ENV === 'production' ? process.env.URI : "mongodb://localhost:27017");
            const conn = await client.connect();

            return conn;
        } catch (e) {
            console.log(e);
        }
    }
}


module.exports = { Database }
