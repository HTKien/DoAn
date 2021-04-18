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
        //tinh diem trung binh Toán:
        var tbToan = 0;
        parseFloat(tbToan);
        var totalToan = 0;
        parseFloat(totalToan);
        var countToan = 0;
        for (var i = 0; i < fakeData.length; i++) {
            if (fakeData[i].Subject === "Toán") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalToan = totalToan + parseFloat(fakeData[i].Point);
                    countToan = countToan + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalToan = totalToan + parseFloat(fakeData[i].Point) * 2;
                    countToan = countToan + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalToan = totalToan + parseFloat(fakeData[i].Point) * 3;
                    countToan = countToan + 3;
                } else {
                    totalToan = totalToan + parseFloat(fakeData[i].Point);
                    countToan = countToan + 1;
                }
            }
        }
        tbToan = totalToan / countToan;
        $('#scoreToan').text("Toán: " + tbToan.toFixed(2));
        //tinh diem trung binh Vật lý:
        var tbVatLy = 0;
        parseFloat(tbVatLy);
        var totalVatLy = 0;
        parseFloat(totalVatLy);
        var countVatLy = 0;
        for (var i = 0; i < fakeData.length; i++) {
            if (fakeData[i].Subject === "Vật lý") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalVatLy = totalVatLy + parseFloat(fakeData[i].Point);
                    countVatLy = countVatLy + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalVatLy = totalVatLy + parseFloat(fakeData[i].Point) * 2;
                    countVatLy = countVatLy + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalVatLy = totalVatLy + parseFloat(fakeData[i].Point) * 3;
                    countVatLy = countVatLy + 3;
                } else {
                    totalVatLy = totalVatLy + parseFloat(fakeData[i].Point);
                    countVatLy = countVatLy + 1;
                }
            }
        }
        tbVatLy = totalVatLy / countVatLy;
        $('#scoreVatLy').text("Vật lý: " + tbVatLy.toFixed(2));
        //tinh diem trung binh Hóa học:
        var tbHoaHoc = 0;
        parseFloat(tbHoaHoc);
        var totalHoaHoc = 0;
        parseFloat(totalHoaHoc);
        var countHoaHoc = 0;
        for (var i = 0; i < fakeData.length; i++) {
            if (fakeData[i].Subject === "Hóa học") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalHoaHoc = totalHoaHoc + parseFloat(fakeData[i].Point);
                    countHoaHoc = countHoaHoc + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalHoaHoc = totalHoaHoc + parseFloat(fakeData[i].Point) * 2;
                    countHoaHoc = countHoaHoc + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalHoaHoc = totalHoaHoc + parseFloat(fakeData[i].Point) * 3;
                    countHoaHoc = countHoaHoc + 3;
                } else {
                    totalHoaHoc = totalHoaHoc + parseFloat(fakeData[i].Point);
                    countHoaHoc = countHoaHoc + 1;
                }
            }
        }
        tbHoaHoc = totalHoaHoc / countHoaHoc;
        $('#scoreHoaHoc').text("Hóa học: " + tbHoaHoc.toFixed(2));
        //tinh diem trung binh Sinh học:
        var tbSinhHoc = 0;
        parseFloat(tbSinhHoc);
        var totalSinhHoc = 0;
        parseFloat(totalSinhHoc);
        var countSinhHoc = 0;
        for (var i = 0; i < fakeData.length; i++) {
            if (fakeData[i].Subject === "Sinh học") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalSinhHoc = totalSinhHoc + parseFloat(fakeData[i].Point);
                    countSinhHoc = countSinhHoc + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalSinhHoc = totalSinhHoc + parseFloat(fakeData[i].Point) * 2;
                    countSinhHoc = countSinhHoc + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalSinhHoc = totalSinhHoc + parseFloat(fakeData[i].Point) * 3;
                    countSinhHoc = countSinhHoc + 3;
                } else {
                    totalSinhHoc = totalSinhHoc + parseFloat(fakeData[i].Point);
                    countSinhHoc = countSinhHoc + 1;
                }
            }
        }
        tbSinhHoc = totalSinhHoc / countSinhHoc;
        $('#scoreSinhHoc').text("Sinh học: " + tbSinhHoc.toFixed(2));

        //tinh diem trung binh Ngu van:
        var tbNguVan = 0;
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
        //tinh diem trung binh Lịch sử:
        var tbLichSu = 0;
        parseFloat(tbLichSu);
        var totalLichSu = 0;
        parseFloat(totalLichSu);
        var countLichSu = 0;
        for (var i = 0; i < fakeData.length; i++) {
            if (fakeData[i].Subject === "Lịch sử") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalLichSu = totalLichSu + parseFloat(fakeData[i].Point);
                    countLichSu = countLichSu + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalLichSu = totalLichSu + parseFloat(fakeData[i].Point) * 2;
                    countLichSu = countLichSu + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalLichSu = totalLichSu + parseFloat(fakeData[i].Point) * 3;
                    countLichSu = countLichSu + 3;
                } else {
                    totalLichSu = totalLichSu + parseFloat(fakeData[i].Point);
                    countLichSu = countLichSu + 1;
                }
            }
        }
        tbLichSu = totalLichSu / countLichSu;
        $('#scoreLichSu').text("Lịch sử: " + tbLichSu.toFixed(2));
        //tinh diem trung binh Địa lý:
        var tbDiaLy = 0;
        parseFloat(tbDiaLy);
        var totalDiaLy = 0;
        parseFloat(totalDiaLy);
        var countDiaLy = 0;
        for (var i = 0; i < fakeData.length; i++) {
            if (fakeData[i].Subject === "Địa lý") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalDiaLy = totalDiaLy + parseFloat(fakeData[i].Point);
                    countDiaLy = countDiaLy + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalDiaLy = totalDiaLy + parseFloat(fakeData[i].Point) * 2;
                    countDiaLy = countDiaLy + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalDiaLy = totalDiaLy + parseFloat(fakeData[i].Point) * 3;
                    countDiaLy = countDiaLy + 3;
                } else {
                    totalDiaLy = totalDiaLy + parseFloat(fakeData[i].Point);
                    countDiaLy = countDiaLy + 1;
                }
            }
        }
        tbDiaLy = totalDiaLy / countDiaLy;
        $('#scoreDiaLy').text("Địa lý: " + tbDiaLy.toFixed(2));
        //tinh diem trung binh Tin học:
        var tbTinHoc = 0;
        parseFloat(tbTinHoc);
        var totalTinHoc = 0;
        parseFloat(totalTinHoc);
        var countTinHoc = 0;
        for (var i = 0; i < fakeData.length; i++) {
            if (fakeData[i].Subject === "Tin học") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalTinHoc = totalTinHoc + parseFloat(fakeData[i].Point);
                    countTinHoc = countTinHoc + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalTinHoc = totalTinHoc + parseFloat(fakeData[i].Point) * 2;
                    countTinHoc = countTinHoc + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalTinHoc = totalTinHoc + parseFloat(fakeData[i].Point) * 3;
                    countTinHoc = countTinHoc + 3;
                } else {
                    totalTinHoc = totalTinHoc + parseFloat(fakeData[i].Point);
                    countTinHoc = countTinHoc + 1;
                }
            }
        }
        tbTinHoc = totalTinHoc / countTinHoc;
        $('#scoreTinHoc').text("Tin học: " + tbTinHoc.toFixed(2));
        //tinh diem trung binh Giáo dục công dân:
        var tbCongDan = 0;
        parseFloat(tbCongDan);
        var totalCongDan = 0;
        parseFloat(totalCongDan);
        var countCongDan = 0;
        for (var i = 0; i < fakeData.length; i++) {
            if (fakeData[i].Subject === "Giáo dục công dân") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalCongDan = totalCongDan + parseFloat(fakeData[i].Point);
                    countCongDan = countCongDan + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalCongDan = totalCongDan + parseFloat(fakeData[i].Point) * 2;
                    countCongDan = countCongDan + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalCongDan = totalCongDan + parseFloat(fakeData[i].Point) * 3;
                    countCongDan = countCongDan + 3;
                } else {
                    totalCongDan = totalCongDan + parseFloat(fakeData[i].Point);
                    countCongDan = countCongDan + 1;
                }
            }
        }
        tbCongDan = totalCongDan / countCongDan;
        $('#scoreCongDan').text("Giáo dục công dân: " + tbCongDan.toFixed(2));
        //tinh diem trung binh Giáo dục Tiếng Anh:
        var tbTiengAnh = 0;
        parseFloat(tbTiengAnh);
        var totalTiengAnh = 0;
        parseFloat(totalTiengAnh);
        var countTiengAnh = 0;
        for (var i = 0; i < fakeData.length; i++) {
            if (fakeData[i].Subject === "Tiếng Anh") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalTiengAnh = totalTiengAnh + parseFloat(fakeData[i].Point);
                    countTiengAnh = countTiengAnh + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalTiengAnh = totalTiengAnh + parseFloat(fakeData[i].Point) * 2;
                    countTiengAnh = countTiengAnh + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalTiengAnh = totalTiengAnh + parseFloat(fakeData[i].Point) * 3;
                    countTiengAnh = countTiengAnh + 3;
                } else {
                    totalTiengAnh = totalTiengAnh + parseFloat(fakeData[i].Point);
                    countTiengAnh = countTiengAnh + 1;
                }
            }
        }
        tbTiengAnh = totalTiengAnh / countTiengAnh;
        $('#scoreTiengAnh').text("Tiếng Anh: " + tbTiengAnh.toFixed(2));
        //tinh diem trung binh Giáo dục Thể dục:
        var tbTheDuc = 0;
        parseFloat(tbTheDuc);
        var totalTheDuc = 0;
        parseFloat(totalTheDuc);
        var countTheDuc = 0;
        for (var i = 0; i < fakeData.length; i++) {
            if (fakeData[i].Subject === "Thể dục") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalTheDuc = totalTheDuc + parseFloat(fakeData[i].Point);
                    countTheDuc = countTheDuc + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalTheDuc = totalTheDuc + parseFloat(fakeData[i].Point) * 2;
                    countTheDuc = countTheDuc + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalTheDuc = totalTheDuc + parseFloat(fakeData[i].Point) * 3;
                    countTheDuc = countTheDuc + 3;
                } else {
                    totalTheDuc = totalTheDuc + parseFloat(fakeData[i].Point);
                    countTheDuc = countTheDuc + 1;
                }
            }
        }
        tbTheDuc = totalTheDuc / countTheDuc;
        $('#scoreTheDuc').text("Thể dục: " + tbTheDuc.toFixed(2));
        //tinh diem trung binh Giáo dục Công nghệ:
        var tbCongNghe =0;
        parseFloat(tbCongNghe);
        var totalCongNghe = 0;
        parseFloat(totalCongNghe);
        var countCongNghe = 0;
        for (var i = 0; i < fakeData.length; i++) {
            if (fakeData[i].Subject === "Công nghệ") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalCongNghe = totalCongNghe + parseFloat(fakeData[i].Point);
                    countCongNghe = countCongNghe + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalCongNghe = totalCongNghe + parseFloat(fakeData[i].Point) * 2;
                    countCongNghe = countCongNghe + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalCongNghe = totalCongNghe + parseFloat(fakeData[i].Point) * 3;
                    countCongNghe = countCongNghe + 3;
                } else {
                    totalCongNghe = totalCongNghe + parseFloat(fakeData[i].Point);
                    countCongNghe = countCongNghe + 1;
                }
            }
        }
        tbCongNghe = totalCongNghe / countCongNghe;
        $('#scoreCongNghe').text("Công nghệ: " + tbCongNghe.toFixed(2));
        $('#dialog-student-detail #student_mediumscore').text("Điểm trung bình các môn: " + ((tbToan + tbVatLy + tbHoaHoc + tbSinhHoc + tbNguVan + tbLichSu + tbDiaLy + tbTinHoc + tbCongDan + tbTiengAnh + tbTheDuc + tbCongNghe) / 12).toFixed(2));

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