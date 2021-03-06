/**
 * This is the boat class
 * @author Ethan Grantz
 * @class
 */
class Boat {
    /**
     * Constructor for the boat class
     * @param {number} dim dimension for the boat
     * @param {boolean} vertical orientation of the boat
     * @param {number} startColumn starting coordinate of the boat
     */
    constructor(dim, vertical, startColumn) {
        this.dimension = dim;
        this.isVertical = vertical;
        this.hitCoordinates = [];
        this.hitCounter = 0;
        this.isSunk = false;
        if (typeof startColumn == 'undefined' || startColumn > 5) startColumn = dim - 1;
        if (typeof vertical == 'undefined') this.isVertical = true;
        for (let i = 0; i < dim; i++) {
            if (vertical) {
                this.hitCoordinates.push([startColumn, i]);
            } else {
                this.hitCoordinates.push([i, startColumn]);
            }
        }
    }

    /**
     * This function adds or subtracts from the row coordinates of the boat
     * @function
     * @param {number} dir either -1 or 1 for up and down respectively
     */
    moveVert(dir) {
        for (let coord of this.hitCoordinates) {
            coord[1] += dir;
        }
    }

    /**
     * This function adds or subtracts from the column coordinates of the boat
     * @function
     * @param {number} dir either -1 or 1 for left and right respectively
     */
    moveHor(dir) {
        for (let coord of this.hitCoordinates) {
            coord[0] += dir;
        }
    }

    /**
     * This function rotates the boat about the top left corner
     * @function
     */
    rotate() {
        for (let coord of this.hitCoordinates) {
            if (this.isVertical) {
                if (coord === this.hitCoordinates[0]) continue;
                coord[0] = coord[1] + coord[0] - this.hitCoordinates[0][1];
                coord[1] = this.hitCoordinates[0][1];
            } else {
                if (coord === this.hitCoordinates[0]) continue;
                coord[1] = coord[0] + coord[1] - this.hitCoordinates[0][0];
                coord[0] = this.hitCoordinates[0][0];
            }
        }
        this.isVertical = !this.isVertical;
    }
}
