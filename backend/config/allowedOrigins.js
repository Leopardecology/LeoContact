if (process.env.NODE_ENV === 'development') {
    module.exports = ['http://localhost:3000'];
}

if (process.env.NODE_ENV === 'production') {
    module.exports = [
        'https://leocontacts.com',
        'https://www.leocontacts.com',
    ];
}

