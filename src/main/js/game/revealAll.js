define(require => {
  const Timeline = require('com/gsap/TimelineLite');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');

  const winningNumbers = require('game/components/winningNumbers');
  const playerNumbers = require('game/components/playerNumbers');

  let revealAllTimeline;

  function start() {
    const revealWinning = winningNumbers.revealAll();
    const revealPlayer = playerNumbers.revealAll();

    // disable all interaction at the parent container level
    displayList.playerNumbers.interactiveChildren = false;
    displayList.winningNumbers.interactiveChildren = false;

    // Combine the winningNumbers and playerNumbers reveals into one timeline
    revealAllTimeline = new Timeline({
      tweens: [
        new Timeline({ tweens: revealWinning, stagger: gameConfig.autoPlayWinningNumberInterval }),
        new Timeline({ tweens: revealPlayer, stagger: gameConfig.autoPlayPlayerNumberInterval }),
      ],
      align: 'sequence',
      stagger:
        revealWinning.length > 0 && revealPlayer.length > 0
          ? gameConfig.autoPlayPlayerNumberDelay
          : 0,
    });
    return revealAllTimeline;
  }

  function stop() {
    // re-enable all interaction at the parent container level
    displayList.playerNumbers.interactiveChildren = true;
    displayList.winningNumbers.interactiveChildren = true;

    if (revealAllTimeline) {
      revealAllTimeline.kill();
      revealAllTimeline = undefined;
    }
  }

  return {
    start,
    stop,
  };
});
