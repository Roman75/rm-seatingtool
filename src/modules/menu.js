import _ from 'lodash';

export default class Menu {
	constructor(config) {
		this.config = config;

		this._debug = true;
		this._debug ? console.warn('constructor', this.config) : null;

		$('body').click(() => {
			this._showMenu();
		});

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
		this._renderMenuSettings();
		this._showMenu();
	}

	_renderMenu() {
		this.$menu = $('<div></div>');
		this.$container.append(this.$menu);
	}

	_renderMenuSettings() {
		let $menuSetttingsButton = $('<button id="menu">settings</button>');
		this.$menu.append($menuSetttingsButton);

		$menuSetttingsButton.button();
		$menuSetttingsButton.click((event) => {
			event.stopPropagation();
			(this._menusOpen != 'settings') ? this._showMenu('settings') : this._showMenu();
		});

		//this._menus.settings = $('<ul id="menu" style="width:120px"> <li class="ui-state-disabled"><div>Toys (n/a)</div></li> <li><div>Books</div></li> <li><div>Clothing</div></li> <li><div>Electronics</div> <ul> <li class="ui-state-disabled"><div>Home Entertainment</div></li> <li><div>Car Hifi</div></li> <li><div>Utilities</div></li> </ul> </li> <li><div>Movies</div></li> <li><div>Music</div> <ul> <li><div>Rock</div> <ul> <li><div>Alternative</div></li> <li><div>Classic</div></li> </ul> </li> <li><div>Jazz</div> <ul> <li><div>Freejazz</div></li> <li><div>Big Band</div></li> <li><div>Modern</div></li> </ul> </li> <li><div>Pop</div></li> </ul> </li> <li class="ui-state-disabled"><div>Specials (n/a)</div></li> </ul>').menu();
		this._menus.settings = $('<ul id="menuSettings"></ul>');
		const refresh = $('<li><div>refresh</div></li>');
		this._menus.settings.append(refresh);
		const addTable = $('<li><div>add table</div></li>');
		this._menus.settings.append(addTable);

		this._menus.settings.menu();
		this.$menu.append(this._menus.settings);
	}

	_showMenu(id = false) {
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