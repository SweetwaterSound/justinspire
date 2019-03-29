'use strict';

const inspiration = require('./TheMindOfAGustin');

/**
 *  https://api.slack.com/docs/message-formatting
 * @param predicate
 * @param message
 * @returns {number}
 */
function formatSlackMessage(message) {
    const slackMessage = {
        response_type: 'in_channel',
        text: message,
        attachments: [],
    };

    // formatting goes here
    return slackMessage.attachments.push({
        text: message,
    });
}

function verifyWebhook(body) {
    if (! body || body.token !== process.env.SLACK_TOKEN) {
        const error = new Error('Invalid credentials');
        error.code = 401;
        throw error;
    }
}

function justInspire(predicate = "") {
    return new Promise((resolve, reject) => {
        resolve(formatSlackMessage(inspiration.say(predicate.trim())));
    });
}

exports.justInspire = (req, res) => {
    return Promise.resolve().then(() => {
        if (req.method !== 'POST') {
            const error = new Error('Only POST requests are accepted');
            error.code = 405;
            throw error;
        }

        verifyWebhook(req.body);

        return justInspire(req.body.text);
    }).then(response => {
        res.json(response);
    }).catch(err => {
        console.error(err);
        res.status(err.code || 500).send(err);
        return Promise.reject(err);
    });
};
