import Ember from 'ember';
import PIXI from 'pixi';

const {
  Component,
  computed
} = Ember;

export default Component.extend({

  height: computed('height', {
    get() { return 600; },
    set(key, value) {
      this.resizePixiRenderer(this.get('width'), value);
      return value;
    }
  }),

  width: computed('width', {
    get() { return 800; },
    set(key, value) {
      this.resizePixiRenderer(value, this.get('height'));
      return value;
    }
  }),

  pixiRenderer: computed(function() {
    let { width, height } = this.getProperties('width', 'height');

    return PIXI.autoDetectRenderer(width, height);
  }),


  didReceiveAttrs() {
    let width = this.getAttr('width');
    let height = this.getAttr('height');

    this.setProperties({ width, height });
  },

  willDestroyElement() {
    this.get('pixiRenderer').destroy();
  },

  willUpdate() {
    let currentCanvas = this.get('_currentCanvas');

    this.$().children(currentCanvas).remove();
  },

  didRender() {
    let renderer = this.get('pixiRenderer');
    let currentCanvas = renderer.view;

    this.set('_currentCanvas', currentCanvas);
    this.$().append(currentCanvas);

    this.draw();
  },

  draw() {},

  resizePixiRenderer(width, height) {
    this.get('pixiRenderer').resize(width, height);
  },
});
