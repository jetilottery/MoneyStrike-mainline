define({
  _BASE_APP: {
    children: [
      'background',
      'logo',
      'winUpTo',
      'winningNumbers',
      'playerNumbers',
    ],
  },

  /*
   * BACKGROUND
   */
  background: {
    type: 'sprite',
    children: ['selectionBackgrounds'],
    landscape: {
      texture: 'landscape_background',
    },
    portrait: {
      texture: 'portrait_background',
    },
  },
  
  selectionBackgrounds: {
    type: 'sprite',
    landscape: {
      texture: 'selectionBackgrounds',
    },
    portrait: {
      texture: 'selectionBackgroundsPortrait',
    },
  },

  /*
   * LOGO
   */
  logo: {
    type: 'sprite',
    anchor: 0.5,
    landscape: {
      x: 234,
      y: 152,
      texture: 'landscape_gameLogo',
    },
    portrait: {
      x: 405,
      y: 150,
      texture: 'portrait_gameLogo',
    },
  },


  /*
   * WIN UP TO
   */
  winUpTo: {
    type: 'container',
    children: ['winUpToIn', 'winUpToOut'],
    landscape: { x: 232, y: 290 },
    portrait: { x: 405, y: 282 },
  },
  winUpToIn: {
    type: 'container',
    children: ['winUpToInText'],
  },
  winUpToInText: {
    type: 'text',
    style: 'winUpTo',
    string: 'winUpTo',
    anchor: 0.5,
    maxWidth: 360,
  },
  winUpToOut: {
    type: 'container',
    children: ['winUpToOutText'],
  },
  winUpToOutText: {
    type: 'text',
    style: 'winUpTo',
    string: 'winUpTo',
    anchor: 0.5,
    maxWidth: 360,
  },


  /*
   * WINNING NUMBERS
   */
  winningNumbers: {
    type: 'container',
    children: ['winningNumbersTitle', 'winningNumber1', 'winningNumber2'],
    landscape: { x: 32, y: 342 },
    portrait: { x: 220, y: 326 },
  },
  winningNumbersTitle: {
    type: 'text',
    string: 'luckyNumbers',
    style: 'winningNumbersTitle',
    anchor: 0.5,
    maxWidth: 350,
    landscape: { x: 202, y: 49 },
    portrait: { x: 185, y: 47 },
  },
  winningNumber1: {
    type: 'container',
    landscape: { x: 111, y: 167, scale: 1 },
    portrait: { x: 97, y: 165, scale: 0.977 },
  },
  winningNumber2: {
    type: 'container',
    landscape: { x: 293, y: 167, scale: 1 },
    portrait: { x: 273, y: 165, scale: 0.977 },
  },


  /*
   * PLAYER NUMBERS
   */
  playerNumbers: {
    type: 'container',
    children: [
      'playerNumbersTitle',
      'playerNumber1',
      'playerNumber2',
      'playerNumber3',
      'playerNumber4',
      'playerNumber5',
      'playerNumber6',
      'playerNumber7',
      'playerNumber8',
      'playerNumber9',
      'playerNumber10',
    ],
    landscape: { x: 458, y: 161 },
    portrait: { x: 16, y: 610 },
  },
  playerNumbersTitle: {
    type: 'text',
    string: 'yourNumbers',
    style: 'playerNumbersTitle',
    anchor: 0.5,
    maxWidth: 750,
    landscape: { x: 475, y: 49 },
    portrait: { x: 389, y: 47 },
  },
  playerNumber1: {
    type: 'container',
    landscape: { x: 111, y: 166, scale: 1 },
    portrait: { x: 85, y: 155, scale: 0.839 },
  },
  playerNumber2: {
    type: 'container',
    landscape: { x: 293, y: 166, scale: 1 },
    portrait: { x: 237, y: 155, scale: 0.839 },
  },
  playerNumber3: {
    type: 'container',
    landscape: { x: 475, y: 166, scale: 1 },
    portrait: { x: 389, y: 155, scale: 0.839 },
  },
  playerNumber4: {
    type: 'container',
    landscape: { x: 657, y: 166, scale: 1 },
    portrait: { x: 541, y: 155, scale: 0.839 },
  },
  playerNumber5: {
    type: 'container',
    landscape: { x: 839, y: 166, scale: 1 },
    portrait: { x: 693, y: 155, scale: 0.839 },
  },
  playerNumber6: {
    type: 'container',
    landscape: { x: 111, y: 348, scale: 1 },
    portrait: { x: 85, y: 307, scale: 0.839 },
  },
  playerNumber7: {
    type: 'container',
    landscape: { x: 293, y: 348, scale: 1 },
    portrait: { x: 237, y: 307, scale: 0.839 },
  },
  playerNumber8: {
    type: 'container',
    landscape: { x: 475, y: 348, scale: 1 },
    portrait: { x: 389, y: 307, scale: 0.839 },
  },
  playerNumber9: {
    type: 'container',
    landscape: { x: 657, y: 348, scale: 1 },
    portrait: { x: 541, y: 307, scale: 0.839 },
  },
  playerNumber10: {
    type: 'container',
    landscape: { x: 839, y: 348, scale: 1 },
    portrait: { x: 693, y: 307, scale: 0.839 },
  },

  /*
   * How To Play
   */
  howToPlayPages: {
    type: 'container',
    children: ['howToPlayPage1']
  },
  howToPlayPage1: {
    type: 'text',
    string: 'page1',
    style: 'howToPlayText',
    fontSize: 30,
    wordWrap: true,
    anchor: 0.5,
    align: 'center',
    landscape: { x: 720, y: 415, wordWrapWidth: 1100 },
    portrait: { x: 405, y: 550, wordWrapWidth: 560 },
  },
});
