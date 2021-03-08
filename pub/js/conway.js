"use strict";

// Current version specifications:
// Cell pixel dimensions: 20 by 20 px
// Grid width: 2px
// Board dimensions: 24 by 24 cells
// Canvas height/width: 526 by 526 px
(function(global, document, $){
    function Conway (canvasID) {
        this.canvas = document.getElementById(canvasID)
        this.ctx = this.canvas.getContext("2d");
        // Overriding the canvas's height and width; will support other canvas sizes at a later date.
        // Maybe create the canvas ourselves?
        this.canvas.width = 528;
        this.canvas.height = 528;
        this.canvas.style.width = 528 + "px";
        this.canvas.style.height = 528 + "px";
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
                let neighborArray = [
                    this.cellarray[top][left],         
                    this.cellarray[top][x],
                    this.cellarray[top][right], 
                    this.cellarray[y][left], 
                    this.cellarray[y][right], 
                    this.cellarray[bottom][left], 
                    this.cellarray[bottom][x], 
                    this.cellarray[bottom][right]
                ];
                
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
            this.updatecell(x, y);
        },
        // removes a cell at position (x, y)
        removecell : function (x, y) {
            this.cellarray[y][x] = 0;
            this.updatecell(x, y);
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

            // Draw grid

            //
        },
        // visually updates a single cell to represet that cell's current state
        // takes in x and y coordinates from the cell array, not pixels
        // TODO: make this private
        updatecell : function (x, y) {
            let colour = "";
            if(this.cellarray[x,y] == 0){
                colour = "#f2f2f2"
                colour = "#fc3903"
            } else {
                colour = "#fc3903"
            }

            this.ctx.colour = colour;
            //+2 accounts for edges, x * 22 is border width + cell width
            this.ctx.fillRect(2 + x * 22, 2 + y * 22, 20, 20);

        },
        // draws a grid on the canvas
        drawgrid : function () {
            let gridwidth = 2;
            let cellwidth = 20;
            let cellheight = 20;
            this.ctx.strokeStyle = "#d090d6";
            this.ctx.lineWidth = 2;
            
            for (let i = 1; i <= this.canvas.height; i += (this.canvas.height - 2)/(24.0)) {
                this.ctx.moveTo(0, i);
                this.ctx.lineTo(this.canvas.width - 1, i);         
            }
            
            for (let i = 0; i <= this.canvas.width; i += (this.canvas.width - 2)/(24.0)) {
                this.ctx.moveTo(i + 1, 0);
                this.ctx.lineTo(i + 1, this.canvas.height - 1);   
            }
            
            this.ctx.stroke();
    
        }
    }
    global.Conway = global.Conway || Conway
})(window, window.document, $);