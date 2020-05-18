'use strict';

module.exports = {
    method: 'GET',
    path: '/health',
    options: {
        description: 'Healthcheck route',
        tags: ['api'],
        auth: false
    },
    handler: () => {

        return { pong: Date.now() };
    }
};
