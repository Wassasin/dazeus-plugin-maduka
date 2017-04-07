import './setup';
import config from '../config';
import _ from 'lodash';
import handle from './handler';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res) => {
    let responseMessages = [];

    const responder = (message, highlight=false) => {
        message = message.replace(/_cmd_/ig, req.body.command);
        responseMessages.push(message);
    };

    const done = () => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            'error': false,
            'text': responseMessages.join("\n"),
            'response_type': 'ephemeral',
        }));
    };

    const network = req.body.team_domain;
    const channel = req.body.channel_name;
    const user = req.body.user_name;

    const str = req.body.text;
    const args = req.body.text.split(/\s+/);

    handle(str, args, [network, channel, user], responder, done);
});

app.listen(config.mattermost.listen_port);


// const server = http.createServer((request, response) => {
//     request.on('readable', () => {

//     });
// });
// server.listen(config.mattermost.listen_port);


// let client = dazeus.connect(options, () => {
//   client.onCommand('ah', (network, user, channel, command, str, ...args) => {
//     let responder = (message, highlight=false) => {
//       client.reply(network, channel, user, config.prefix + message, highlight);
//     };
//     handle(str, args, [network, channel, user], responder);
//   });
// });
