const express = require('express');
const app = express();

const url = require('url');

app.set('port', (process.env.PORT || 5000));
app.get('/', function(request, response) {
	const reqUrl = url.parse(request.url, true);

	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/plain');
	
	switch (reqUrl.query['q']) {
	case 'Ping':
	    response.write('OK');
	    break;
	case 'Name':
	    response.write('J.D. Salazar');
	    break;
	case 'Status':
	    response.write('Yes');
	    break;
	case 'Resume':
	    response.write('https://www.dropbox.com/s/q2ww5c596wy3ex9/jd.salazar.resume.pdf?dl=0');
	    break;
	case 'Email Address':
	    response.write('jdsalaz@gmail.com');
	    break;
	case 'Years':
	    response.write('11');
	    break;
	case 'Degree':
	    response.write('progress towards BS Computer Science at California Institute of Technology (2001-2006)');
	    break;
	case 'Phone':
	    response.write('425-287-0716');
	    break;
	case 'Position':
	    response.write('Software Engineer (bRealTime)');
	    break;
	case 'Referrer':
	    response.write('balihoo.com');
	    break;
	case 'Source':
	    response.write('https://github.com/jdsalaz/brealtime.resume');
	    break;
	case 'Puzzle':
	    // Parse the puzzle.
	    const grid = reqUrl.query['d'].split(/\r?\n/).slice(1,-1).map((l) => l.split(''));	

	    const result = new Array(grid.length);
	    // The first row of the result is the same as the input (the header).
	    result[0] = grid[0];
	    
	    // Start iteration at 1 to skip the header.
	    for (let i = 1; i < grid.length; ++i) {
		result[i] = new Array(grid[i].length);

		// Find the default characther for a row.
		const defChar = grid[i].find((c, idx) => idx > 0 && c !== '-' && c !== '=');
	       
		// Fill the result with the default character.
		result[i].fill(defChar || '-');
		// Copy the label for the row and place the equals sign.
		result[i][0] = grid[i][0];
		result[i][i] = '=';
	    }

	    const invert = (c, def) => c === '>' ? '<' : (c === '<' ? '>' : def);

	    for (let i = 1; i < grid.length; ++i) {
		// Start iteration at 1 to skip the label.
		for (let j = 1; j < grid[i].length; ++j) {
		    result[i][j] = invert(grid[j][i], result[i][j]);
		    if (result[i][j] === '-')
			result[i][j] = invert(result[j][i]);
		}
	    }
	    result.forEach((row) => {
		    row.forEach((col) => response.write(col));
		    response.write('\n');
		});
	    break;
	default:
	    response.write('TODO');
	    break;
	}

	response.end();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
