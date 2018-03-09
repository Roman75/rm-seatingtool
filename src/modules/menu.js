import _ from 'lodash';
import Events from './events';

export default class Menu {
	constructor(config) {
		this.config = config;

		this._debug = true;
		this._debug ? console.warn('constructor', this.config) : null;

		$('body').click(() => {
			this._showMenu();
		});

		this.events = new Events();

		this._structure = {
			'settings': {
				'button': {
					'label': 'settings'
				},
				'items': [
					{'label': 'create seat ..', 'event': 'create_seat'},
					{'label': 'create table ..', 'event': 'create_table'},
					{'label': 'create floor ..', 'event': 'create_floor'}
				]
			}
		};

		this._menus = {};
		this._menusOpen = false;

		this.$container = $('<div class="menu"></div>');
		this.$container.css({
			'position': 'absolute',
			'top': '0px',
			'left': '0px',
			'height': '34px'
		});
		this.config.$container.append(this.$container);

		this._renderMenu();
		this._showMenu();
	}

	_renderMenu() {
		this.$menu = $('<div></div>');
		this.$container.append(this.$menu);

		_.each(this._structure, (main_item, main_index) => {
			main_item.button = $('<button id="menu">settings</button>');
			main_item.button.button();
			main_item.button.click((event) => {
				event.stopPropagation();
				(this._menusOpen != main_index) ? this._showMenu(main_index) : this._showMenu();
			});
			this.$menu.append(main_item.button);

			this._menus[main_index] = $('<ul id="menuSettings"></ul>');
			_.each(main_item.items, (item, index) => {
				item.menu = $('<li><div>' + item.label + '</div></li>').on('click', () => {
					this.events.emit(item.event);
				});
				this._menus[main_index].append(item.menu);
			});
			this.$menu.append(this._menus[main_index]);
			this._menus[main_index].menu();
		});
	}

	_showMenu(id = false) {
		console.log(id);
		_.each(this._menus, (item) => {
			item.hide();
		});
		id ? this._menus[id].show() : null;
		this._menusOpen = id;
	}

	show() {

	}

	hide() {

	}
}