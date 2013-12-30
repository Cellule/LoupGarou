var myApp = angular.module('loupGarouApp', ['gameFilters']);

var debug = true;

myApp.controller('gameController', function ($scope, $http) {
    $scope.players = [];
    $scope.nbPlayers = 1;

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
        $scope.seatSize = width*0.1;
        var translation = width/2-$scope.seatSize/2;
        r = width*0.4;
        for (var i = 0; i < n; i++) {
            var angle = 2 * Math.PI * i / n;
            var x = Math.round(r * Math.cos(angle) + translation);
            var y = Math.round(r * Math.sin(angle) + translation);
            var p = {
                x:x,
                y:y,
                style: "width:{0}px;height:{0}px;left:{1}px;top:{2}px;".format($scope.seatSize,x,y)
            };

            $scope.players.push(p);
        }
    };

    $scope.calcPlayer();
});