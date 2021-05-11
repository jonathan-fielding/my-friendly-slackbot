const {
    App,
} = require('@slack/bolt');

module.exports = async (SLACK_SIGNING_SECRET, SLACK_BOT_TOKEN, {
    newChannel = true, 
    inclusiveLanguage = true,
} = {}) => {
    const app = new App({
        signingSecret: SLACK_SIGNING_SECRET,
        token: SLACK_BOT_TOKEN,
    });

    if (newChannel) { 
        setupChannelCreated(app);
    }

    if (inclusiveLanguage) {
        setupInclusiveLanguage(app);
    }

    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Friendly bot app is running!');
}

async function getNewChannelBotId(client, cursor = '') {
    const channels = await client.conversations.list({limit: 1000, cursor});
    const newChannelBot = channels.channels.filter(channel => channel.name_normalized === '_new_channel_bot');

    if (newChannelBot.length) {
        return newChannelBot[0].id
    } else if (channels.response_metadata.next_cursor){
        return await getNewChannelBotId(client, channels.response_metadata.next_cursor)
    } else {
        return null;
    }
}

function setupChannelCreated(app) {
    let newChannelBotId;

    app.event('channel_created', async ({
        event,
        ack,
        client
    }) => {
        await (ack);

        if (!newChannelBotId) {
            newChannelBotId = await getNewChannelBotId(client);
        }

        // Channel might not exist
        if (newChannelBotId) {
            await client.chat.postMessage({
                channel: newChannelBotId,
                text: `#${event.channel.name} has been created`,
                parse: 'full'
            });
        }

    });
}

function setupInclusiveLanguage(app) {
    app.message('guys', async ({ event, client }) => {
        client.chat.postEphemeral({
            channel: event.channel,
            user: event.user,
            text: 'The use of _"Guys"_ is not an inclusive language, why not try "team", "folks" or "everyone"',
        });
    });
}