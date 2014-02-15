var myApp = angular.module('loupGarouApp', ['gameFilters']);

var debug = true;

myApp.directive('draggable', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element[0].addEventListener('dragstart', scope.handleDragStart, false);
      element[0].addEventListener('dragend', scope.handleDragEnd, false);
    }
  }
});

myApp.directive('droppable', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element[0].addEventListener('drop', scope.handleDrop, false);
      element[0].addEventListener('dragover', scope.handleDragOver, false);
    }
  }
});


myApp.controller('gameController', function ($scope, $http) {
    $scope.players = [];
    $scope.nbPlayers = 1;
    $scope.allCards = [
        new Card("Paysan","images/carte1.png"),
        new Card("Paysan","images/carte2.png"),
        new Card("Paysan","images/carte3.png"),
        new Card("Paysan","images/carte4.png"),
        new Card("Paysan","images/carte5.png"),
        new Card("Paysan","images/carte6.png"),
        new Card("Paysan","images/carte7.png"),
        new Card("Paysan","images/carte8.png"),
        new Card("Paysan","images/carte9.png"),
        new Card("Paysan","images/carte10.png"),
        new Card("Paysan","images/carte11.png"),
        new Card("Paysan","images/carte12.png"),
        new Card("Paysan","images/carte13.png"),
        new Card("Paysan","images/carte14.png"),
        new Card("Paysan","images/carte15.png"),
        new Card("Paysan","images/carte16.png"),
        new Card("Paysan","images/carte17.png"),
        new Card("Paysan","images/carte19.png"),
        new Card("Paysan","images/carte20.png"),
        new Card("Paysan","images/carte21.png"),
        new Card("Paysan","images/carte22.png"),
    ];

    $scope.handleDragStart = function(e){
        this.style.opacity = '0.4';
        e.dataTransfer.setData('text/plain', this.dataset.cardindex);
    };
    
    $scope.handleDragEnd = function(e){
        this.style.opacity = '1.0';
    };
    
    $scope.handleDrop = function(e){
        e.preventDefault();
        e.stopPropagation();
        var dataText = e.dataTransfer.getData('text/plain');
        var iCard = parseInt(dataText);
        var iPlayer = parseInt(this.dataset.playerindex);
        $scope.$apply(function() {
            $scope.players[iPlayer].card = $scope.allCards[iCard];
        });
        console.log($scope.items);
    };
    
    $scope.handleDragOver = function (e) {
        e.preventDefault(); // Necessary. Allows us to drop.
        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
        return false;
  };

    $scope.$on('dataloaded', function () {
        setTimeout(function () {
            
        }, 0, false);
    });

    $scope.requestTypes = function () {
        $http.get($scope.pathToGenFile).success(function (pkmTypes) {
            var nbType = pkmTypes.length;
            $scope.history = [];
            $scope.pkmTypes = pkmTypes;
            $scope.generateType();
        }).
        error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert('Generation file not found');
        });
    }

    $scope.calcPlayer = function()
    {
        $scope.players = [];
        var container = $('#playerSection');
        var n = $scope.nbPlayers;
        var width = parseInt(container.css('width'),10);
        var r = width*0.4;
        var s = width*0.1;

        var arc = (2*Math.PI*r/n);
        var oblique = 1.4142135623*s;  //sqrt(2)
        if( arc < oblique+5 )
        {
            s = Math.round((arc-1)/1.4142135623);
        }

        var translation = width/2-$scope.seatSize/2;

        for (var i = 0; i < n; i++) {
            var angle = 2 * Math.PI * i / n - Math.PI/2;
            var x = Math.round(r * Math.cos(angle) + translation);
            var y = Math.round(r * Math.sin(angle) + translation);
            var p = {
                x:x,
                y:y,
                style: "width:{0}px;height:{0}px;left:{1}px;top:{2}px;".format(s,x,y),
                card:null,
            };

            $scope.players.push(p);
        }
        $scope.seatSize = s;
    };

    $scope.calcPlayer();
});