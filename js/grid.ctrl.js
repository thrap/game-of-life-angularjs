function GridCtrl($scope, $interval) {
    console.log(arguments)
    var SIZE = 100;
    $scope.board = [];

    function Cell(x, y, alive) {
        this.x = x;
        this.y = y;

        this.isAlive = alive;
    }

    for(var i = 0; i<SIZE; i++) {
        var row = [];
        for (var j=0; j<SIZE; j++) {
            row.push(new Cell(i, j, Math.random() > 0.5));
        }
        $scope.board.push(row);
    }

    var getIdx = function(i) {
        return (i+SIZE) % SIZE;
    }

    var aliveNext = function(x, y) {
        var count = 0;
        for(var i = -1; i<= 1; i++) {
            for (var j= -1; j<= 1; j++) {
                if (i == 0 && j == 0)
                    continue;
                count += $scope.board[getIdx(x+i)][getIdx(y+j)].isAlive ? 1 : 0;
            }
        }
        if ($scope.board[x][y].isAlive) {
            return count === 2 || count === 3;
        } else {
            return count === 3;
        }
    }

    var updateCells = function() {
        var board = [];
        for(var i = 0; i<SIZE; i++) {
            var row = [];
            for (var j=0; j<SIZE; j++) {
                row.push(new Cell(i, j, aliveNext(i, j)));
            }
            board.push(row);
        }
        $scope.board = board;
    }
    $interval(updateCells, 100);


}
