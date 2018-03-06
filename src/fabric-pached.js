import fabric from 'fabric';

console.log(fabric);

fabric.Canvas.prototype.getPointer = function (e, ignoreZoom, upperCanvasEl) {
	if (!upperCanvasEl) {
		upperCanvasEl = this.upperCanvasEl;
	}

	//just get the offset of the actual point. No special calculation has to be done for scrolling etc.
	var pointer = {x: e.offsetX, y: e.offsetY},
		 bounds = (!this._upperCanvasBounds ? this._upperCanvasBounds = upperCanvasEl.getBoundingClientRect() : this._upperCanvasBounds),
		 boundsWidth = bounds.width || 0,
		 boundsHeight = bounds.height || 0,
		 cssScale;

	if (!boundsWidth || !boundsHeight) {
		if ('top' in bounds && 'bottom' in bounds) {
			boundsHeight = Math.abs(bounds.top - bounds.bottom);
		}
		if ('right' in bounds && 'left' in bounds) {
			boundsWidth = Math.abs(bounds.right - bounds.left);
		}
	}

	if (!ignoreZoom) {
		pointer = fabric.util.transformPoint(
			 pointer,
			 fabric.util.invertTransform(this.viewportTransform)
		);
	}

	if (boundsWidth === 0 || boundsHeight === 0) {
		// If bounds are not available (i.e. not visible), do not apply scale.
		cssScale = {width: 1, height: 1};
	}
	else {
		cssScale = {
			width: upperCanvasEl.width / boundsWidth,
			height: upperCanvasEl.height / boundsHeight
		};
	}

	return {
		x: pointer.x * cssScale.width,
		y: pointer.y * cssScale.height
	};
};

fabric.Canvas.prototype.__onMouseDown = function (e) {
	var isLeftClick = 'which' in e ? e.which === 1 : e.button === 0;
	var isRightClick = 'which' in e ? e.which === 3 : e.button === 2;
	if (!isLeftClick && !isRightClick && !fabric.isTouchSupported) {
		return;
	}

	if (this.isDrawingMode) {
		this._onMouseDownInDrawingMode(e);
		return;
	}

	// ignore if some object is being transformed at this moment
	if (this._currentTransform) {
		return;
	}

	var target = this.findTarget(e),
		 pointer = this.getPointer(e, true);

	// save pointer for check in __onMouseUp event
	this._previousPointer = pointer;

	var shouldRender = this._shouldRender(target, pointer),
		 shouldGroup = this._shouldGroup(e, target);

	if (this._shouldClearSelection(e, target)) {
		this._clearSelection(e, target, pointer);
	}
	else if (shouldGroup) {
		this._handleGrouping(e, target);
		target = this.getActiveGroup();
	}

	if (target) {
		if (target.selectable && (target.__corner || !shouldGroup)) {
			this._beforeTransform(e, target);
			this._setupCurrentTransform(e, target);
		}

		if (target !== this.getActiveGroup() && target !== this.getActiveObject()) {
			this.deactivateAll();
			target.selectable && this.setActiveObject(target, e);
		}
	}
	// we must renderAll so that active image is placed on the top canvas
	shouldRender && this.renderAll();

	if (isRightClick) {
		this.fire('mouse:right', {target: target, e: e});
		target && target.fire('mouseright', {e: e});
	} else {
		this.fire('mouse:down', {target: target, e: e});
		target && target.fire('mousedown', {e: e});
	}
};

module.export = fabric;
