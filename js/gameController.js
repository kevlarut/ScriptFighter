var gameApp = angular.module('gameApp');

gameApp.controller('gameController', ['$scope', '$timeout', function($scope, $timeout) {

	$scope.lastUpdated = new Date();
		
	$scope.blanka = null;
	$scope.ryu = null;
		
	$scope.draw = function() {
		
		var canvas = document.getElementById('gameCanvas');
		var context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		$scope.blanka.render(context);	
		$scope.ryu.render(context);		
	}
	
	$scope.keydown = function(event) {
		
		var x = $scope.ryu.positionX;
		var y = $scope.ryu.positionY;
		
		var KEY_LEFT = 37;
		var KEY_UP = 38;
		var KEY_RIGHT = 39;
		var KEY_DOWN = 40;
			
		switch (event.keyCode) {
			case KEY_LEFT:
				x -= 10;
				event.preventDefault();
				break;
			case KEY_RIGHT:
				x += 10;
				event.preventDefault();
				break;
		}
		
		$scope.ryu.positionX = x;
		$scope.ryu.positionY = y;
	};
	
	$scope.load = function() {
		$scope.blanka = new sprite('img/blanka.gif', 70, 120, 200);
		$scope.ryu = new sprite('img/ryu.gif', 50, 100, 10);
	}
	
	$scope.update = function() {		
		var framesPerSecond = 10;
		
		var now = new Date();
		var timeSinceLastUpdate = now.getTime() - $scope.lastUpdated.getTime();
		
		$scope.draw();
		$scope.blanka.incrementFrame();
		$scope.ryu.incrementFrame();
		
		$scope.lastUpdated = now;		
		$timeout($scope.update, 1000 / framesPerSecond);
	}
	
	$scope.load();
	$scope.update();
	
}]);