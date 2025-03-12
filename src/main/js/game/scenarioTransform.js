define((require) => {
  const prizeData = require('skbJet/componentManchester/standardIW/prizeData');

  return function scenarioTransform(scenarioString) {
    // split the string into the two components, winning and player numbers
    const [winningString, playerString] = scenarioString.split('|');

    // winning numbers are just a comma seperated list of numbers
    const winningNumbers = winningString.split(',').map(int => parseInt(int, 10));

    // player numbers are a list of key:value pairs describing a number and its associated prize
    const playerPairs = playerString.split(',');
    const playerNumbers = playerPairs.map((pair) => {
      const [number, prize] = pair.split(':');
      return [
        number === 'X' ? 'X' : parseInt(number, 10),
        prizeData.prizeTable[prize]
      ];
    });

    return {
      winningNumbers,
      playerNumbers,
    };
  };
});
