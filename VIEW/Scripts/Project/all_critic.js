$(document).ready(function () {
    var critic = new Critic();
})

class Critic extends BaseCritic {

    constructor() {
        super();
        this.InitEvent();


    }
     
    InitEvent() {

         
        $('tbody').on('click', 'tr', this.RowOnClick);

         
        $(document).on('keyup', 'input.page-index', this.PagingData.bind(this));

        $(document).on('change', '.page-size', this.loadData.bind(this));

        $(document).on('click', '#trang-dau', this.loadTrangDau.bind(this));

        $(document).on('click', '#trang-truoc', this.loadTrangTruoc.bind(this));

        $(document).on('click', '#trang-sau', this.loadTrangSau.bind(this));

        $(document).on('click', '#trang-cuoi', this.loadTrangCuoi.bind(this));

        $(document).on('click', '#refresh', this.loadRefreshData.bind(this));



        $(document).on('click', 'button.delete', this.showDiaLog.bind(this));

        $(document).on('click', 'button.add', this.showDiaLogAdd.bind(this));
        $(document).on('click', 'button.importfile', this.AddByFile.bind(this));

        $(document).on('click', 'button.icon-tieu-de-dialog-add', this.CloseDiaLog.bind(this));
        $(document).on('click', 'button.icon-tieu-de-dialog-edit', this.CloseDiaLogEdit.bind(this));


        $(document).on('click', 'button.nap', this.loadRefreshData.bind(this));

        $(document).on('click', '#checkbox', this.Check);

        $(document).on('keydown', 'main-table tbody tr', this.ChonNhieu.bind(this));

        $(document).on('click', '#save', this.SaveCritic.bind(this));

        $(document).on('click', '#cat-them', this.CatVaThem.bind(this));

        $(document).on('click', '#huy-bo', this.CloseDiaLog.bind(this));
        $(document).on('click', '#huy-bo-edit', this.CloseDiaLogEdit.bind(this));


        $(document).on('click', 'button.edit', this.showDiaLogEdit.bind(this));

        $(document).on('click', '#save-edit', this.SaveCriticEdit.bind(this));

        $(document).on('click', '#cat-them-edit', this.CatVaThemEdit.bind(this));









    }
     
    Check() {
        if ($(this).hasClass('uncheck')) {
            $(this).removeClass('uncheck').addClass('check');

        } else if ($(this).hasClass('check')) {
            $(this).removeClass('check').addClass('uncheck');


        }


    }
    ChonNhieu() {
        alert(1);
    }
     
    CloseDiaLog() {
        $('#dialog-add').dialog("close");


    }

    
    CloseDiaLogEdit() {
        $('#dialog-edit').dialog("close");

    }

    showDiaLogAdd() {
        $('#dialog-add').dialog({

            modal: true,


        });

    }
    AddByFile() {
        alert("kien")
    }
     
    showDiaLogEdit() {
        $('#dialog-edit').dialog({
            modal: true,
        });

        var me = this;
        var listRow = $('.select');
        var listID = [];

        $.each(listRow, function (index, item) {
            listID.push($(item).data('recordid'));
        });

        $.ajax({
            method: 'GET',
            url: '/critics/' + listID[0],
            success: function (res) {
                $('#code-dialog-edit').val(res.Code);
                $('#name-dialog-edit').val(res.Name);
                $('#address-dialog-edit').val(res.Address);
                $('#phone-dialog-edit').val(res.Phone);
                $('#sex-dialog-edit').val(res.Sex);
                $('#note-dialog-edit').val(res.Note);
            },
            error: function () {
                alert("Hệ thống đang bị lỗi!");
            }
        });


    }
   
    showDiaLog() {

        var me = this;
        var listRow = $('.select');
        var listID = [];

        $.each(listRow, function (index, item) {
            listID.push($(item).data('recordid'));
        });
        if (listID.length === 1) {
            var ma;
            var ten;
            $.ajax({
                method: 'GET',
                url: '/critics/' + listID[0],
                success: function (res) {
                    ma = res.Code;
                    ten = res.Name;
                    var html = "Bạn có chắc chắn muốn xóa Phê bình đã chọn không?";

                    $('#thong-bao').empty();

                    $('#thong-bao').append(html);


                },
                error: function () {
                    alert("Hệ thống đang bị lỗi!");
                }
            });
        } else if (listID.length > 1) {
            var html = "Bạn có chắc chắn muốn xóa những Phê bình đã chọn không?";
            $('#thong-bao').empty();
            $('#thong-bao').append(html);
        }



       

        $('#dialog').dialog({
            title: "Xác nhận",
            modal: true,
            buttons: {
                "Có": function () {
                    $.ajax({
                        method: 'DELETE',
                        url: '/critics',
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(listID),
                        success: function (res) {
                        },
                        error: function (res) {
                            alert("Hệ thống đang bị lỗi!");
                        }
                    });

                    me.loadData();
                    if ($('.main-table tbody tr').length === 0) {
                        me.loadTrangTruoc();

                    }

                    $(this).dialog("close");



                },
                "Không": function () {
                    $(this).dialog("close");
                }
            },



        });



    }

    
    RowOnClick() {
        if ($(this).hasClass('select')) {
            $(this).removeClass('select');

        } else {
            $(this).addClass('select');

        }
        var selected = $('.main-table tbody tr.select').length;
        if (selected === 0) {
            $('button.delete').prop('disabled', true);
            $('button.duplicate').prop('disabled', true);
            $('button.edit').prop('disabled', true);
        } else if (selected === 1) {
            $('button.delete').removeAttr('disabled');
            $('button.duplicate').removeAttr('disabled');
            $('button.edit').removeAttr('disabled');
        } else if (selected > 1) {
            $('button.delete').removeAttr('disabled');
            $('button.duplicate').prop('disabled', true);
            $('button.edit').prop('disabled', true);
        }


        //$('.main-table tbody tr').removeClass('select');
        //$(this).addClass('select');
        //$('button.delete').removeAttr('disabled');
        //$('button.duplicate').removeAttr('disabled');
        //$('button.edit').removeAttr('disabled');
    }
    
    PagingData(event) {
        if (event.keyCode === 13) {
            $('.main-table tbody').empty();

            this.loadData();



        }



    }

    
    ClickButtonXoa(event) {


        var me = this;
        var listRow = $('.select');
        var listID = [];
        $.each(listRow, function (index, item) {
            listID.push($(item).data('recordid'));
        });
        $.ajax({
            method: 'DELETE',
            url: '/critics',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(listID),
            success: function (res) {
                me.loadData();
            },
            error: function (res) {
                alert("Hệ thống đang bị lỗi!");
            }
        });








    }

   
    SaveCritic() {

        var me = this;
        var object = {};


        object["Code"] = $('#code-dialog').val();
        object["Name"] = $('#name-dialog').val();
        object["Address"] = $('#address-dialog').val();
        object["Phone"] = $('#phone-dialog').val();
        object["Sex"] = $('#sex-dialog').val();
        object["Note"] = $('#note-dialog').val();
        if (object["Code"] == "" || object["Name"] == "" || object["Phone"] == "" || object["Sex"] ==="") {
            alert("Bạn phải nhập thông tin trong các trường bắt buộc!");
        } else {
            $.ajax({
                method: 'POST',
                url: '/critics',
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    $('.dong1 input').val("");
                    $('#dialog-add').dialog('close');
                    me.loadData();
                },
                error: function () {
                    alert("Hệ thống đang bị lỗi!");
                }
            });
        }
    }
     
    SaveCriticEdit() {
        var me = this;
        var object = {};

        var listRow = $('.select');
        var listID = [];

        $.each(listRow, function (index, item) {
            listID.push($(item).data('recordid'));
        });

        object["CriticID"] = listID[0];
        object["Code"] = $('#code-dialog-edit').val();
        object["Name"] = $('#name-dialog-edit').val();
        object["Address"] = $('#address-dialog-edit').val();
        object["Phone"] = $('#phone-dialog-edit').val();
        object["Sex"] = $('#sex-dialog-edit').val();
        object["Note"] = $('#note-dialog-edit').val();
        if (object["Ma"] == "" || object["Ten"] == "" || object["DienThoai"] == "" || object["Sex"] === "") {
            alert("Bạn phải nhập thông tin trong các trường bắt buộc!");
        } else {
            $.ajax({
                method: 'PUT',
                url: '/critics',
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    //$('.dong1 input').val("");
                    $('#dialog-edit').dialog('close');
                    me.loadData();
                },
                error: function () {
                    alert("Hệ thống đang bị lỗi!");
                }
            });
        }

    }
     
    CatVaThemEdit() {
        var me = this;
        var object = {};

        var listRow = $('.select');
        var listID = [];

        $.each(listRow, function (index, item) {
            listID.push($(item).data('recordid'));
        });

        object["ID"] = listID[0];
        object["Ma"] = $('#ma-dialog-edit').val();
        object["Ten"] = $('#ten-dialog-edit').val();
        object["TenCongTy"] = $('#ten-cong-ty-dialog-edit').val();
        object["MaSoThue"] = $('#ma-so-thue-dialog-edit').val();
        object["DiaChi"] = $('#dia-chi-dialog-edit').val();
        object["DienThoai"] = $('#dien-thoai-dialog-edit').val();
        object["Email"] = $('#email-dialog-edit').val();
        object["MaTheThanhVien"] = $('#ma-the-thanh-vien-dialog-edit').val();
        object["HangThe"] = $('#hang-the-dialog-edit').val();
        object["TienNo"] = $('#tien-no-edit').val();
        object["GhiChu"] = $('#ghi-chu-dialog-edit').val();
        if (object["Ma"] == "" || object["Ten"] == "" || object["DienThoai"] == "") {
            alert("Bạn phải nhập thông tin trong các trường bắt buộc!");
        } else {
            $.ajax({
                method: 'PUT',
                url: '/khachhangs',
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    me.loadData();

                    //$('.dong1 input').val("");
                    $('#dialog-edit').dialog('close');
                    me.showDiaLogAdd();


                },
                error: function () {
                    alert("Hệ thống đang bị lỗi!");
                }
            });
        }

    }
     
    CatVaThem() {
        var me = this;
        var object = {};


        object["Ma"] = $('#ma-dialog').val();
        object["Ten"] = $('#ten-dialog').val();
        object["TenCongTy"] = $('#ten-cong-ty-dialog').val();
        object["MaSoThue"] = $('#ma-so-thue-dialog').val();
        object["DiaChi"] = $('#dia-chi-dialog').val();
        object["DienThoai"] = $('#dien-thoai-dialog').val();
        object["Email"] = $('#email-dialog').val();
        object["MaTheThanhVien"] = $('#ma-the-thanh-vien-dialog').val();
        object["HangThe"] = $('#hang-the-dialog').val();
        object["TienNo"] = $('#tien-no').val();
        object["GhiChu"] = $('#ghi-chu-dialog').val();
        if (object["Ma"] == "" || object["Ten"] == "" || object["DienThoai"] == "") {
            alert("Bạn phải nhập thông tin trong các trường bắt buộc!");
        } else {
            $.ajax({
                method: 'POST',
                url: '/khachhangs',
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                success: function (res) {

                    me.loadData();
                    $('.dong1 input').val("");
                    $('#dialog-add').dialog();
                },
                error: function () {
                    alert("Hệ thống đang bị lỗi!");
                }
            });
        }

    }

}