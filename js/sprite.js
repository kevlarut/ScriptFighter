var sprite = function(src, reverseSrc, height, positionX) {

	var image = new Image();
	image.src = src;		
	this.image = image;
	
	var reverseImage = new Image();
	reverseImage.src = reverseSrc;		
	this.reverseImage = reverseImage;
	
	this.orientation = 'FORWARD';
	this.health = 100;
	this.height = height;
	this.currentFrame = 1;
	this.x = positionX;
	this.y = 140 - height;
	
	this.idleX = 0;
	this.idleY = 0;
	this.idleWidth = 0;
	this.punchX = 0;
	this.punchY = 0;
	this.punchWidth = 0;
	
	this.currentState = 'IDLE';
	
	this.maxFrame = function() {
		switch (this.currentState) {
			case 'PUNCHING':
				return 5;
				break;
			default:
				return 4;
				break;
		}
	}
	
	this.sourceX = function() {
		switch (this.currentState) {
			case 'PUNCHING':
				return this.punchX;
				break;
			default:
				return this.idleX;
				break;
		}		
	}
	
	this.sourceY = function() {
		switch (this.currentState) {
			case 'PUNCHING':
				return this.punchY;
				break;
			default:
				return this.idleY;
				break;
		}		
	}
	
	this.width = function() {
		switch (this.currentState) {
			case 'PUNCHING':
				return this.punchWidth;
				break;
			default:
				return this.idleWidth;
				break;
		}		
	}
	
	this.incrementFrame = function() {	
		this.currentFrame++;
		if (this.currentFrame > this.maxFrame()) {
			this.setState('IDLE');
		}
	}
	
	this.setState = function(state) {
		this.currentFrame = 1;
		this.currentState = state;
	}
	
	this.render = function(context) {		
		var height = this.height;
		var width = this.width();
		var sourceX = this.sourceX() + width * (this.currentFrame - 1);
		var sourceY = this.sourceY();
				
		var image = this.image;
		if (this.orientation === 'BACKWARD') {
			image = this.reverseImage;
		}
		
		context.drawImage(image, sourceX, sourceY, width, height, this.x, this.y, width, height);
	}
}