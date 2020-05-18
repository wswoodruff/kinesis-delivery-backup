'use strict';

const Joi = require('@hapi/joi');

module.exports = {
    method: 'POST',
    path: '/log',
    options: {
        description: 'Backup log route for other microservices to use if Kinesis fails',
        tags: ['api'],
        validate: {
            payload: Joi.object({
                source: Joi.string(),
                logs: Joi.array().items(Joi.object())
            })
        },
        auth: false
    },
    handler: (request, h) => {

        const { logService } = request.services();

        const { source, logs } = request.payload;

        logService.log({ source, logs });

        return { pong: Date.now() };
    }
};
