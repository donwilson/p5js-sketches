var cols, rows;
var w = 10;
var grid = [];

var current;

var stack = [];

function setup() {
	createCanvas(800, 600);
	
	cols = floor(width / w);
	rows = floor(height / w);
	
	//frameRate(5);
	
	for(var y = 0; y < rows; y++) {
		for(var x = 0; x < cols; x++) {
			var cell = new Cell(x, y);
			grid.push(cell);
		}
	}
	
	current = grid[0];
}

function draw() {
	background(51);
	
	for(var i = 0; i < grid.length; i++) {
		grid[ i ].show();
	}
	
	// step 1
	current.visited = true;
	current.highlight();
	var next = current.checkNeighbors();
	
	if(next) {
		next.visited = true;
		
		// step 2
		stack.push(current);
		
		// step 3
		removeWalls(current, next);
		
		// step 4
		current = next;
	} else if(stack.length) {
		current = stack.pop();
	}
}

function removeWalls(a, b) {
	var x = (a.i - b.i);
	
	if(x === 1) {
		a.walls[3] = false;
		b.walls[1] = false;
	} else if(x === -1) {
		a.walls[1] = false;
		b.walls[3] = false;
	}
	
	var y = (a.j - b.j);
	
	if(y === 1) {
		a.walls[0] = false;
		b.walls[2] = false;
	} else if(y === -1) {
		a.walls[2] = false;
		b.walls[0] = false;
	}
}


