class BaseScoreByClass {
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
            url: '/scores',
            dataType: 'json',
            async: false,
            success: function (res) {
                $.each(res, function (index, item) {
                    $.ajax({
                        method: 'GET',
                        url: '/students/' + item.StudentID,
                        dataType: 'json',
                        async: false,
                        success: function (ress) {
                            if (ress.ClassID === classID) {
                                fakeData.push(item);
                            }
                        },
                        error: function (ress) {
                            alert("Hệ thống đang bị lỗi!");
                        }
                    })
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
        if (this.getAllData(classID).length === 0) {
            return fakeData;
        }
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
    getRefreshData() {
        var pageIndex = $('.page-index').val(1);
        var pageSize = $('.page-size').val(25);

        var pageIndex = $('.page-index').val();
        var pageSize = $('.page-size option:selected').val();
        this.FormatBtn(pageIndex, pageSize);

        var fakeData = [];
        $.ajax({
            method: 'GET',
            url: '/scores/' + pageIndex + '/' + pageSize,

            dataType: 'json',
            async: false,
            success: function (res) {
                fakeData = res;


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
        var data = me.getRefreshData();
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
    loadTrangDau() {
        $('.loading').show();

        $('.page-index').val(1);
        //$('.page-size').val(50);

        var pageIndex = $('.page-index').val();
        var pageSize = $('.page-size option:selected').val();

        this.FormatBtn(pageIndex, pageSize);




        var fakeData = [];
        $.ajax({
            method: 'GET',
            url: '/scores/' + pageIndex + '/' + pageSize,
            dataType: 'json',
            async: false,
            success: function (res) {
                fakeData = res;
            },
            error: function (res) {
                alert("Hệ thống đang bị lỗi!");
            }
        })
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
    loadTrangTruoc() {
        $('.loading').show();



        $('.page-index').val($('.page-index').val() - 1);

        var pageIndex = $('.page-index').val();

        var pageSize = $('.page-size option:selected').val();
        this.FormatBtn(pageIndex, pageSize);




        var fakeData = [];
        $.ajax({
            method: 'GET',
            url: '/scores/' + pageIndex + '/' + pageSize,
            dataType: 'json',
            async: false,
            success: function (res) {
                fakeData = res;
            },
            error: function (res) {
                alert("Hệ thống đang bị lỗi!");
            }
        })
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
    loadTrangSau() {
        $('.loading').show();



        $('.page-index').val(parseInt($('.page-index').val()) + 1);

        var pageIndex = $('.page-index').val();

        var pageSize = $('.page-size option:selected').val();
        this.FormatBtn(pageIndex, pageSize);




        var fakeData = [];
        $.ajax({
            method: 'GET',
            url: '/scores/' + pageIndex + '/' + pageSize,
            dataType: 'json',
            async: false,
            success: function (res) {
                fakeData = res;
            },
            error: function (res) {
                alert("Hệ thống đang bị lỗi!");
            }
        })
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

    loadTrangCuoi() {
        $('.loading').show();

        var pageSize = $('.page-size option:selected').val();

        if (this.getAllData().length % pageSize !== 0) {
            $('.page-index').val(parseInt(this.getAllData().length / pageSize) + 1);

        } else if (this.getAllData().length % pageSize === 0) {
            $('.page-index').val(parseInt(this.getAllData().length / pageSize));

        }




        var pageIndex = $('.page-index').val();
        this.FormatBtn(pageIndex, pageSize);




        var fakeData = [];
        $.ajax({
            method: 'GET',
            url: '/scores/' + pageIndex + '/' + pageSize,
            dataType: 'json',
            async: false,
            success: function (res) {
                fakeData = res;
            },
            error: function (res) {
                alert("Hệ thống đang bị lỗi!");
            }
        })
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
        var fields = $('.main-table th[fieldName]');
        $('.main-table tbody').empty();
        $.each(fakeData, function (index, item) {
            var studentCode;
            var studentName;
            $.ajax({
                method: 'GET',
                url: '/students/' + item.StudentID,
                dataType: 'json',
                async: false,
                success: function (res) {
                    studentCode = res.Code;
                    studentName = res.Name;
                },
                error: function (res) {
                    alert("Hệ thống đang bị lỗi!");
                }
            })
            var rowHTML = $('<tr></tr>').data("recordid", item["ScoreID"]);
            $.each(fields, function (fieldIndex, fieldItem) {
                var fieldName = fieldItem.getAttribute('fieldName');
                var fieldValue = item[fieldName];
                if (fieldName === "StudentCode") {
                    fieldValue = studentCode;
                }
                if (fieldName === "StudentName") {
                    fieldValue = studentName;
                }
                rowHTML.append('<td>' + fieldValue + '</td>');
            });
            $('.main-table tbody').append(rowHTML);
        });

    }
}