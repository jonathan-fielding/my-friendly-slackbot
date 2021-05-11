require('dotenv').config();

require('./index.js')(process.env.SLACK_SIGNING_SECRET, process.env.SLACK_BOT_TOKEN);