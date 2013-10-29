
// Paul Irish's shim for requestAnimationFrame
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame 		||
		   window.webkitRequestAnimationFrame 	||
		   window.mozRequestAnimationFrame		||
		   function (callback) {
		   	window.setTimeout(callback, 1000 / 60);	// 60 fps
		   };
})();

/* Graphics utilities */
var Graphics = function(clock) {
	this.ctx = clock.canvas.getContext('2d');
	this.width = clock.width;
	this.height = clock.height;
	this.ox = this.width / 2;		// origin x
	this.oy = this.height / 2;		// origin y
	this.TWO_PI = Math.PI * 2;		// optimization
	
	// gradient paint
	this.gradient = this.ctx.createRadialGradient(this.ox, this.oy, 170, this.ox, this.oy, 600); 
	//this.ctx.createLinearGradient(0, 0, this.width, this.height);
	this.gradient.addColorStop(0, 'silver');	// light
	this.gradient.addColorStop(1, 'gray');		// dark
};

Graphics.prototype.drawArc = function (r, startAngle, endAngle, w, color) {
	this.ctx.beginPath();
	this.ctx.arc(this.ox, this.oy, r, startAngle, endAngle, false);
	this.ctx.lineWidth = w;
	this.ctx.strokeStyle = color;
	this.ctx.stroke();
};

Graphics.prototype.fillCircle = function (w, color) {
	this.ctx.beginPath();
	this.ctx.arc(this.ox, this.oy, 1, 0, this.TWO_PI, false);
	this.ctx.lineWidth = w;
	this.ctx.strokeStyle = color;
	this.ctx.stroke();
};

Graphics.prototype.fillRect = function (w, color) {
	this.ctx.fillStyle = color;
	this.ctx.fillRect(this.ox - w, this.oy - w, w, w);
};

Graphics.prototype.centerText = function (string, font, color, y) {
	this.ctx.font = font;
	this.ctx.fillStyle = color;
	this.ctx.textAlign = 'center';
	this.ctx.fillText(string, this.ox, this.oy + y);
};

Graphics.prototype.clear = function () {
	this.ctx.fillStyle = this.gradient;
	this.ctx.fillRect(0, 0, this.width, this.height);
};


/* The Clock */
var Clock = function (canvas) {
	this.canvas = canvas;
	this.width = window.innerWidth || document.clientWidth;
	this.height = window.innerHeight || document.clientHeight;
	
	// resize canvas to fill viewport
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	this.canvas.style.width = this.width;
	this.canvas.style.height = this.height;
	
	// init graphics
	this.gfx = new Graphics(this);
	
	// common precomputed values for optimization
	this.startAngle = 1.5 * Math.PI;
	this.haFactor = 30 * Math.PI / 180 / 3600;	// hour angle factor
	this.maFactor = 6 * Math.PI / 180 / 60;		// math angle factor
	this.saFactor = 6 * Math.PI / 180 / 1000;	// second angle factor (millisecond)
	this.fpsFactor = 2 * Math.PI / 65;			// assume FPS < 60
	
	this.loop();
};

Clock.prototype.loop = function () {
	// run animayion loop
	var _this = this;
	function _loop() {
		requestAnimFrame(_loop);
		_this.render();
	}
	_loop();
};

Clock.prototype.render = function () {
	var date = new Date();
	var mer = 'AM';	// AM or PM
	this.h = date.getHours();
	var dh = this.h;
	if (this.h > 12) {
		dh -= 12;
	}
	
	if (this.h >= 12) {
		this.h -= 12;
		mer = 'PM';
	}
	
	this.m = date.getMinutes();
	this.s = date.getSeconds();
	this.ms = date.getMilliseconds();
	
	// calculate accurate angles precise to the nearest second
	var ha = this.startAngle + (this.h * 3600 + this.s) * this.haFactor;
	var ma = this.startAngle + (this.m * 60 + this.s) * this.maFactor;
	var sa = this.startAngle + (this.s * 1000 + this.ms) * this.saFactor;
	
	// animate during transition from 59 to 0
	if (this.s == 59) {
		this.secStartAngle += this.fpsFactor;	// accelerate animation to complete in 1 second
	}else {
		this.secStartAngle = this.startAngle;
	}
	
	if (this.s == 59 && this.m == 59) {
		this.minStartAngle += this.fpsFactor;
	}else {
		this.minStartAngle = this.startAngle;
	}
	
	if (this.s == 59 && this.m == 59 && this.h == 11) {
		this.hrStartAngle += this.fpsFactor;
	}else {
		this.hrStartAngle = this.startAngle;
	}
	
	this.gfx.clear();
	this.gfx.drawArc(75, this.hrStartAngle, ha, 17, 'rgb(0,0,0)');			// hour arc
	this.gfx.drawArc(105, this.minStartAngle, ma, 20, 'rgb(50,50,50)');		// minute arc
	this.gfx.drawArc(135, this.secStartAngle, sa, 15, 'rgb(100,100,100)');	// second arc
	
	// center decoration
	this.gfx.fillCircle(65, 'rgb(241,196,15)');
	this.gfx.fillRect(33.5, 'rgb(241,196,15)');
	
	// show time as text
	this.gfx.centerText(this.pad(dh) + ':' + 
		this.pad(this.m) + ':' + 
		this.pad(this.s) + ' ' + mer, 
		'72px Arial', '#222', 230);
};

Clock.prototype.pad = function (d) {
	if (d < 10) {
		return '0' + d;
	}
	return d;
};


/* Application */
var app = app || {};

app.clock = null;

app.init = function () {
	app.clock = null;
	app.clock = new Clock(document.getElementById('clock'));
};

window.onload = function () {
	app.init();
};

