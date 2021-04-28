const { isNumeric } = require("jquery");

function sortTable(tableID, colNumber, objective) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById(tableID);
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[colNumber];
            y = rows[i + 1].getElementsByTagName("TD")[colNumber];
            if (objective == ">") {
                if (Number.isInteger(parseFloat(x.innerHTML.toLowerCase()))) {
                    if (parseFloat(x.innerHTML.toLowerCase()) > parseFloat(y.innerHTML.toLowerCase())) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
                

            } else {
                if (Number.isInteger(parseFloat(x.innerHTML.toLowerCase()))===true) {
                    if (parseFloat(x.innerHTML.toLowerCase()) < parseFloat(y.innerHTML.toLowerCase())) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
                
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}