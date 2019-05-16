const Grid = require('./grid.js');
// es6添加默认值
function GameManager(size, startTiles = 2) {
    this.size = size;
    this.startTiles = startTiles;
}
GameManager.prototype = {
    setup: function() {
        this.grid = new Grid(this.size);
        // 随机添加方块
        this.addStartTiles();
        return this.grid.cells;
    },
    addStartTiles: function() {
        // 有几块就调用几次
        for(let i = 0; i < this.startTiles; i ++) {
            this.addRandomTiles();
        }
    },
    addRandomTiles: function() {
        // 添加方块
        // 位置随机，
        // 数值随机
        // 90%几率是2
        const value = Math.random() < 0.9 ? 2 : 4;
        // grid 有数据  知道 哪些数据是空的
        const position = this.grad.randomAvailableCell();
    }
}
// 
module.exports = GameManager;