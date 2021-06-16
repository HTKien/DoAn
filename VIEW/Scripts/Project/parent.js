$(document).ready(function () {
    var parent = new Parent();
})

class Parent extends Base {

    constructor() {
        super();
        this.InitEvent();


    }
 
    InitEvent() {

        //sự kiện click chuột vào một hàng: 
        $('tbody').on('click', 'tr', this.RowOnClick);

        //sự kiện thay đổi số trang thì load lại dữ liệu cho trang tương ứng :
        $(document).on('keyup', 'input.page-index', this.PagingData.bind(this));

        //sự kiện thay đổi kích thước trang thì phải load lại data luôn:
        $(document).on('change', '.page-size', this.loadData.bind(this));

        //sự kiện quay về trang đầu tiên:
        $(document).on('click', '#trang-dau', this.loadTrangDau.bind(this));

        //sự kiện cho nút quay lại trang trước:
        $(document).on('click', '#trang-truoc', this.loadTrangTruoc.bind(this));

        //sự kiện cho nút load trang sau:
        $(document).on('click', '#trang-sau', this.loadTrangSau.bind(this));

        //sự kiện cho nút load trang cuối: 
        $(document).on('click', '#trang-cuoi', this.loadTrangCuoi.bind(this));

        //sự kiện cho nút refresh ở phần trang:
        $(document).on('click', '#refresh', this.loadRefreshData.bind(this));

        //sự kiện chọn một hay nhiều hàng rồi ấn nút xóa thì xóa dữ liệu:
        //$(document).on('click', 'button.delete', this.ClickButtonXoa.bind(this));


        //sự kiện show dialog xác nhận xóa khách hàng:
        $(document).on('click', 'button.delete', this.showDiaLog.bind(this));

        //sự kiện show dialog thêm khách hàng:
        $(document).on('click', 'button.add', this.showDiaLogAdd.bind(this));

        //sự kiện đóng dialog khi nhấn icon đóng:
        $(document).on('click', 'button.icon-tieu-de-dialog-add', this.CloseDiaLog.bind(this));
        $(document).on('click', 'button.icon-tieu-de-dialog-edit', this.CloseDiaLogEdit.bind(this));


        //sự kiện cho nút Nạp là load lại bảng dữ liệu: 
        $(document).on('click', 'button.nap', this.loadRefreshData.bind(this));

        //sự kiên click vào ô checkox cho 2 cột 5Food và Ngừng theo dõi: 
        $(document).on('click', '#checkbox', this.Check);

        //sự kiện cho phím Ctrl+ leftClick vào một hàng:
        $(document).on('keydown', 'main-table tbody tr', this.ChonNhieu.bind(this));

        //sự kiện thêm mới khách hàng: 
        $(document).on('click', '#save', this.SaveParent.bind(this));

        //sự kiện cho nút cất và thêm khách hàng: 
        $(document).on('click', '#cat-them', this.CatVaThem.bind(this));

        //sự kiện cho nút Hủy bỏ trong dialog :
        $(document).on('click', '#huy-bo', this.CloseDiaLog.bind(this));
        $(document).on('click', '#huy-bo-edit', this.CloseDiaLogEdit.bind(this));


        //sự kiện cho nút sửa khách hàng: 
        $(document).on('click', 'button.edit', this.showDiaLogEdit.bind(this));

        //sự kiện cho nút cất trong SỬA KHÁCH HÀNG:
        $(document).on('click', '#save-edit', this.SaveParentEdit.bind(this));

        //sự kiện cho nút cất và Thêm trong dialog Sửa:
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
            url: '/parents/' + listID[0],
            success: function (res) {
                $('#code-dialog-edit').val(res.Code);
                $('#name-dialog-edit').val(res.Name);
                $('#address-dialog-edit').val(res.Address);
                $('#phone-dialog-edit').val(res.Phone);
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
                url: '/parents/' + listID[0],
                success: function (res) {
                    ma = res.Code;
                    ten = res.Name;
                    var html = "Bạn có chắc chắn muốn xóa Phụ huynh << " + ma + " - " + ten + " >> không?";

                    $('#thong-bao').empty();

                    $('#thong-bao').append(html);


                },
                error: function () {
                    alert("Hệ thống đang bị lỗi!");
                }
            });
        } else if (listID.length > 1) {
            var html = "Bạn có chắc chắn muốn xóa những Phụ huynh đã chọn không?";
            $('#thong-bao').empty();
            $('#thong-bao').append(html);
        }



         

        $('#dialog').dialog({
            title: "CUKCUK - Quản lý nhà hàng",
            modal: true,
            buttons: {
                "Có": function () {
                    $.ajax({
                        method: 'DELETE',
                        url: '/parents',
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
            url: '/parents',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(listID),
            success: function (res) {
                me.loadData();
            },
            error: function (res) {
                alert("Hệ thống đang bị lỗi tại hàm ClickButton!");
            }
        });








    }

    
    SaveParent() {

        var me = this;
        var object = {};


        object["Code"] = $('#code-dialog').val();
        object["Name"] = $('#name-dialog').val();
        object["Address"] = $('#address-dialog').val();
        object["Phone"] = $('#phone-dialog').val();
        object["Note"] = $('#note-dialog').val();
        if (object["Code"] == "" || object["Name"] == "" || object["Phone"] == "") {
            alert("Bạn phải nhập thông tin trong các trường bắt buộc!");
        } else {
            $.ajax({
                method: 'POST',
                url: '/parents',
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
  
    SaveParentEdit() {
        var me = this;
        var object = {};

        var listRow = $('.select');
        var listID = [];

        $.each(listRow, function (index, item) {
            listID.push($(item).data('recordid'));
        });

        object["ParentID"] = listID[0];
        object["Code"] = $('#code-dialog-edit').val();
        object["Name"] = $('#name-dialog-edit').val();
        object["Address"] = $('#address-dialog-edit').val();
        object["Phone"] = $('#phone-dialog-edit').val();
        object["Note"] = $('#note-dialog-edit').val();
        if (object["Ma"] == "" || object["Ten"] == "" || object["DienThoai"] == "") {
            alert("Bạn phải nhập thông tin trong các trường bắt buộc!");
        } else {
            $.ajax({
                method: 'PUT',
                url: '/parents',
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