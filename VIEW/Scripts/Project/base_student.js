class BaseStudent {
    constructor() {
        this.loadData();
    }
    /**
     * Hàm thực hiện lấy toàn bộ dữ liệu
     * Người tạo: Hàn Trung Kiên 
     * */
    getAllData(classID) {
        var fakeData = [];
        $.ajax({
            method: 'GET',
            url: '/students',
            dataType: 'json',
            async: false,
            success: function (res) {
                $.each(res, function (index, item) {
                    if (item.ClassID === classID) {
                        fakeData.push(item);
                    }
                });
            },
            error: function (res) {
                alert("Hệ thống đang bị lỗi!");
            }
        })
        return fakeData;

    }
    /**
    * Hàm  thực hiện lấy dữ liệu từ database theo phân trang
    * Người tạo: Hàn Trung Kiên
    * Ngày tạo: 22/8/2019
    * */
    getData() {
        var pageIndex = $('.page-index').val();
        var pageSize = $('.page-size option:selected').val();


        this.FormatBtn(pageIndex, pageSize);
        var fakeData = [];
        var allStudentClass = [];


        if (pageIndex >= (parseInt(this.getAllData(classID).length / pageSize) + 1)) {
            if (this.getAllData(classID).length % pageSize !== 0) {
                $('.page-index').val((parseInt(this.getAllData(classID).length / pageSize) + 1));

            } else {
                $('.page-index').val(parseInt(this.getAllData(classID).length / pageSize));

            }


            allStudentClass = this.getAllData(classID);
            for (var i = ($('.page-index').val() - 1) * pageSize; i < allStudentClass.length; i++) {
                fakeData.push(allStudentClass[i]);
            }

        } else {
            
            allStudentClass = this.getAllData(classID);
            for (var i = (pageIndex - 1) * pageSize; i < (pageIndex * pageSize); i++) {
                fakeData.push(allStudentClass[i]);
            }



        }


        return fakeData;


    }
    /**
    * Hàm  thực hiện load mới dữ liệu theo phân trang phục vụ cho button
    * Người tạo: Hàn Trung Kiên
    * Ngày tạo: 22/8/2019
    * */
    getRefreshData(classID) {
        var pageIndex = $('.page-index').val(1);
        var pageSize = $('.page-size').val(25);

        var pageIndex = $('.page-index').val();
        var pageSize = $('.page-size option:selected').val();
        this.FormatBtn(pageIndex, pageSize);

        var fakeData = [];
        $.ajax({
            method: 'GET',
            url: '/students/' + pageIndex + '/' + pageSize,

            dataType: 'json',
            async: false,
            success: function (res) {
                $.each(res, function (index, item) {
                    if (item.ClassID === classID) {
                        fakeData.push(item);
                    }
                });


            },
            error: function (res) {
                alert("Hệ thống đang bị lỗi!");
            }
        })
        return fakeData;


    }

    /**
     * Hàm thực hiện load dữ liệu lên html
     * Người tạo: Hàn Trung Kiên
     * Ngày tạo: 22/8/2019
     * */
    loadData() {
        $('.loading').show();

        var me = this;
        var data = me.getData();
        this.AppenData(data);
        this.CountRecord();
        //$('.loading').hide();
        setTimeout(function () {
            $('.loading').hide();

        }, 500);

    }
    /**
    * Hàm  thực hiện load dữ liệu của hàm getRefreshData lên table
    * Người tạo: Hàn Trung Kiên
    * Ngày tạo: 22/8/2019
    * */
    loadRefreshData() {
        $('.loading').show();

        var me = this;
        var data = me.getRefreshData(classID);
        this.AppenData(data);
        this.CountRecord();
        //$('.loading').hide();
        setTimeout(function () {
            $('.loading').hide();

        }, 500);

    }
    loadTrangDau() {
        $('.loading').show();

        var me = this;
        var data = me.getTrangDau(classID);
        this.AppenData(data);
        this.CountRecord();
        //$('.loading').hide();
        setTimeout(function () {
            $('.loading').hide();

        }, 500);
    }
    loadTrangCuoi() {
        $('.loading').show();

        var me = this;
        var data = me.getTrangCuoi(classID);
        this.AppenData(data);
        this.CountRecord();
        //$('.loading').hide();
        setTimeout(function () {
            $('.loading').hide();

        }, 500);
    }
    loadTrangTruoc() {
        $('.loading').show();

        var me = this;
        var data = me.getTrangTruoc(classID);
        this.AppenData(data);
        this.CountRecord();
        //$('.loading').hide();
        setTimeout(function () {
            $('.loading').hide();

        }, 500);
    }
    loadTrangSau() {
        $('.loading').show();

        var me = this;
        var data = me.getTrangSau(classID);
        this.AppenData(data);
        this.CountRecord();
        //$('.loading').hide();
        setTimeout(function () {
            $('.loading').hide();

        }, 500);
    }
    


    /**
    * Hàm  thực hiện load dữ liệu trang đầu tiên cho page-size hiện tại
    * Người tạo: Hàn Trung Kiên
    * Ngày tạo: 22/8/2019
    * */
    getTrangDau(classID) {
        $('.loading').show();

        $('.page-index').val(1);

        var pageIndex = $('.page-index').val();
        var pageSize = $('.page-size option:selected').val();

        this.FormatBtn(pageIndex, pageSize);




        var fakeData = [];
        var allStudentClass = [];
        allStudentClass = this.getAllData(classID);
        for (var i = (pageIndex - 1) * pageSize; i < (pageIndex * pageSize); i++) {
            fakeData.push(allStudentClass[i]);
        }

        this.AppenData(fakeData);

        this.CountRecord();
        setTimeout(function () {
            $('.loading').hide();

        }, 500);




    }

    /**
    * Hàm thực hiện việc quay lại một trang so với trang hiện tại:
    * Người tạo: Hàn Trung Kiên
    * Ngày tạo: 22/8/2019
    * */
    getTrangTruoc(classID) {
        $('.loading').show();



        $('.page-index').val($('.page-index').val() - 1);

        var pageIndex = $('.page-index').val();

        var pageSize = $('.page-size option:selected').val();
        this.FormatBtn(pageIndex, pageSize);




        var fakeData = [];
        var allStudentClass = [];
        allStudentClass = this.getAllData(classID);
        for (var i = (pageIndex - 1) * pageSize; i < (pageIndex * pageSize); i++) {
            fakeData.push(allStudentClass[i]);
        }
        this.AppenData(fakeData);

        this.CountRecord();
        setTimeout(function () {
            $('.loading').hide();

        }, 500);




    }
    /**
    * Hàm thực hiện việc load trang sau so với trang hiện tại:
    * Người tạo: Hàn Trung Kiên
    * Ngày tạo: 22/8/2019
    * */
    getTrangSau(classID) {
        $('.loading').show();



        $('.page-index').val(parseInt($('.page-index').val()) + 1);

        var pageIndex = $('.page-index').val();

        var pageSize = $('.page-size option:selected').val();
        this.FormatBtn(pageIndex, pageSize);




        var fakeData = [];
        var allStudentClass = [];
        allStudentClass = this.getAllData(classID);
        for (var i = (pageIndex - 1) * pageSize; i < (pageIndex * pageSize); i++) {
            fakeData.push(allStudentClass[i]);
        }
        this.AppenData(fakeData);

        this.CountRecord();

        setTimeout(function () {
            $('.loading').hide();

        }, 500);

    }

    /**
     * Hàm thực hiện load trang cuối cùng
     * Người tạo: Hàn Trung Kiên
     * Ngày tạo: 22/8/2019
     * */

    getTrangCuoi(classID) {
        $('.loading').show();

        var pageSize = $('.page-size option:selected').val();

        if (this.getAllData(classID).length % pageSize !== 0) {
            $('.page-index').val(parseInt(this.getAllData(classID).length / pageSize) + 1);

        } else if (this.getAllData(classID).length % pageSize === 0) {
            $('.page-index').val(parseInt(this.getAllData(classID).length / pageSize));

        }




        var pageIndex = $('.page-index').val();
        this.FormatBtn(pageIndex, pageSize);




        var fakeData = [];
        var allStudentClass = [];
        allStudentClass = this.getAllData(classID);
        for (var i = (pageIndex - 1) * pageSize; i < allStudentClass.length; i++) {
            fakeData.push(allStudentClass[i]);
        }
        this.AppenData(fakeData);

        this.CountRecord();
        setTimeout(function () {
            $('.loading').hide();

        }, 500);


    }
    /**
    *Hàm thực hiện in ra câu hiện thị bao nhiêu bản ghi trong phần Trang:
    * Người tạo: Hàn Trung Kiên
    * Ngày tạo: 22/8/2019
    * */

    CountRecord() {
        var me = this;

        if ($('.main-table tbody tr').length === 0) {
            $('.phan-trang .dem-ban-ghi').text("Không có dữ liệu hoặc vượt quá số trang!");
            $('.phan-trang .dem-ban-ghi').css("color", "red");



        } else {
            var a = ($('.page-index').val() - 1) * $('.page-size').val() + 1;
            var b = ($('.page-index').val() - 1) * $('.page-size').val() + $('.main-table tbody tr').length;
            var c = me.getAllData(classID).length;

            if (c % ($('.page-size').val()) !== 0) {
                $('.phan-trang .so-trang-max').text("trên " + parseInt(c / ($('.page-size').val()) + 1));

            } else if (c % ($('.page-size').val()) === 0) {
                $('.phan-trang .so-trang-max').text("trên " + parseInt(c / ($('.page-size').val())));

            }

            $('.phan-trang .dem-ban-ghi').text("Hiển thị " + a + " - " + b + " trên " + c + " kết quả");
            $('.phan-trang .dem-ban-ghi').css("color", "black");

        }



    }
    /**
    *Hàm thực hiện việc format trạng thái cho các button ở phần phân trang:
    * Người tạo: Hàn Trung Kiên
    * Ngày tạo: 22/8/2019
    * */
    FormatBtn(pageIndex, pageSize) {
        if (this.getAllData(classID).length % pageSize !== 0) {
            $('.page-index').attr("max", this.getAllData(classID).length / pageSize + 1);
            if (pageIndex > parseInt((this.getAllData(classID).length / pageSize))) {
                $('.page-index').prop('disabled', true);
                $('button#trang-sau').prop('disabled', true);
                $('button#trang-cuoi').prop('disabled', true);



            } else {
                $('.page-index').prop('disabled', false);
                $('button#trang-sau').prop('disabled', false);
                $('button#trang-cuoi').prop('disabled', false);




            }

        } else if (this.getAllData(classID).length % pageSize === 0) {
            $('.page-index').attr("max", this.getAllData(classID).length / pageSize);
            if (pageIndex >= parseInt((this.getAllData(classID).length / pageSize))) {
                $('.page-index').prop('disabled', true);
                $('button#trang-sau').prop('disabled', true);
                $('button#trang-cuoi').prop('disabled', true);



            } else {
                $('.page-index').prop('disabled', false);
                $('button#trang-sau').prop('disabled', false);
                $('button#trang-cuoi').prop('disabled', false);




            }

        }

        if (pageIndex == 1) {
            $('button#trang-dau').prop('disabled', true);
            $('button#trang-truoc').prop('disabled', true);



        } else {
            $('button#trang-dau').prop('disabled', false);
            $('button#trang-truoc').prop('disabled', false);

        }

        //if (pageIndex > parseInt((this.getAllData().length / pageSize))) {
        //    $('.page-index').prop('disabled', true);
        //    $('button#trang-sau').prop('disabled', true);
        //    $('button#trang-cuoi').prop('disabled', true);



        //} else {
        //    $('.page-index').prop('disabled', false);
        //    $('button#trang-sau').prop('disabled', false);
        //    $('button#trang-cuoi').prop('disabled', false);




        //}
        $('button.duplicate').prop('disabled', true);
        $('button.delete').prop('disabled', true);
        $('button.edit').prop('disabled', true);

    }

    /**
    *Hàm thực hiện đơn thuần công việc appen dữ liệu lên table
    * Người tạo: Hàn Trung Kiên
    * Ngày tạo: 22/8/2019
    * */
    AppenData(fakeData) {
        var classID = fakeData[0].ClassID;
        var classCode;
        var className;
        var TeacherID;
        $.ajax({
            method: 'GET',
            url: '/classes/' + classID,
            dataType: 'json',
            async: false,
            success: function (res) {
                classCode = res.Code;
                className = res.Name;
                TeacherID = res.TeacherID;
            },
            error: function (res) {
                alert("Hệ thống đang bị lỗi!");
            }
        })
        var teacherName;
        $.ajax({
            method: 'GET',
            url: '/teachers/' + TeacherID,
            dataType: 'json',
            async: false,
            success: function (res) {
                teacherName = res.Name;
            },
            error: function (res) {
                alert("Hệ thống đang bị lỗi!");
            }
        })
        var classTitle = "Mã lớp: " + classCode + " - Tên lớp: " + className + " - Giáo viên chủ nhiệm: " + teacherName;
        $("#class_title").text(classTitle);
        var fields = $('.main-table th[fieldName]');
        $('.main-table tbody').empty();
        $.each(fakeData, function (index, item) {
            var rowHTML = $('<tr></tr>').data("recordid", item["StudentID"]);
            $.each(fields, function (fieldIndex, fieldItem) {
                var fieldName = fieldItem.getAttribute('fieldName');
                var fieldValue = item[fieldName];
                rowHTML.append('<td>' + fieldValue + '</td>');
            });
            $('.main-table tbody').append(rowHTML);
        });

    }

    GetScore(studentID) {
        var fakeData = [];
        $.ajax({
            method: 'GET',
            url: '/scores',
            dataType: 'json',
            async: false,
            success: function (res) {
                $.each(res, function (index, item) {
                    if (item.StudentID === studentID) {
                        fakeData.push(item);
                    }
                });
            },
            error: function (res) {
                alert("Hệ thống đang bị lỗi!");
            }
        })
        return fakeData;
    }

    AppendScore(fakeData) {
        var tbNguVan;
        parseFloat(tbNguVan);
        var totalNguVan = 0;
        parseFloat(totalNguVan);
        var countNguVan = 0;
        for (var i = 0; i < fakeData.length; i++) {
            if (fakeData[i].Subject === "Ngữ văn") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalNguVan = totalNguVan + parseFloat(fakeData[i].Point);
                    countNguVan = countNguVan + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalNguVan = totalNguVan + parseFloat(fakeData[i].Point) * 2;
                    countNguVan = countNguVan + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalNguVan = totalNguVan + parseFloat(fakeData[i].Point) * 3;
                    countNguVan = countNguVan + 3;
                } else {
                    totalNguVan = totalNguVan + parseFloat(fakeData[i].Point);
                    countNguVan = countNguVan + 1;
                }
            }
        }
        tbNguVan = totalNguVan / countNguVan;
        $('#scoreNguVan').text("Ngữ văn: " + tbNguVan.toFixed(2));
        $('#scoreToan').text("Toán: " + tbNguVan.toFixed(2));
        $('#scoreVatLy').text("Vật lý: " + tbNguVan.toFixed(2));
        var fields = $('.main-table-score th[fieldName]');
        $('.main-table-score tbody').empty();
        $.each(fakeData, function (index, item) {
            var rowHTML = $('<tr></tr>').data("recordid", item["ScoreID"]);
            $.each(fields, function (fieldIndex, fieldItem) {
                var fieldName = fieldItem.getAttribute('fieldName');
                var fieldValue = item[fieldName];
                if (fieldValue === undefined) {
                    fieldValue = "";
                }
                rowHTML.append('<td>' + fieldValue + '</td>');
            });
            $('.main-table-score tbody').append(rowHTML);
        });

    } 
    loadScore(studentID) {
        var data = this.GetScore(studentID);
        this.AppendScore(data);
    }

    

    
}