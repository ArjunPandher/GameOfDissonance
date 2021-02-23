"use strict";

(function(global, document, $){
    function Conway (canvasID) {
        this.canvas = document.getElementById(canvasID)
        this.cellheight = 24;
        this.cellwidth = 24;
        this.cellarray = new Array(this.cellheight);
        for (let i = 0; i < this.cellheight; i++) {
            this.cellarray[i] = new Array(this.cellwidth)
            for (let j = 0; j < this.cellwidth; j++) {
                this.cellarray[i][j] = 0;
            }
        }
    }

    Conway.prototype = {
        // steps through one step of the game, updating the values of each cell and calls updatecell on each changed cell
        step : function () {
            // this returns the live number of neighbors for the cell at cellarray[y][x]
            function checkneighbors(y, x){
                let top = y - 1;
                let bottom = y + 1;
                let left = x - 1;
                let right = x + 1;
                if(top > 23){
                    top = 0;
                }
                if(bottom < 0){
                    bottom = 23;
                }
                if(left < 0){
                    left = 23;
                }
                if(right > 23){
                    right = 0;
                }
                let neighborArray = [this.cellarray[top][left], 
                                     this.cellarray[top][x],
                                     this.cellarray[top][right], 
                                     this.cellarray[y][left], 
                                     this.cellarray[y][right], 
                                     this.cellarray[bottom][left], 
                                     this.cellarray[bottom][x], 
                                     this.cellarray[bottom][right]];
                
                let liveCount = 0;
                let c = 0;

                while(liveCount < 4 && c < 8){
                    if(neighborArray[c] == 1){
                        liveCount++;
                    }
                    c++;
                }

                return liveCount;
            }

            for(let i = 0; i < this.cellheight; i++){
                for(let j = 0; j < this.cellwidth; j++){
                    let liveNeighbors = checkneighbors(i, j);
                    if(this.cellarray[i][j] == 0 && liveNeighbors == 3){
                        this.cellarray[i][j] = 1;
                        this.updatecell(j, i);
                        break;
                    }
                    if(!((this.cellarray[i][j] == 1 && liveNeighbors == 2) || (this.cellarray[i][j] == 1 && liveNeighbors == 3))){
                        this.cellarray[i][j] = 0;
                        this.updatecell(j, i);
                        break;
                    }
                    
                }
            }

        },

        

        // steps through x steps of the game
        stepx : function (x) {
            for (let i = 0; i < x; i++) {
                this.step();
            }
        },
        // steps through the game until stopgame is called
        startgame : function () {

        },
        // stops stepping through the game if startgame was called in the past
        endgame : function () {

        },
        // adds a cell at position (x, y)
        addcell : function (x, y) {
            this.cellarray[y][x] = 1;
            // TODO: change board to reflect this
        },
        // removes a cell at position (x, y)
        removecell : function (x, y) {
            this.cellarray[y][x] = 0;
            // TODO: change board to reflect this
        },
        // resets all cells on the board to be empty
        resetboard : function () {
            this.cellarray = new Array(this.cellheight);
            for (let i = 0; i < this.cellheight; i++) {
                this.cellarray[i] = new Array(this.cellwidth)
                for (let j = 0; j < this.cellwidth; j++) {
                    this.cellarray[i][j] = 0;
                }
            }
            // TODO: change board to reflect this
        },
        // visually updates the board to represent current cell data
        updateboard : function () {
            // TODO: this
        },
        // visually updates a single cell to represet that cell's current state
        // TODO: make this private
        updatecell : function (x, y) {
            // TODO: this
        }
    }
})(window, window.document, $);