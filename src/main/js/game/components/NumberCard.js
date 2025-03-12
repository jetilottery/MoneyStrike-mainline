define(require => {
  const PIXI = require('com/pixijs/pixi');
  const Pressable = require('skbJet/componentManchester/standardIW/components/pressable');
  const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
  //const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  require('com/gsap/TweenMax');
  require('com/gsap/easing/EasePack');

  

  const Tween = window.TweenMax;
  //const TimelineMax = window.TimelineMax;

  

  const winFrameName = 'numberWin';
  const noWinFrameName = 'numberNoWin';

  class NumberCard extends Pressable {
    constructor() {
      super();

      this.WIDTH = 174;
      this.HEIGHT = 174;

      // Create all the empty sprites
      this.background = new PIXI.Sprite();
      this.win = new PIXI.Sprite();
      this.noWin = new PIXI.Sprite();
      this.revealAnim = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
      this.revealAnim.loop = false;
      this.revealAnim.animationSpeed = 0.5;
      this.idleAnim = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
      this.idleAnim.loop = false;
      this.idleAnim.animationSpeed = 0.5;
      this.idleAnim.visible = false;
      this.tweens = [];

      this.idleAnim.onComplete = () => {
        this.idleAnim.visible = false;
        this.revealAnim.visible = true;
      };

      // Center everything
      this.background.anchor.set(0.5);
      this.win.anchor.set(0.5);
      this.noWin.anchor.set(0.5);
      this.revealAnim.anchor.set(0.5);
      this.idleAnim.anchor.set(0.5);

      // Add all the result elements to a container
      this.resultContainer = new PIXI.Container();
      this.resultContainer.addChild(this.win, this.noWin);
      this.resultContainer.visible = false;
      this.resultContainer.name = 'resultContainer';

      this.addChild(this.background, this.resultContainer, this.revealAnim, this.idleAnim);

      // State
      this.revealed = false;

      // Interactivity
      this.hitArea = new PIXI.Rectangle(
        this.WIDTH / -2,
        this.HEIGHT / -2,
        this.WIDTH,
        this.HEIGHT
        );
      this.on('press', () => {
        if (!autoPlay.enabled) {
          this.reveal();
        }
      });
    }

    enable() {
      return new Promise(resolve => {
        this.reveal = resolve;
        this.enabled = true;
      }).then(() => {
        this.enabled = false;
      });
    }

    populate(number) {
      this.number = number;
      this.noWin.texture = PIXI.Texture.fromFrame(noWinFrameName + number);
      this.win.texture = PIXI.Texture.fromFrame(winFrameName + number);
      this.noWin.visible = true;
    }

    prompt() {
      if (!this.revealed && this.idleAnim.textures.length > 1) {
        this.revealAnim.visible = false;
        this.idleAnim.visible = true;
        this.idleAnim.gotoAndPlay(0);
      }
    }

    disable() {
      this.enabled = false;
      this.reveal = undefined;
    }

    

    reset() {      

      //window.TweenMax.killAll();
      this.resultContainer.visible = false;
      this.noWin.texture = PIXI.Texture.EMPTY;
      this.win.texture = PIXI.Texture.EMPTY;
      this.enabled = false;
      this.revealAnim.gotoAndStop(0);
      this.revealAnim.visible = true;
      this.noWin.visible = false;
      this.win.visible = false;
      this.revealed = false;
      this.matched = false;
      this.number = undefined;
      this.tweens.forEach((e)=>{
        e.kill();
      });
    }

    async uncover() {

      if (this.revealAnim.textures && this.revealAnim.textures.length > 1) {
        await new Promise(resolve => {
          // bring to front in case the animation overlaps neighboring cards
          this.revealAnim.parent.parent.setChildIndex(
            this.revealAnim.parent,
            this.revealAnim.parent.parent.children.length - 1
            );

          // Calculate the animation's duration in seconds
          const duration = this.revealAnim.textures.length / this.revealAnim.animationSpeed / 60;
          const halfDuration = duration / 2;
          // Tween in the results over the 2nd half of the animation
          this.resultContainer.visible = true;
          //this.resultContainer.scale = 1;

          Tween.fromTo(
            this.resultContainer,
            halfDuration,
            { alpha: 0 },
            {
              alpha: 1,
              delay: halfDuration,
            }
            );

          Tween.fromTo(
            this.resultContainer.scale,
            0,
            { x:1, y:1 },
            {
              x: 1,
              y: 1,
              delay: 0,
            }
            );



          // Wait for the animation to complete before resolving
          this.revealAnim.onComplete = () => {
            this.revealAnim.visible = false;
            this.revealed = true;
            resolve();
          };

          // Disable interactivity to prevent re-reveal, then switch to the animation
          this.enabled = false;
          this.revealAnim.gotoAndPlay(0);
        });
      } else {
        // Otherwise just a swap to the resultsContainer
        this.resultContainer.visible = true;
        this.revealAnim.visible = false;
        this.revealed = true;
      }
    }

    match() {
      this.matched = true;
      this.win.visible = true;
      this.noWin.visible = false;
    }

    

    presentWin() {            
      return new Promise(resolve => {

        

        this.tweens[0] = new Tween.to(this.resultContainer.scale,0.5,{
          x:1.2,
          y:1.2,
          onComplete:()=>{                           
            this.tweens[1] = new Tween.to({},1,{
              onComplete:resolve
            });

            this.tweens[2] = new Tween.fromTo(this.resultContainer.scale,0.5,{
              x:1.2,
              y:1.2,
            },{
              x:1,
              y:1,
              yoyo:true,
              repeat:-1
            });
          }

         

        });
         //var tl = new TimelineMax({paused: true}).add( this.tweens1).add( this.tweens2).add( this.tweens3);
         //var tltween = tl.tweenFromTo(0, tl.duration(), {paused: true});
         //tltween.play();

      });

     

    }
    
  }

  return NumberCard;
});


