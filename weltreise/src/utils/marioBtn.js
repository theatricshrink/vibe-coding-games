/**
 * makeMarioBtn — Mario-style 3-D button using Phaser Graphics + Zone
 *
 * scene   Phaser.Scene
 * x, y    Centre in scene/screen coordinates
 * label   Button text
 * onClick Callback (fired on pointerdown)
 * opts    { w, h, fontSize, color, scrollFactor, depth }
 */
function makeMarioBtn(scene, x, y, label, onClick, opts) {
  opts = opts || {};
  var W  = opts.w  || 220;
  var H  = opts.h  || 54;
  var base = (opts.color !== undefined) ? opts.color : 0xe8a000;
  var fs = opts.fontSize || '22px';
  var sf = (opts.scrollFactor !== undefined) ? opts.scrollFactor : 1;
  var dp = opts.depth || 0;

  var g = scene.add.graphics().setScrollFactor(sf).setDepth(dp);

  function _t(hex, d) {
    var r  = Math.max(0, Math.min(255, ((hex >> 16) & 0xff) + d));
    var gv = Math.max(0, Math.min(255, ((hex >>  8) & 0xff) + d));
    var b  = Math.max(0, Math.min(255, ( hex        & 0xff) + d));
    return (r << 16) | (gv << 8) | b;
  }

  function draw(state) {
    g.clear();
    var oy  = (state === 'down') ? 4 : 0;
    var col = (state === 'over') ? _t(base, 35)  :
              (state === 'down') ? _t(base, -25) : base;
    // Drop shadow (hidden when pressed — creates 3-D depth effect)
    if (state !== 'down') {
      g.fillStyle(0x1a0900, 1);
      g.fillRect(x - W/2 + 4, y - H/2 + 6, W, H);
    }
    // Body
    g.fillStyle(col, 1);
    g.fillRect(x - W/2, y - H/2 + oy, W, H);
    // Top highlight strip
    g.fillStyle(_t(col, 60), 1);
    g.fillRect(x - W/2 + 5, y - H/2 + oy + 4, W - 10, 5);
    // Bottom shadow strip
    g.fillStyle(_t(col, -50), 1);
    g.fillRect(x - W/2 + 5, y + H/2 + oy - 9, W - 10, 5);
    // Outline
    g.lineStyle(3, 0x1a0900, 1);
    g.strokeRect(x - W/2, y - H/2 + oy, W, H);
  }
  draw('normal');

  var txt = scene.add.text(x, y, label, {
    fontFamily: 'Arial Black, Arial',
    fontSize:   fs,
    fontStyle:  'bold',
    color:      '#ffffff',
    stroke:     '#1a0900',
    strokeThickness: 4
  }).setOrigin(0.5).setScrollFactor(sf).setDepth(dp + 1);

  var zone = scene.add.zone(x, y, W, H).setInteractive()
                  .setScrollFactor(sf).setDepth(dp + 2);
  zone.on('pointerover',  function() { draw('over'); });
  zone.on('pointerout',   function() { draw('normal'); txt.setY(y); });
  zone.on('pointerdown',  function() { draw('down'); txt.setY(y + 4); onClick(); });
  zone.on('pointerup',    function() { draw('normal'); txt.setY(y); });
}
