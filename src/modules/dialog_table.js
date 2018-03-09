import _ from 'lodash';
import fabric from './../fabric-pached';
import uid from 'uid';


export default class DialogTable {
	constructor() {

		this._debug = true;
		this._debug ? console.warn('constructor', this.config) : null;

		this.id = uid();

		this.$dialog = $('<div id="dialog" title="Basic dialog">\n' +
			 '  <p>This is the default dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the \'x\' icon.</p>\n' +
			 '</div>');
		this.$canvas = $('<canvas id="' + this.id + '"></canvas>');
		this.$dialog.append(this.$canvas);


		$('body').append(this.$dialog);
		this.$dialog.dialog({
			height: 400,
			width: 350,
			modal: true,
			buttons: {
				Cancel: () => {
					dialog.dialog("close");
				}
			},
			close: () => {
				console.log("close");
				this.$dialog.remove();
			}
		});

		this.canvas = new fabric.Canvas(this.id);

	}
}
