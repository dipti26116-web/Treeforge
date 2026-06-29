// Touchscreen Engine for Samsung Tab S8
const TouchControls = {
  move: { f: false, b: false, l: false, r: false, up: false },
  container: null,

  init: function() {
    const viewport = document.getElementById('viewport');
    if (!viewport || this.container) return;

    this.container = document.createElement('div');
    this.container.style.cssText = 'position:absolute; bottom:20px; left:20px; z-index:20; display:flex; gap:10px; flex-wrap:wrap; width:160px;';

    const buttons = [
      { label: 'W', key: 'f' },
      { label: 'A', key: 'l' },
      { label: 'S', key: 'b' },
      { label: 'D', key: 'r' },
      { label: 'UP', key: 'up' }
    ];

    buttons.forEach(btn => {
      const b = document.createElement('button');
      b.innerText = btn.label;
      b.style.cssText = 'width:60px; height:60px; background:rgba(0,0,0,0.5); border:2px solid #f80; color:white; border-radius:8px; font-weight:bold; touch-action:manipulation;';

      b.addEventListener('pointerdown', () => { this.move[btn.key] = true; });
      b.addEventListener('pointerup', () => { this.move[btn.key] = false; });
      b.addEventListener('pointerleave', () => { this.move[btn.key] = false; });
      b.addEventListener('pointercancel', () => { this.move[btn.key] = false; });
      this.container.appendChild(b);
    });

    viewport.appendChild(this.container);
  },

  applyToEngine: function(moveObj) {
    if (!moveObj) return;
    Object.assign(moveObj, this.move);
  }
};

window.TouchControls = TouchControls;

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => TouchControls.init(), 200);
});