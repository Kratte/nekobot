import 'dotenv/config';
import express from 'express';
import { InteractionType, InteractionResponseType } from 'discord-interactions';
import {
  VerifyDiscordRequest,
  getServerLeaderboard,
  createPlayerEmbed, createCatEmbed, createNekoEmbed,
} from './utils.js';
import {getFakeProfile, getSafeness, getWikiItem} from './game.js';
import { NekosAPI } from 'nekosapi';
const nekos = new NekosAPI();

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/interactions', async function (req, res) {
  // Interaction type and data
  const { type, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  // Log request bodies
  console.log(req.body);

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
    console.log(data);

    // "leaderboard" command
    // "profile" command
    // "link" command
    // "neko" command
    if (name === 'neko') {
      fetch("https://api.nekosapi.com/v4/images/random?tags=kemonomimi&limit=1&rating=safe")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + "https://api.nekosapi.com/v4/images/random?tags=kemonomimi&limit=1&rating=safe");
        }
        return response.json();
      })
      .then(data => {
        const imagesurl = data[0].url;
        const nekoEmbed = createNekoEmbed(data[0]);
        console.log(data);
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            embeds: [nekoEmbed]
          },
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
      // Send a message into the channel where command was triggered from
      
    }

    //nekoNSFW
    if (name === 'nekonsfw') {
      const option = data.options[0];
      const selectedItem = getSafeness(option.value);
      fetch("https://api.nekosapi.com/v4/images/random?tags=kemonomimi&limit=1&rating="+ selectedItem.name)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok ' + "https://api.nekosapi.com/v4/images/random?tags=kemonomimi&limit=1&rating=" + selectedItem.name);
            }
            return response.json();
          })
          .then(data => {
            const nekoEmbed = createNekoEmbed(data[0]);
            console.log(data);
            return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                embeds: [nekoEmbed]
              },
            });
          })
          .catch(error => {
            console.error('Error:', error);
          });
      // Send a message into the channel where command was triggered from

    }
    //Cat commad
    if (name === 'cat') {

      fetch("https://api.thecatapi.com/v1/images/search?api_key="+process.env.CAT_API_KEY)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok ' + "https://api.thecatapi.com/v1/images/search?api_key=");
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
            const catEmbed = createCatEmbed(data[0]);
            console.log(catEmbed);
            return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                embeds: [catEmbed]
              },
            });
          })
          .catch(error => {
            console.error('Error:', error);
          });
  }

    // Send a message into the channel where command was triggered from

  }
  // handle button interaction
  if (type === InteractionType.MESSAGE_COMPONENT) {
    const profile = getFakeProfile(0);
    const profileEmbed = createPlayerEmbed(profile);
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        embeds: [profileEmbed],
      },
    });
  }
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
