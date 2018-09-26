const {
  Property,
  SingleThing,
  Thing,
  Value,
  WebThingServer,
} = require('webthing');


function makeThing() {
  const thing = new Thing('My Lamp',
                          ['OnOffSwitch', 'Light'],
                          'A web connected lamp');

  thing.addProperty(
    new Property(thing,
                 'on',
                 new Value(true),
                 {
                   '@type': 'OnOffProperty',
                   label: 'On/Off',
                   type: 'boolean',
                   description: 'Whether the lamp is turned on',
                 }));
  thing.addProperty(
    new Property(thing,
                 'brightness',
                 new Value(50),
                 {
                   '@type': 'BrightnessProperty',
                   label: 'Brightness',
                   type: 'number',
                   description: 'The level of light from 0-100',
                   minimum: 0,
                   maximum: 100,
                   unit: 'percent',
                 }));

  return thing;
}

function runServer() {
  const thing = makeThing();

  // If adding more than one thing, use MultipleThings() with a name.
  // In the single thing case, the thing's name will be broadcast.
  const server = new WebThingServer(new SingleThing(thing), 8888);

  process.on('SIGINT', () => {
    server.stop().then(() => process.exit()).catch(() => process.exit());
  });

  server.start();
}

runServer();
