const $ = require('jquery');
require('webpack-jquery-ui');
require('webpack-jquery-ui/css');

import uid from 'uid';
import fabric from './fabric-pached';
import Menu from './modules/menu';
import DialogTable from './modules/dialog_table';


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

		this.menu = null;

		if (parent instanceof $) {
			this.$container = parent;
		} else {
			this.$container = $('#' + parent);
		}
	}

	/**
	 *
	 */
	render() {
		this._debug ? console.warn('render') : null;

		if (this.$container.length) {
			this.id = uid();

			this.$canvas = $('<canvas id="' + this.id + '"></canvas>');
			this.$container.append(this.$canvas);
			this.canvas = new fabric.Canvas(this.id);
			this.$canvas_container = this.$container.find('.canvas-container');

			$(window).resize(() => {
				this.setSizes();
			});

			var json = JSON.stringify(this.canvas);
			console.log(json);

		} else {
			console.error('parent not found!', parent);
		}

		this.setSizes();
	}


	/**
	 *
	 */
	setSizes() {
		this._debug ? console.warn('setSizes') : null;
		this.canvas.setWidth(this.$container.width());
		this.canvas.setHeight(this.$container.height());
	}

	/**
	 * sets the edit mode if true the menu is available and elements (seats/tables with seats) can be attached, moved, deleted, ...
	 * @param flag boolean
	 */
	setEditMode(flag) {
		this._debug ? console.warn('setEditMode', flag) : null;
		if (flag) {
			if (!this.menu) {
				this.menu = new Menu({'$container': this.$container});
				this.menu.events.on('create_table', () => {
					let dialog_table = new DialogTable();
				});
				this.$canvas_container.css({'top': this.menu.$container.height() + 'px'});
				this.canvas.setHeight(this.$container.height() - this.menu.$container.height());
			}
			console.log(this.menu);
		} else {

		}
	}
}

if (window !== 'undefined')
	window.rmSeatingtool = rmSeatingtool;


