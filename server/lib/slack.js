const { WebClient } = require('@slack/web-api')
const config = require('../config/config')
const ip = require('ip')

const Channel = {
  TEST_ALERT: 'C02HQ99LC0L',
  PROD_ALERT: '',
}

class Slack {
  constructor() {
    this.webClient = new WebClient(config.slackToken)
  }

  static channelForAlert() {
    if (config.isProduction) {
      return Channel.PROD_ALERT
    }
    return Channel.TEST_ALERT
  }

  sendAlert(message, channel) {
    const conversationId = channel ? channel : Slack.channelForAlert()
    this.webClient.chat
      .postMessage({
        channel: conversationId,
        text: `ALERT - ${config.projectName}(${ip.address()})\n${message}`,
      })
      .then(() => {})
      .catch((err) => console.log(`SendAlert to ${channel} failed: ${err}`))
  }

  writeLogAndSendAlert(message, channel) {
    console.log(message)
    this.sendAlert(message, channel)
  }
}

module.exports.slack = new Slack()
