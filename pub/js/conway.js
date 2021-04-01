"use strict";

// Current version specifications:
// Cell pixel dimensions: 20 by 20 px
// Grid width: 2px
// Board dimensions: 24 by 24 cells
// Canvas height/width: 530 by 530 px
(function(global, document, $){
    function Conway (canvasID) {
        this.canvas = document.getElementById(canvasID)
        this.ctx = this.canvas.getContext("2d");
        
        // Overriding the canvas's height and width; will support other canvas sizes at a later date.
        // Maybe create the canvas ourselves?
        this.canvas.width = 530;
        this.canvas.height = 530;
        this.canvas.style.width = 530 + "px";
        this.canvas.style.height = 530 + "px";
        this.cellheight = 24;
        this.cellwidth = 24;
        this.cellarray = new Array(this.cellheight);
        
        this.cellarray = new Array(24).fill(0).map(() => new Array(24).fill(0));

    }

    Conway.prototype = {
        initCanvas : function () {
            let canvasHeight = this.canvas.height
            let canvasWidth = this.canvas.width
            function updateOnClick(event){
                let x = event.offsetX;
                let y = event.offsetY;
                
                let outputX;
                let outputY;
                if(x >= 2 && y >= 2){
                    x -= 2
                    y -= 2
                    outputX = Math.floor(x/((canvasWidth - 2)/24.0))
                    outputY = Math.floor(y/((canvasHeight - 2)/24.0))
                    
                    console.log(this.cellarray[outputY][outputX])


                    if(this.cellarray[outputY][outputX] == 0){
                        this.cellarray[outputY][outputX] = 1
                    } else {
                        this.cellarray[outputY][outputX] = 0
                    }
                    
                    this.updatecell(outputY, outputX);
                }
                
            }
            this.canvas.addEventListener('click', updateOnClick.bind(this), false)
        },
        // steps through one step of the game, updating the values of each cell and calls updatecell on each changed cell
        step : function () {
            // this returns the live number of neighbors for the cell at cellarray[y][x]
            function checkneighbors(y, x){
                let top = y - 1;
                let bottom = y + 1;
                let left = x - 1;
                let right = x + 1;
                if(top < 0){
                    top = 23;
                }
                if(bottom > 23){
                    bottom = 0;
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

            let liveNeighbors = checkneighbors.bind(this);

            let updatedCopy = new Array(24).fill(0).map(() => new Array(24).fill(0));
            
            for(let i = 0; i < this.cellheight; i++){
                for(let j = 0; j < this.cellwidth; j++){
                    let ln = liveNeighbors(i, j);
                    if(this.cellarray[i][j] == 0 && ln == 3){
                        updatedCopy[i][j] = 1;               
                    } else if(this.cellarray[i][j] == 0 && ln != 3){
                        updatedCopy[i][j] = 0;
                    } else if((this.cellarray[i][j] == 1 && ln == 2) || (this.cellarray[i][j] == 1 && ln == 3)){
                        updatedCopy[i][j] = 1;
                    }else if(!((this.cellarray[i][j] == 1 && ln == 2) || (this.cellarray[i][j] == 1 && ln == 3))){
                        updatedCopy[i][j] = 0;   
                    }
                    
                }
            }

            this.cellarray = updatedCopy;

            for(let i = 0; i < this.cellheight; i++){
                for(let j = 0; j < this.cellwidth; j++){
                    this.updatecell(i, j);
                }
            }
            
        },

        // steps through the game until endgame is called
        startgame : function () {
            this.runningThread = setInterval(this.step.bind(this), 200)
        },
        // stops stepping through the game if startgame was called in the past
        endgame : function () {
            clearInterval(this.runningThread)
        },
        
        // resets all cells on the board to be empty
        resetboard : function () {
            this.cellarray = new Array(24).fill(0).map(() => new Array(24).fill(0));

            for (let i = 0; i < this.cellheight; i++) {
                for (let j = 0; j < this.cellwidth; j++) {
                    this.updatecell(i,j);
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
        updatecell : function (y, x) {
            let colour = "";
            if(this.cellarray[y][x] == 1){
                colour = "#fc3903"
            } else { 
                colour = "#f2f2f2"
            }

            this.ctx.fillStyle = colour;
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