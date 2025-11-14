import { Webhook, MessageBuilder } from 'discord-webhook-node'
import fs from 'fs'

const hook = new Webhook("https://discord.com/api/webhooks/1437726714531676211/6hIUjrAzmKD8ETtERw2Tpz0NEfgsfi4mkWeyG1ecGp4RfOf7JpaH9hWHZHPMNFFZZVAL");
const reportFilePath = process.argv[2]

fs.readFile(reportFilePath, 'utf8', (err, data) => {
  if (err) {
    console.log('An error occured while reading the file!', err);
  } else {
    const reportData = JSON.parse(data)
    reportMessageBuilder(reportData.stats)
  }
});

function reportMessageBuilder(stats){
    let color = stats.failures === 0 ? '#00ff00' : '#ff0000'
    const embed = new MessageBuilder()
        .setTitle("TEST RESULTS")
        .addField('Tests Executed', stats.tests)
        .addField('Tests Passed', stats.passes)
        .addField('Tests Failed', stats.failures)
        .addField('% Passed', `${stats.passPercent.toFixed(2)}%`)
        .setColor(color);
    hook.send(embed)
}

