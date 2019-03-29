'use strict';

import inspiration from 'TheMindOfAGustin';

const config = require('./config.json');

function formatSlackMessage(query, response) {
    let entity;
    if (
        response &&
        response.data &&
        response.data.itemListElement &&
        response.data.itemListElement.length > 0
    ) {
        entity = response.data.itemListElement[0].result;
    }

    // https://api.slack.com/docs/message-formatting
    const slackMessage = {
        response_type: 'in_channel',
        text: `Query: ${query}`,
        attachments: [],
    };

    if (! entity) {
        return slackMessage.attachments.push({text: '...'});
    }

    const attachment = { color: '#3367d6' };

    if (entity.name) {
        attachment.title = entity.name;
        if (entity.description) {
            attachment.title = `${attachment.title}: ${entity.description}`;
        }
    }

    if (entity.detailedDescription) {
        if (entity.detailedDescription.url) {
            attachment.title_link = entity.detailedDescription.url;
        }
        if (entity.detailedDescription.articleBody) {
            attachment.text = entity.detailedDescription.articleBody;
        }
    }

    if (entity.image && entity.image.contentUrl) {
        attachment.image_url = entity.image.contentUrl;
    }

    slackMessage.attachments.push(attachment);

    return slackMessage;
}

function verifyWebhook(body) {
    if (! body || body.token !== config.SLACK_TOKEN) {
        const error = new Error('Invalid credentials');
        error.code = 401;
        throw error;
    }
}

function justInspire(predicate = "") {
    return new Promise((resolve, reject) => {
        resolve(formatSlackMessage(predicate, inspiration(predicate)));
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
