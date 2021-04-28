function exportClassToExcel() {
    let table = document.getElementById("table_class"); // you can use document.getElementById('tableId') as well by providing id to the table tag
    TableToExcel.convert(table, { // html code may contain multiple tables so here we are refering to 1st table tag
        name: `class.xlsx`, // fileName you could use any name
        sheet: {
            name: 'Sheet 1' // sheetName
        }
    });
}