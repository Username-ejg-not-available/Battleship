class BoatBoard {
	constructor(boatNum) {
		this.boats = [];
		//hasBeenHit is an array where we keep track of which spots on this players boats have already been hit
		//drawBoard function will color any locations marked as true in the array red
		//IMPORTANT: 2D arrays are indexed as [row][column], while the boats are mapped with [column][row]
		//this means that to access hasBeenHit values correctly, you must put the coordinates backwards
		this.hasBeenHit = [];
		this.boatCount = boatNum;
		for (let i = 0; i < boatNum; i++) this.boats.push(new Boat(i + 1, true, i));
		for (let i = 0; i < 9; i++) this.hasBeenHit.push([0,0,0,0,0,0,0,0,0]);
	}
	
	/**
	* Detects if 2 boats are intersecting
	* @param {Object} instance of Boat
	* @param {Object} another instance of Boat
	* @returns {Boolean} true if boats intersect, otherwise false
	*/
	intersect(boat1, boat2) {
		for (let b1 of boat1.hitCoordinates) {
			for (let b2 of boat2.hitCoordinates) {
				if (b1[0] == b2[0] && b1[1] == b2[1]) return true;
			}
		}
		return false;
	}
	
	/**
	* Detects if there is a boat present at the given coordinates
	* @param {number} index correlating to column (0-8)
	* @param {number} index correlating to row (0-8)
	* @returns {Boolean} true if boat is present, otherwise false
	*/
	isAHit(column, row) {
		for (let b of this.boats) {
			for (let h of b.hitCoordinates) {
				if (h[0] == column && h[1] == row) return true;
			}
		}
		return false;
	}
	
	/**
	* Determines which boat is present at a given location
	* @param {number} index correlating to column (0-8)
	* @param {number} index correlating to row (0-8)
	* @returns {number} length of the boat (0 if no boat is present)
	*/
	getBoatID(column, row) {
		for (let b of this.boats) {
			for (let x of b.hitCoordinates) {
				if (x[0] == column && x[1] == row) {
					return b.dimension;
				}
			}
		}
		return 0;
	}
	
	/**
	* Determines if boat is able to move in the specified direction (wouldn't go off map or intersect another boat), and if so, calls the boat's moveHor function
	* @param {number} index of boat in this.boats array
	* @param {number} either -1 or 1, for left and right respectively
	* return {Boolean} true if able to move, otherwise false
	*/
	moveHori(boat, dir) {
		let tempBoat = new Boat(this.boats[boat].dimension, this.boats[boat].isVertical, 0);
		tempBoat.hitCoordinates = JSON.parse(JSON.stringify(this.boats[boat].hitCoordinates));
		for (let i = 0; i < tempBoat.dimension; i++) {
			tempBoat.hitCoordinates[i][0] += dir;
		}
		if (dir == -1 && tempBoat.hitCoordinates[0][0] == -1) return false
		if (dir == 1 && tempBoat.hitCoordinates[tempBoat.hitCoordinates.length - 1][0] == 9) return false;
		for (let bo of this.boats) {
			if (bo == this.boats[boat]) continue;
			if (this.intersect(tempBoat, bo)) return false;
		}
		
		this.boats[boat].moveHor(dir);
		return true;
	}
	
	/**
	* Determines if boat is able to move in the specified direction (wouldn't go off map or intersect another boat), and if so, calls the boat's moveVert function
	* @param {number} index of boat in this.boats array
	* @param {number} either -1 or 1, for up and down respectively
	* return {Boolean} true if able to move, otherwise false
	*/
	moveVerti(boat, dir) {
		let tempBoat = new Boat(this.boats[boat].dimension, this.boats[boat].isVertical, 0);
		tempBoat.hitCoordinates = JSON.parse(JSON.stringify(this.boats[boat].hitCoordinates));
		for (let i = 0; i < tempBoat.dimension; i++) {
			tempBoat.hitCoordinates[i][1] += dir;
		}
		if (dir == -1 && tempBoat.hitCoordinates[0][1] == -1) return false;
		if (dir == 1 && tempBoat.hitCoordinates[tempBoat.hitCoordinates.length - 1][1] == 9) return false;
		for (let bo of this.boats) {
			if (bo == this.boats[boat]) continue;
			if (this.intersect(tempBoat, bo)) return false;
		}
		this.boats[boat].moveVert(dir);
		return true;
	}
	
	/**
	* Determines if boat is able to rotate (wouldn't go off map or intersect another boat), and if so, calls the boat's rotate function
	* @param {number} index of boat in this.boats array
	* return {Boolean} true if able to rotate, otherwise false
	*/
	rotater(boat) {
		let tempBoat = new Boat(this.boats[boat].dimension, this.boats[boat].isVertical, 0);
		tempBoat.hitCoordinates = JSON.parse(JSON.stringify(this.boats[boat].hitCoordinates));
		
		if (tempBoat.hitCoordinates[0][0] + tempBoat.dimension - 1 > 8 && tempBoat.isVertical) return false;
		else if (tempBoat.hitCoordinates[0][1] + tempBoat.dimension - 1 > 8 && !tempBoat.isVertical) return false;
		
		tempBoat.rotate();
		for (let bo of this.boats) {
			if (bo == this.boats[boat]) continue;
			if (this.intersect(tempBoat, bo)) return false;
		}
		
		this.boats[boat].rotate();
		return true;
	}
}
/*gaps are 3 spaces wide, use &nbsp to represent spaces that are adjacent to other spaces
   A   B   C   D   E   F   G   H   I
_|___|___|___|___|___|___|___|___|___|
1|   |	 |	 |	 |	 |	 |	 |   |   |
 |___|___|___|___|___|___|___|___|___|
2|   |	 |	 |	 |	 |	 |	 |   |   |
 |___|___|___|___|___|___|___|___|___|
3|   |	 |	 |	 |	 |	 |	 |   |   |
 |___|___|___|___|___|___|___|___|___|
4|   |	 |	 |	 |	 |	 |	 |   |   |
 |___|___|___|___|___|___|___|___|___|
5|   |	 |	 |	 |	 |	 |	 |   |   |
 |___|___|___|___|___|___|___|___|___|
6|   |	 |	 |	 |	 |	 |	 |   |   |
 |___|___|___|___|___|___|___|___|___|
7|   |	 |	 |	 |	 |	 |	 |   |   |
 |___|___|___|___|___|___|___|___|___|
8|   |	 |	 |	 |	 |	 |	 |   |   |
 |___|___|___|___|___|___|___|___|___|
9|   |	 |	 |	 |	 |	 |	 |   |   |
 |___|___|___|___|___|___|___|___|___|
*/
/*
   A   B   C   D   E   F   G   H   I
_|___|___|___|___|___|___|___|___|___|
1|   |	 |	 |	 |	 |	 |	 |   |   |
 |___|___|___|___|___|___|___|___|___|
2| 1 |	 |	 |	 |	 |	 |	 | 4 |   |
 |___|___|___|___|___|___|___|___|___|
3|   |	 | 2 |	 |	 |	 |	 | 4 |   |
 |___|___|___|___|___|___|___|___|___|
4|   |	 | 2 |	 |	 |	 |	 | 4 |   |
 |___|___|___|___|___|___|___|___|___|
5|   |	 |	 |	 |	 |	 |	 | 4 |   |
 |___|___|___|___|___|___|___|___|___|
6|   |	 |	 | 3 | 3 | 3 |	 |   |   |
 |___|___|___|___|___|___|___|___|___|
7|   |	 |	 |	 |	 |	 |	 |   |   |
 |___|___|___|___|___|___|___|___|___|
8|   | 5 | 5 | 5 | 5 | 5 |	 |   |   |
 |___|___|___|___|___|___|___|___|___|
9|   |	 |	 |	 |	 |	 |	 |   |   |
 |___|___|___|___|___|___|___|___|___|
*/

class Player {
	constructor(boatNum, id) {
		this.playerID = id;
		this.boatBoard = new BoatBoard(boatNum);
		//also have like hitBoard or whatever else
	}
	
	/**
	* Returns a boat so you don't have to do p#.boatBoard.boats[num] every time you want to access a specific boat
	* @param {number} ranging from 0 to 4, equal to boat length - 1, index of boat in boat array
	* @returns {Object} boat at specified index
	*/
	//is there a way to use the get keyword when there's a parameter? This is a personal curiousity question, doesn't necessarily help the code
	getBoat(num) {
		return this.boatBoard.boats[num];
	}
}