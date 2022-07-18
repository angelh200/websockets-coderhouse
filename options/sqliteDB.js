const options = {
    client: 'sqlite3',
    connection: { filename: './ecommerce/store.sqlite' },
    useNullAsDefault: true
};

module.exports = { options };