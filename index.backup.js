// Uses the slack button feature to offer a real time bot to multiple teams
const Botkit = require('botkit');
import inspiration from 'TheMindOfAGustin';

if (
    ! process.env.CLIENT_ID ||
    ! process.env.CLIENT_SECRET ||
    ! process.env.PORT ||
    ! process.env.VERIFICATION_TOKEN
) {
    console.log('Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN and PORT in environment');
    process.exit(1);
}

let config = {};
if (process.env.MONGOLAB_URI) {
    let BotkitStorage = require('botkit-storage-mongo');
    config = {storage: BotkitStorage({mongoUri: process.env.MONGOLAB_URI})};
} else {
    config = {json_file_store: './db_justinspire_slack_coommand/'};
}

const controller = Botkit.slackbot(config).configureSlackApp({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scopes: ['commands'],
});

controller.setupWebserver(process.env.PORT, (err, webserver) => {
    controller.createWebhookEndpoints(webserver);
    controller.createOauthEndpoints(webserver, (err, req, res) => {
        if (err) {
            res.status(500).send('ERROR: ' + err);
        } else {
            res.send('Success!');
        }
    });
});

controller.on('justInspire', function (cmd, msg) {
    switch (msg.command) {
        case "/justinspire":
            if (msg.token !== process.env.VERIFICATION_TOKEN) {
                return;
            }

            cmd.replyPublic(msg, inspiration(msg.text));
            //cmd.replyPublic(msg, "1", () => {
            //    cmd.replyPublicDelayed(msg, "2").then(cmd.replyPublicDelayed(msg, "3"));
            //});
            break;
            
        default:
            cmd.replyPublic(msg, "I'm afraid I don't know how to " + msg.command + " yet.");
    }
});
