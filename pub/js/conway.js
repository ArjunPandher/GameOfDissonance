"use strict";

// Current version specifications:
// Cell pixel dimensions: 20 by 20 px
// Grid width: 2px
// Board dimensions: 24 by 24 cells
// Canvas height/width: 526 by 526 px
(function(global, document, $){
    function Conway (canvasID) {
        this.canvas = document.getElementById(canvasID)
        this.ctx = canvas.getContext("2d");
        // Overriding the canvas's height and width; will support other canvas sizes at a later date.
        // Maybe create the canvas ourselves?
        this.canvas.width = 526;
        this.canvas.height = 526;
        this.canvas.style.width = 526 + "px";
        this.canvas.style.height = 526 + "px";
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
        // steps through one step of the game
        step : function () {

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

            // Draw grid

            //
        },
        // visually updates a single cell to represet that cell's current state
        // TODO: make this private
        updatecell : function (x, y) {
            // TODO: this
        },
        // draws a grid on the canvas
        drawgrid : function () {
            let gridwidth = 2;
            let cellwidth = 20;
            let cellheight = 20;
            this.ctx.strokeStyle = "#B6E6EC";
            this.ctx.lineWidth = 2;
            for (let i = 0; i < this.canvas.height; i += gridwidth + cellwidth) {
                this.ctx.moveTo(0, i);
                this.ctx.lineTo(this.canvas.width, i);
                this.ctx.stroke();
            }
            for (let i = 0; i < this.canvas.width; i += gridwidth + cellheight) {
                this.ctx.moveTo(i, 0);
                this.ctx.lineTo(i, this.canvas.height);
                this.ctx.stroke();
            }
        }
    }
})(window, window.document, $);