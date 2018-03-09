import {EventEmitter2} from 'eventemitter2';

export default class Events {
	constructor() {
		const Emitter = new EventEmitter2({
			wildcard: true,
			delimiter: '::',
			newListener: false,
			maxListeners: 20,
			verboseMemoryLeak: false
		});

		return Emitter;
	}
}