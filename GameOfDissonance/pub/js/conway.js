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
        },
        // visually updates a single cell to represet that cell's current state
        // TODO: make this private
        updatecell : function (x, y) {
            // TODO: this
        }
    }
})(window, window.document, $);