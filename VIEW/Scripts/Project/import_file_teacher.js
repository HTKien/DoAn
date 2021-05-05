$("#input_file").on("change", function (e) {
    var file = e.target.files[0];
    // input canceled, return
    if (!file) return;

    var FR = new FileReader();
    FR.onload = function (e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var firstSheet = workbook.Sheets[workbook.SheetNames[0]];

        // header: 1 instructs xlsx to create an 'array of arrays'
        var result = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        // data preview
        alert("Xác nhận import file?");

        //
        for (var i = 0; i < result.length; i++) {
            var object = {};


            object["Code"] = result[i][0];
            object["Name"] = result[i][1];
            object["Address"] = result[i][2];
            object["Phone"] = result[i][3];
            object["Sex"] = result[i][4];
            object["Note"] = result[i][5];

            $.ajax({
                method: 'POST',
                url: '/teachers',
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                },
                error: function () {
                    alert("Hệ thống đang bị lỗi!");
                }
            });
        }
        alert("Thêm thành công");
        

    };
    FR.readAsArrayBuffer(file);
});

function exportReportToExcel() {
    let table = document.getElementById("table_teacher"); // you can use document.getElementById('tableId') as well by providing id to the table tag
    TableToExcel.convert(table, { // html code may contain multiple tables so here we are refering to 1st table tag
        name: `export.xlsx`, // fileName you could use any name
        sheet: {
            name: 'Sheet 1' // sheetName
        }
    });
}