if (process.env.NODE_ENV === 'development') {
    module.exports = ['http://localhost:3000'];
} else {
    module.exports = [
        'https://leocontacts.com',
        'https://www.leocontacts.com',
    ];
}

