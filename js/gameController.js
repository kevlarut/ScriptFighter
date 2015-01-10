var gameApp = angular.module('gameApp');

gameApp.controller('gameController', ['$scope', '$timeout', function($scope, $timeout) {

	$scope.lastUpdated = new Date();
		
	$scope.blanka = null;
	$scope.ryu = null;
	$scope.ryuPunch = null;
		
	$scope.draw = function() {
		
		var canvas = document.getElementById('gameCanvas');
		var context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		$scope.blanka.render(context);	
		$scope.ryu.render(context);		
	}
	
	$scope.detectCollision = function(spriteA, spriteB) {
		return spriteA.x + spriteA.width() >= spriteB.x && spriteA.x <= spriteB.x + spriteB.width();
	}
	
	$scope.keydown = function(event) {
		
		var x = $scope.ryu.x;
		var y = $scope.ryu.y;
		
		var KEY_LEFT = 37;
		var KEY_UP = 38;
		var KEY_RIGHT = 39;
		var KEY_DOWN = 40;
		var KEY_X = 88;
			
		switch (event.keyCode) {
			case KEY_LEFT:
				x -= 10;
				event.preventDefault();
				break;
			case KEY_RIGHT:
				x += 10;
				event.preventDefault();
				break;
			case KEY_X:
				$scope.punch($scope.ryu, $scope.blanka);
				event.preventDefault();
				break;			
		}
		
		$scope.ryu.x = x;
		$scope.ryu.y = y;
	};
	
	$scope.load = function() {
		$scope.blanka = new sprite('img/blanka.gif', 'img/blanka-reverse.gif', 120, 200);		
		$scope.blanka.idleWidth = 70;
		$scope.blanka.idleX = 0;
		$scope.blanka.idleY = 0;
		
		$scope.ryu = new sprite('img/ryu.gif', 'img/ryu.gif', 100, 10);
		$scope.ryu.idleWidth = 50;
		$scope.ryu.idleX = 0;
		$scope.ryu.idleY = 0;
		$scope.ryu.punchWidth = 75;
		$scope.ryu.punchY = 114;
		$scope.ryu.punchX = 167;
	}
	
	$scope.punch = function(attacker, defender) {
		attacker.setState('PUNCHING');
		if ($scope.detectCollision(attacker, defender)) {
			defender.health -= 5;
		}
	}
	
	$scope.runArtificialIntelligence = function() {
		if ($scope.blanka.x + $scope.blanka.width() > $scope.ryu.x && $scope.blanka.orientation == 'FORWARD' && !$scope.detectCollision($scope.ryu, $scope.blanka)) {
			$scope.blanka.orientation = 'BACKWARD';
		}
		else if ($scope.blanka.x < $scope.ryu.x + $scope.ryu.width() && $scope.blanka.orientation == 'BACKWARD' && !$scope.detectCollision($scope.ryu, $scope.blanka)) {
			$scope.blanka.orientation = 'FORWARD';
		}
	}
	
	$scope.update = function() {		
		var framesPerSecond = 10;
		
		var now = new Date();
		var timeSinceLastUpdate = now.getTime() - $scope.lastUpdated.getTime();
		
		$scope.draw();
		$scope.blanka.incrementFrame();
		$scope.ryu.incrementFrame();
		$scope.runArtificialIntelligence();
		
		$scope.lastUpdated = now;		
		$timeout($scope.update, 1000 / framesPerSecond);
	}
	
	$scope.load();
	$scope.update();
	
}]);