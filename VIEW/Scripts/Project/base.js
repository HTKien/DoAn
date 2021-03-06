class Base {
    constructor() {
        this.loadData();
    }
    
    getAllData() {
        var fakeData = [];
        $.ajax({
            method: 'GET',
            url: '/parents',
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
   
    getData() {
        var pageIndex = $('.page-index').val();
        var pageSize = $('.page-size option:selected').val();


        this.FormatBtn(pageIndex, pageSize);
        var fakeData = [];


        if (pageIndex > (parseInt(this.getAllData().length / pageSize) + 1)) {
            if (this.getAllData().length % pageSize !== 0) {
                $('.page-index').val((parseInt(this.getAllData().length / pageSize) + 1));

            } else {
                $('.page-index').val(parseInt(this.getAllData().length / pageSize));

            }


            $.ajax({
                method: 'GET',
                url: '/parents/' + $('.page-index').val() + '/' + pageSize,

                dataType: 'json',
                async: false,
                success: function (res) {
                    fakeData = res;


                },
                error: function (res) {
                    alert("Hệ thống đang bị lỗi!");
                }
            })

        } else {
            $.ajax({
                method: 'GET',
                url: '/parents/' + pageIndex + '/' + pageSize,

                dataType: 'json',
                async: false,
                success: function (res) {
                    fakeData = res;


                },
                error: function (res) {
                    alert("Hệ thống đang bị lỗi!");
                }
            })


        }


        return fakeData;


    }
    
    getRefreshData() {
        var pageIndex = $('.page-index').val(1);
        var pageSize = $('.page-size').val(25);

        var pageIndex = $('.page-index').val();
        var pageSize = $('.page-size option:selected').val();
        this.FormatBtn(pageIndex, pageSize);

        var fakeData = [];
        $.ajax({
            method: 'GET',
            url: '/parents/' + pageIndex + '/' + pageSize,

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
            url: '/parents/' + pageIndex + '/' + pageSize,
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

    
    loadTrangTruoc() {
        $('.loading').show();



        $('.page-index').val($('.page-index').val() - 1);

        var pageIndex = $('.page-index').val();

        var pageSize = $('.page-size option:selected').val();
        this.FormatBtn(pageIndex, pageSize);




        var fakeData = [];
        $.ajax({
            method: 'GET',
            url: '/parents/' + pageIndex + '/' + pageSize,
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
     
    loadTrangSau() {
        $('.loading').show();



        $('.page-index').val(parseInt($('.page-index').val()) + 1);

        var pageIndex = $('.page-index').val();

        var pageSize = $('.page-size option:selected').val();
        this.FormatBtn(pageIndex, pageSize);




        var fakeData = [];
        $.ajax({
            method: 'GET',
            url: '/parents/' + pageIndex + '/' + pageSize,
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
            url: '/parents/' + pageIndex + '/' + pageSize,
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
    

    CountRecord() {
        var me = this;

        if ($('.main-table tbody tr').length === 0) {
            $('.phan-trang .dem-ban-ghi').text("Không có dữ liệu hoặc vượt quá số trang!");
            $('.phan-trang .dem-ban-ghi').css("color", "red");



        } else {
            var a = ($('.page-index').val() - 1) * $('.page-size').val() + 1;
            var b = ($('.page-index').val() - 1) * $('.page-size').val() + $('.main-table tbody tr').length;
            var c = me.getAllData().length;

            if (c % ($('.page-size').val()) !== 0) {
                $('.phan-trang .so-trang-max').text("trên " + parseInt(c / ($('.page-size').val()) + 1));

            } else if (c % ($('.page-size').val()) === 0) {
                $('.phan-trang .so-trang-max').text("trên " + parseInt(c / ($('.page-size').val())));

            }

            $('.phan-trang .dem-ban-ghi').text("Hiển thị " + a + " - " + b + " trên " + c + " kết quả");
            $('.phan-trang .dem-ban-ghi').css("color", "black");

        }



    }
    
    FormatBtn(pageIndex, pageSize) {
        if (this.getAllData().length % pageSize !== 0) {
            $('.page-index').attr("max", this.getAllData().length / pageSize + 1);
            if (pageIndex > parseInt((this.getAllData().length / pageSize))) {
                $('.page-index').prop('disabled', true);
                $('button#trang-sau').prop('disabled', true);
                $('button#trang-cuoi').prop('disabled', true);



            } else {
                $('.page-index').prop('disabled', false);
                $('button#trang-sau').prop('disabled', false);
                $('button#trang-cuoi').prop('disabled', false);




            }

        } else if (this.getAllData().length % pageSize === 0) {
            $('.page-index').attr("max", this.getAllData().length / pageSize);
            if (pageIndex >= parseInt((this.getAllData().length / pageSize))) {
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

         




        //}
        $('button.duplicate').prop('disabled', true);
        $('button.delete').prop('disabled', true);
        $('button.edit').prop('disabled', true);

    }

    
    AppenData(fakeData) {
        var fields = $('.main-table th[fieldName]');
        $('.main-table tbody').empty();
        $.each(fakeData, function (index, item) {
            var rowHTML = $('<tr></tr>').data("recordid", item["ParentID"]);
            $.each(fields, function (fieldIndex, fieldItem) {
                var fieldName = fieldItem.getAttribute('fieldName');
                var fieldValue = item[fieldName];
                rowHTML.append('<td>' + fieldValue + '</td>');
            });
            $('.main-table tbody').append(rowHTML);
        });

    }
}