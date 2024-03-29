const dotenv = require('dotenv');
dotenv.config();

const getRandomDelay = () => {
    const min = 5;
    const max = 8;
    return Math.floor(Math.random() * (max - min + 1) + min) * 1000;
}

module.exports.getConfig = () => {
    const config = {
        clientId: process.env.PAXFUL_CLIENT_ID,
        clientSecret: process.env.PAXFUL_API_SECRET,
        offerHashes: process.env.OFFER_HASHES,
        //messageText: process.env.PAXFUL_AUTOGREETING_MESSAGE, //actual
        //messageText: process.env.PAXFUL_AUTOGREETING_MESSAGE.replace(/\\n/g, '\n'), //current, also works
        //messageText: process.env.PAXFUL_AUTOGREETING_MESSAGE.replace(/\\n/g, '\n'), //try2 //good
        messages: [
            process.env.PAXFUL_AUTOGREETING_MESSAGE_1 && process.env.PAXFUL_AUTOGREETING_MESSAGE_1.replace(/\\n/g, '\n'),
            process.env.PAXFUL_AUTOGREETING_MESSAGE_2 && process.env.PAXFUL_AUTOGREETING_MESSAGE_2.replace(/\\n/g, '\n'),
            process.env.PAXFUL_AUTOGREETING_MESSAGE_3 && process.env.PAXFUL_AUTOGREETING_MESSAGE_3.replace(/\\n/g, '\n'),
            process.env.PAXFUL_AUTOGREETING_MESSAGE_4 && process.env.PAXFUL_AUTOGREETING_MESSAGE_4.replace(/\\n/g, '\n'),
            process.env.PAXFUL_AUTOGREETING_MESSAGE_5 && process.env.PAXFUL_AUTOGREETING_MESSAGE_5.replace(/\\n/g, '\n'),
            process.env.PAXFUL_AUTOGREETING_MESSAGE_6 && process.env.PAXFUL_AUTOGREETING_MESSAGE_6.replace(/\\n/g, '\n'),
            process.env.PAXFUL_AUTOGREETING_MESSAGE_7 && process.env.PAXFUL_AUTOGREETING_MESSAGE_7.replace(/\\n/g, '\n'),
            process.env.PAXFUL_AUTOGREETING_MESSAGE_8 && process.env.PAXFUL_AUTOGREETING_MESSAGE_8.replace(/\\n/g, '\n'),
        ].filter(Boolean),
        messageDelay: getRandomDelay(),
        // messageDelay: parseInt(process.env.PAXFUL_AUTOGREETING_DELAY) || 10000,
        serverPort: process.env.SERVER_PORT || 3000
    }

    if (!config.clientId || !config.clientSecret) {
        const error = [
            'Either "PAXFUL_CLIENT_ID" and/or "PAXFUL_API_SECRET" is not defined.',
            'You can get client id and secret by creating an application on developers portal',
            '(https://developers.paxful.com)'
        ];

        throw new Error(error.join(' '));
    }

//    if (!config.messageText) {
//        const error = [
//            'Environment variable "PAXFUL_AUTOGREETING_MESSAGE" is not defined or empty.',
//            'Please set this variable with a message that you would like the bot to send',
//            'when a new trade is started upon your offer(s).'
//        ];
//
//        throw new Error(error.join(''))
//    }

    if (config.offerHashes) {
        config.offerHashes = config.offerHashes.split(',').map(v => v.trim())
    } else {
        const error = [
            'Environment variable "OFFER_HASHES" is not defined.',
            'Please provide hashes of offers that the bot should react to.',
            'You will get an offer hash when you create an offer on paxful.com.',
            'You can pass several offer hashes all separates by a comma, e.g.: SDma7enDCEs,hDmB3enGREm'
        ];

        throw new Error(error.join(' '));
    }

    return config;
}
