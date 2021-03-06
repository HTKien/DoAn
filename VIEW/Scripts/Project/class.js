$(document).ready(function () {
    var call_class = new Class();
    $("#search_fulltable_class").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#table_class tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
})

class Class extends BaseClass {

    constructor() {
        super();
        this.InitEvent();


    }
   
    InitEvent() {

        //sự kiện click chuột vào một hàng: 
        $('tbody').on('click', 'tr', this.RowOnClick);
        $(document).on('click', '#sort_by_class_name', this.sortByClassName.bind(this));
        $(document).on('click', '#sort_by_school_year', this.sortBySchoolYear.bind(this));
        $(document).on('click', '#sort_by_student_number', this.sortByStudentNumber.bind(this));


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

        //sự kiện vào một lớp học:
        $(document).on('click', 'button.goclass', this.goClass.bind(this));

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
        $(document).on('click', '#save', this.SaveClass.bind(this));

        

        //sự kiện cho nút Hủy bỏ trong dialog :
        $(document).on('click', '#huy-bo', this.CloseDiaLog.bind(this));
        $(document).on('click', '#huy-bo-edit', this.CloseDiaLogEdit.bind(this));


        //sự kiện cho nút sửa khách hàng: 
        $(document).on('click', 'button.edit', this.showDiaLogEdit.bind(this));

        //sự kiện cho nút cất trong SỬA KHÁCH HÀNG:
        $(document).on('click', '#save-edit', this.SaveClassEdit.bind(this));

        //sự kiện cho nút cất và Thêm trong dialog Sửa:









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
        this.loadAllTeacher();

    }
    goClass() {
        var me = this;
        var listRow = $('.select');
        var listID = [];

        $.each(listRow, function (index, item) {
            listID.push($(item).data('recordid'));
        });
        let classIDStorage = localStorage.getItem('classIDStorage') ? JSON.parse(localStorage.getItem('classIDStorage')) : [];

        classIDStorage.push({
            id: listID[0]
        });
        localStorage.setItem('classIDStorage', JSON.stringify(classIDStorage));
        location.href = "/Views/go_class.html";
    }
     
    showDiaLogEdit() {
        
        $('#dialog-edit').dialog({
            modal: true,
        });
        this.loadAllTeacherEdit();

        var me = this;
        var listRow = $('.select');
        var listID = [];

        $.each(listRow, function (index, item) {
            listID.push($(item).data('recordid'));
        });

        $.ajax({
            method: 'GET',
            url: '/classes/' + listID[0],
            success: function (res) {
                $('#code-dialog-edit').val(res.Code);
                $('#name-dialog-edit').val(res.Name);
                $('#schoolyear-dialog-edit').val(res.SchoolYear);
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
                url: '/classes/' + listID[0],
                success: function (res) {
                    ma = res.Code;
                    ten = res.Name;
                    var html = "Bạn có chắc chắn muốn xóa Lớp học '" + ma + " - " + ten + "' không?";

                    $('#thong-bao').empty();

                    $('#thong-bao').append(html);


                },
                error: function () {
                    alert("Hệ thống đang bị lỗi!");
                }
            });
        } else if (listID.length > 1) {
            var html = "Bạn có chắc chắn muốn xóa những Lớp học đã chọn không?";
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
                        url: '/classes',
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
            $('button.goclass').prop('disabled', true);
        } else if (selected === 1) {
            $('button.delete').removeAttr('disabled');
            $('button.duplicate').removeAttr('disabled');
            $('button.edit').removeAttr('disabled');
            $('button.goclass').removeAttr('disabled');
        } else if (selected > 1) {
            $('button.delete').removeAttr('disabled');
            $('button.duplicate').prop('disabled', true);
            $('button.edit').prop('disabled', true);
            $('button.goclass').prop('disabled', true);
        }


     
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
            url: '/classes',
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

    
    SaveClass() {


        var me = this;
        var object = {};
        var listRow = $('.select');
        var listID = [];

        $.each(listRow, function (index, item) {
            listID.push($(item).data('recordid'));
        });
        

        object["TeacherID"] = listID[0];
        object["Code"] = $('#code-dialog').val();
        object["Name"] = $('#name-dialog').val();
        object["SchoolYear"] = $('#schoolyear-dialog').val();
        object["Note"] = $('#note-dialog').val();
        if (object["Code"] == "" || object["Name"] == "" || object["SchoolYear"] == "") {
            cuteAlert({
                type: "warning",
                title: "Thông báo",
                message: "Bạn phải nhập thông tin các trường bắt buộc!",
                buttonText: "OK"
            })
        } else {
            if (listID.length > 1) {
                cuteAlert({
                    type: "warning",
                    title: "Thông báo",
                    message: "Chỉ được chọn tối đa 1 giáo viên!",
                    buttonText: "OK"
                })
            } else if (listID.length <= 1) {
                $.ajax({
                    method: 'POST',
                    url: '/classes',
                    data: JSON.stringify(object),
                    contentType: "application/json; charset=utf-8",
                    success: function (res) {
                        $('.dong1 input').val("");
                        $('#dialog-add').dialog('close');
                        me.loadData();
                        cuteAlert({
                            type: "success",
                            title: "Thông báo",
                            message: "Thêm lớp học thành công!",
                            buttonText: "OK"
                        })
                    },
                    error: function () {
                        alert("Hệ thống đang bị lỗi!");
                    }
                });
            }
            
        }
    }
    
    SaveClassEdit() {
        var me = this;
        var object = {};

        var listRow = $('.select');
        var listID = [];

        $.each(listRow, function (index, item) {
            listID.push($(item).data('recordid'));
        });

        object["ClassID"] = listID[0];
        object["Code"] = $('#code-dialog-edit').val();
        object["Name"] = $('#name-dialog-edit').val();
        object["SchoolYear"] = $('#schoolyear-dialog-edit').val();
        object["Note"] = $('#note-dialog-edit').val();
        object["TeacherID"] = listID[1];

        if (object["Code"] == "" || object["Name"] == "" || object["SchoolYear"] == "") {
            cuteAlert({
                type: "warning",
                title: "Thông báo",
                message: "Bạn phải nhập thông tin các trường bắt buộc!",
                buttonText: "OK"
            })
        } else {
            if (listID.length > 2) {
                cuteAlert({
                    type: "warning",
                    title: "Thông báo",
                    message: "Chỉ được chọn tối đa 1 giáo viên!",
                    buttonText: "OK"
                })
            } else if (listID.length <= 2) {
                $.ajax({
                    method: 'PUT',
                    url: '/classes',
                    data: JSON.stringify(object),
                    contentType: "application/json; charset=utf-8",
                    success: function (res) {
                        $('#dialog-edit').dialog('close');
                        me.loadData();
                        cuteAlert({
                            type: "success",
                            title: "Thông báo",
                            message: "Sửa lớp học thành công!",
                            buttonText: "OK"
                        })
                    },
                    error: function () {
                        alert("Hệ thống đang bị lỗi!");
                    }
                });
            }
            
        }

    }
    

}