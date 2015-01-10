var sprite = function(src, width, height, positionX) {

	var image = new Image();
	image.src = src;		
	this.image = image;
	
	this.height = height;
	this.width = width;	
	this.currentFrame = 1;
	this.maxFrame = 4;
	this.positionX = positionX;
	this.positionY = 140 - height;
	
	this.incrementFrame = function() {
	
		this.currentFrame++;
		if (this.currentFrame > this.maxFrame) {
			this.currentFrame = 1;
		}
	}
	
	this.render = function(context) {		
		var height = this.height;
		var width = this.width;
		var sourceX = 0 + width * (this.currentFrame - 1);
		var sourceY = 0;
		
		context.drawImage(this.image, sourceX, sourceY, width, height, this.positionX, this.positionY, width, height);
	}
}