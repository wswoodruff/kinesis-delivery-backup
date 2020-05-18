'use strict';

const Bounce = require('@hapi/bounce');

// const KinesisHapipal = require('kinesis-hapipal');
// const Ahem = require('ahem');

const Schmervice = require('schmervice');

module.exports = class LogService extends Schmervice.Service {

    // TODO come up with some retry scheme to try to send back to Kinesis
    // For now we'll just log locally
    // async initialize() {

    //     const { aws } = this.options;

    //     this.kinesis = await Ahem.instance(KinesisHapipal, { aws });
    // }

    log({ source, logs }) {

        logs = [].concat(logs);

        try {
            if (typeof logs === 'string') {
                logs = JSON.parse(logs);
            }
            else if (typeof logs[0] === 'string') {
                logs = logs.map(JSON.parse);
            }
        }
        catch (parseErr) {
            Bounce.ignore(parseErr, SyntaxError);
        }

        // TODO come up with some retry scheme to try to send back to Kinesis
        // For now we'll just log locally
        this.server.log(['error', 'kinesis', 'putRecords'], {
            msg: 'Kinesis failed',
            createdAt: Date.now(),
            source,
            logs
        });
    }
};
