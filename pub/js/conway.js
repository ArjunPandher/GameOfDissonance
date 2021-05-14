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
        this.running = false;
        this.canvas.width = 552;
        this.canvas.height = 552;
        this.canvas.style.width = 552 + "px";
        this.canvas.style.height = 552 + "px";
        this.numcellsx = 25.0;
        this.numcellsy = 25.0;
        this.borderwidth = 2;
        this.cellwidth = 20;    
        // this.cellwidth =  Math.floor((this.canvas.height - this.borderwidth)/(this.numcellsx))
        this.cellheight = 20;   
        // this.cellheight = Math.floor((this.canvas.width - this.borderwidth)/(this.numcellsy))
        
        
        this.cellarray = new Array(this.numcellsy).fill(0).map(() => new Array(this.numcellsx).fill(0));

        this.audiocontext = new AudioContext();
        
        this.oscarray = new Array(25);
        this.gainarray = new Array(25);

        this.maxgain = 2;
        
        for(let i = 0; i < 25; i++){
            let osc = this.audiocontext.createOscillator();
            osc.type = "sine";
            this.oscarray[i] = osc;

            let gain = this.audiocontext.createGain();
            gain.gain.exponentialRampToValueAtTime(
                0.0001, this.audiocontext.currentTime + 0.002
            );
            this.gainarray[i] = gain;

            osc.connect(gain);
            gain.connect(this.audiocontext.destination);
        }
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
                    outputX = Math.floor(x/((canvasWidth - 2)/this.numcellsx))
                    outputY = Math.floor(y/((canvasHeight - 2)/this.numcellsy))

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
                    top = this.numcellsy - 1;
                }
                if(bottom > this.numcellsy - 1){
                    bottom = 0;
                }
                if(left < 0){
                    left = this.numcellsx - 1;
                }
                if(right > this.numcellsx - 1){
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

            let updatedCopy = new Array(this.numcellsy).fill(0).map(() => new Array(this.numcellsx).fill(0));
            
            for(let i = 0; i < this.numcellsy; i++){
                for(let j = 0; j < this.numcellsx; j++){
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

            this.updateboard();
            
        },

        // steps through the game until endgame is called
        startgame : function () {
            if(!this.running){
                this.running = true;
                this.runningThread = setInterval(this.step.bind(this), 200)
            }
        },
        
        // stops stepping through the game if startgame was called in the past
        endgame : function () {
            this.running = false;
            clearInterval(this.runningThread)
        },
        
        // resets all cells on the board to be empty
        resetboard : function () {
            if(this.running){
                this.endgame()
            }
            
            this.cellarray = new Array(this.numcellsy).fill(0).map(() => new Array(this.numcellsx).fill(0));

            this.updateboard();
        },
        // visually updates the board to represent current cell data
        updateboard : function () {
            for(let i = 0; i < this.numcellsy; i++){
                for(let j = 0; j < this.numcellsx; j++){
                    this.updatecell(i, j);
                }
            }
        },
        // visually updates a single cell to represet that cell's current state
        // takes in x and y coordinates from the cell array, not pixels
        updatecell : function (y, x) {
            let colour = "";
            if(this.cellarray[y][x] == 1){
                colour = "#fc3903"
            } else { 
                colour = "#f2f2f2"
            }

            this.ctx.fillStyle = colour;
            
            this.ctx.fillRect(this.borderwidth + x * (this.borderwidth + this.cellwidth), this.borderwidth + y * (this.borderwidth + this.cellheight), this.cellwidth, this.cellheight);
        },
        // draws a grid on the canvas
        drawgrid : function () {
            this.ctx.strokeStyle = "#332E36";
            this.ctx.lineWidth = 2;
            
            for (let i = 1; i <= this.canvas.height; i += this.cellheight + this.borderwidth) {
                this.ctx.moveTo(0, i);
                this.ctx.lineTo(this.canvas.width - 1, i);         
            }
            
            for (let i = 0; i <= this.canvas.width; i += this.cellwidth + this.borderwidth) {
                this.ctx.moveTo(i + 1, 0);
                this.ctx.lineTo(i + 1, this.canvas.height - 1);   
            }
            
            this.ctx.stroke();
        },

        //calculates the center position of the alive cells in the grouping
        //only works if x and y values are less than or equal to numcellsx-5 and numcellsy-5
        calculateGrouping : function(x, y){
            let total_x = 0;
            let total_y = 0;
            let num_cells = 0;
            for(let i = y; i < y+5; i++){
                for(let j = x; j < x+5; i++){
                    if(this.cellarray[i][j] == 1){
                        total_x += j-x+1;
                        total_y += i-j+1;
                        num_cells++;
                    }   
                }
            }
            
            const return_val = {
                "avg_x":total_x/num_cells,
                "avg_y":total_y/num_cells,
                "num_cells":num_cells
            }

            return return_val;
        },

        calculateAllGroups : function() {
            let group_data = new Array(25);
            let group_counter = 0;
            for(i = 0; i < 5; i++){
                for(j = 0; j < 5; j++){
                    group_data[group_counter] = this.calculateGrouping(j*5, i*5);
                    group_counter++;
                }
            }

            return group_data;
        },

        setOscillator : function(group_data) {
            for(let i = 0; i < 25; i++){
                let amplitude = (group_data[i].num_cells/25.0) * 2;
                let frequency = (group_data[i].avg_x/5.0 * 9980.0) + 20.0;
            }
        }
        

    }
    global.Conway = global.Conway || Conway
})(window, window.document, $);