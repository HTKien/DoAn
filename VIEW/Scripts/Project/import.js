//import file class
$("#input_file_class").on("change", function (e) {
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
        cuteAlert({
            type: "question",
            title: "Xác nhận",
            message: "Bạn có chắc chắn nhập file lớp học?",
            confirmText: "Có",
            cancelText: "Hủy"
        }).then((e) => {
            if (e == "confirm") {
                for (var i = 0; i < result.length; i++) {
                    var object = {};


                    object["Code"] = result[i][0];
                    object["Name"] = result[i][1];
                    object["SchoolYear"] = result[i][2];
                    object["Note"] = result[i][3];

                    $.ajax({
                        method: 'POST',
                        url: '/classes',
                        data: JSON.stringify(object),
                        contentType: "application/json; charset=utf-8",
                        success: function (res) {
                        },
                        error: function () {
                            alert("Hệ thống đang bị lỗi!");
                        }
                    });
                }
            }
        })
        //
        
        cuteAlert({
            type: "success",
            title: "Thông báo",
            message: "Nhập file thành công!",
            buttonText: "OK"
        })


    };
    FR.readAsArrayBuffer(file);
});
//import file student
$("#input_file_student").on("change", function (e) {
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
        cuteAlert({
            type: "question",
            title: "Xác nhận",
            message: "Bạn có chắc chắn nhập file học sinh?",
            confirmText: "Có",
            cancelText: "Hủy"
        }).then((e) => {
            if (e == "confirm") {
                for (var i = 0; i < result.length; i++) {
                    var object = {};


                    object["Code"] = result[i][0];
                    object["Name"] = result[i][1];
                    object["Sex"] = result[i][2];
                    object["Birthday"] = result[i][3];
                    object["Address"] = result[i][4];
                    object["ParentName"] = result[i][5];
                    object["ParentPhone"] = result[i][6];
                    object["Bonus"] = 0;
                    object["Critic"] = 0;
                    object["MediumScore"] = "0.00";
                    object["Conduct"] = "Tốt";
                    object["Attendence"] = 0;
                    object["Status"] = 0;
                    object["Classify"] = "Chưa xếp loại";
                    object["ClassID"] = classID;
                    $.ajax({
                        method: 'POST',
                        url: '/students',
                        data: JSON.stringify(object),
                        contentType: "application/json; charset=utf-8",
                        success: function (res) {

                        },
                        error: function () {
                            alert("Hệ thống đang bị lỗi!");
                        }
                    });
                }
            }
        })
        cuteAlert({
            type: "success",
            title: "Thông báo",
            message: "Nhập file thành công!",
            buttonText: "OK"
        })


    };
    FR.readAsArrayBuffer(file);
});