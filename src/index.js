import $ from 'jquery';
import uid from 'uid';
import fabric from 'fabric';

/**
 *
 */
class rmSeatingtool {

	/**
	 * Constructor
	 * @param parent string|object container for the seatingtool if string it must be a valid domId | if object it must be a jQuery Object!
	 */
	constructor(parent) {
		this._debug = true;
		this._debug ? console.warn('constructor', parent) : null;

		if (parent instanceof $) {
			this.$container = parent;
		} else {
			this.$container = $('#' + parent);
		}
	}

	render() {
		this._debug ? console.warn('render') : null;

		if (this.$container.length) {
			this.id = uid();
			this.$canvas = $('<canvas id="' + this.id + '"></canvas>');
			this.$container.append(this.$canvas);
			this.canvas = new fabric.Canvas(this.id);
		} else {
			console.error('parent not found!', parent);
		}

		this.setSizes();
	}

	setSizes() {
		this._debug ? console.warn('setSizes') : null;
		this.canvas.setWidth(this.$container.width());
		this.canvas.setHeight(this.$container.height());
	}
}

/**
 * only for dev => usage example
 */
$(function () {
	const demo1 = new rmSeatingtool($('#seatingtool1'));
	demo1.render();

	//const demo2 = new rmSeatingtool($('#seatingtool2'));
	//demo2.render();
});

