# Friendly Slackbot

Friendly, is a self hosted Slackbot which can help you to create a more inclusive environment on for your employees on Slack.

Currently Friendly supports:
* Letting you know a new channel has been created on slack in a channel called #_new_channel_bot
* Nudge people with a private message if they are using language that is not inclusive
* Nudge people with a private message if they use offensive language, list comes from https://github.com/zacanger/profane-words/blob/master/words.json

## Installation

### Create a slack app

* Download slack-manifest.json from http://github.com/jonathan-fielding/my-friendly-slackbot, change the URL to where your hosting the slackbot.
* Visit https://api.slack.com/apps and click create new app
* Select from a manifest file
* Select the correct workspace
* Paste the contents of the slack-manifest.json you downloaded into the JSON tab
* Click create

### Create your instance of Friendly

```javascript
require('dotenv').config();

require('my-friendly-slackbot')(process.env.SLACK_SIGNING_SECRET, process.env.SLACK_BOT_TOKEN, {
    newChannel = true, 
    inclusiveLanguageWarning = true,
    offensiveLanguageWarning = true,
});
```

#### Options

Currently Friendly supports the following options:
##### newChannel (true/false)

Enables reporting when a new channel has been created, requires a channel called #_new_channel_bot to pre-exist.

##### inclusiveLanguageWarning (true/false)

Enables nudging people with a private message if they are using language that is not inclusive

##### offensiveLanguageWarning (true/false)

Enables nudging people with a private message if they use offensive language.

The list currently comes from https://github.com/zacanger/profane-words/blob/master/words.json