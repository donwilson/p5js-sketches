function index(i, j) {
	if((i < 0) || (j < 0) || (i > (cols - 1)) || (j > (rows - 1))) {
		return -1;
	}
	
	return (i + (j * cols));
}

function Cell(i, j) {
	this.i = i;
	this.j = j;
	this.walls = [true, true, true, true];
	this.visited = false;
	
	this.checkNeighbors = function() {
		var neighbors = [];
		
		var top    = grid[ index(this.i    , this.j - 1) ];
		var right  = grid[ index(this.i + 1, this.j    ) ];
		var bottom = grid[ index(this.i    , this.j + 1) ];
		var left   = grid[ index(this.i - 1, this.j    ) ];
		
		if(top && !top.visited) {
			neighbors.push(top);
		}
		
		if(right && !right.visited) {
			neighbors.push(right);
		}
		
		if(bottom && !bottom.visited) {
			neighbors.push(bottom);
		}
		
		if(left && !left.visited) {
			neighbors.push(left);
		}
		
		if(neighbors.length) {
			var r = floor(random(0, neighbors.length));
			
			return neighbors[ r ];
		} else {
			return undefined;
		}
	};
	
	this.highlight = function() {
		var x = (this.i * w);
		var y = (this.j * w);
		
		noStroke();
		fill(0, 0, 255, 100);
		rect(x, y, w, w);
	};
	
	this.show = function() {
		var x = (this.i * w);
		var y = (this.j * w);
		
		stroke(255);
		
		if(this.walls[0]) {
			line(x    , y    , x + w, y    );   // top
		}
		
		if(this.walls[1]) {
			line(x + w, y    , x + w, y + w);   // right
		}
		
		if(this.walls[2]) {
			line(x + w, y + w, x    , y + w);   // bottom
		}
		
		if(this.walls[3]) {
			line(x    , y + w, x    , y    );   // left
		}
		
		if(this.visited) {
			fill(255, 0, 255, 100);
			noStroke();
			rect(x, y, w, w);
		}
	};
}