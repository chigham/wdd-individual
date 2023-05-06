const table = document.body.firstElementChild;

for (var i = 0; i < table.rows.length; i++) {
    var row = table.rows[i];
  
    // Iterate through each cell in the row
    for (var j = 0; j < row.cells.length; j++) {
        var cell = row.cells[j];
    
        // Add content to the cell
        cell.innerHTML = (j+1) + ":" + (i+1);

        if (i === j) {
            cell.style.backgroundColor = 'red';
        }
    }
}