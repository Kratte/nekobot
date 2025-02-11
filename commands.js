import 'dotenv/config';
import { fakeGameItems,Safeness } from './game.js';
import { InstallGlobalCommands } from './utils.js';
// Wiki command for game lookup
const NEKO_COMMAND = {
  name: 'neko',
  type: 1,
  description: 'sends a neko',
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};
const NEKONSFW_COMMAND = {
  name: 'nekonsfw',
  type: 1,
  description: 'sends a NSFW neko',
  options: [
    {
      type: 3,
      name: 'level',
      description: 'What level of NSFW should it be?',
      choices: Safeness,
      required: true,
    },
  ],
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};
const BUNNYGIRL_COMMAND = {
  name: 'bunnygirl',
  type: 1,
  description: 'sends a bunnygirl',
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};
const BUNNYGIRLNSFW_COMMAND = {
  name: 'bunnygirlnsfw',
  type: 1,
  description: 'sends a NSFW bunnygirl',
  options: [
    {
      type: 3,
      name: 'level',
      description: 'What level of NSFW should it be?',
      choices: Safeness,
      required: true,
    },
  ],
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};
const CAT_COMMAND = {
  name: 'cat',
  type: 1,
  description: 'sends a cute Cat',
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};
const CATBREED_COMMAND = {
  name: 'catbreed',
  type: 1,
  description: 'sends a cute Cat',
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};
const CAPY_COMMAND = {
  name: 'capy',
  type: 1,
  description: 'sends cute capybara',
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};
/*
const WIKI_COMMAND = {
  name: 'wiki',
  type: 1,
  description: 'Lookup information in wiki',
  options: [
    {
      type: 3,
      name: 'item',
      description: 'Item to lookup',
      choices: fakeGameItems,
      required: true,
    },
  ],
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};*/

const ALL_COMMANDS = [
  NEKO_COMMAND,
  NEKONSFW_COMMAND,
  CAT_COMMAND,
  CATBREED_COMMAND,
  BUNNYGIRL_COMMAND,
  CAPY_COMMAND,
  BUNNYGIRLNSFW_COMMAND,
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
