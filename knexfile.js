module.exports = {

    development: {
        client: 'sqlite3',
        connection: {
            filename: './dev.sqlite3'
        },

        useNullAsDefault: true, // Defina esta opção como true
        migrations: {
            directory: './migrations',
        },
    }
};