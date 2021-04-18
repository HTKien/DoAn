$(document).ready(function () {
    var student = new Student();
})

class Student extends BaseStudent {

    constructor() {
        super();
        this.InitEvent();


    }
    //Hàm để gọi các sự kiện xử lý cho bài toán
    //Người tạo: Hàn Trung Kiên
    //Ngày tạo: 22/8/2019
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
        $(document).on('click', '#delete_score', this.deleteScore.bind(this));
        $(document).on('click', '#edit_score', this.editScore.bind(this));

        //sự kiện show dialog thêm khách hàng:
        $(document).on('click', 'button.add', this.showDiaLogAdd.bind(this));
        $(document).on('click', 'button.detail', this.showDiaLogDetail.bind(this));

        //sự kiện đóng dialog khi nhấn icon đóng:
        $(document).on('click', 'button.icon-tieu-de-dialog-add', this.CloseDiaLog.bind(this));
        $(document).on('click', 'button.icon-tieu-de-dialog-detail', this.CloseDiaLogDetail.bind(this));

        $(document).on('click', 'button.icon-tieu-de-dialog-edit', this.CloseDiaLogEdit.bind(this));


        //sự kiện cho nút Nạp là load lại bảng dữ liệu: 
        $(document).on('click', 'button.nap', this.loadRefreshData.bind(this));

        //sự kiên click vào ô checkox cho 2 cột 5Food và Ngừng theo dõi: 
        $(document).on('click', '#checkbox', this.Check);

        //sự kiện cho phím Ctrl+ leftClick vào một hàng:
        $(document).on('keydown', 'main-table tbody tr', this.ChonNhieu.bind(this));

        //sự kiện thêm mới khách hàng: 
        $(document).on('click', '#save', this.SaveStudent.bind(this));
        $(document).on('click', '#add_score', this.AddScore.bind(this));


        //sự kiện cho nút Hủy bỏ trong dialog :
        $(document).on('click', '#huy-bo', this.CloseDiaLog.bind(this));
        $(document).on('click', '#huy-bo-edit', this.CloseDiaLogEdit.bind(this));





        //sự kiện cho nút sửa khách hàng: 
        $(document).on('click', 'button.edit', this.showDiaLogEdit.bind(this));

        //sự kiện cho nút cất trong SỬA KHÁCH HÀNG:
        $(document).on('click', '#save-edit', this.SaveStudentEdit.bind(this));










    }
    /**
     * Hàm thực hiện sự kiện click vào checkbox cho hai cột Thành viên 5Food và Ngừng theo dõi: 
     * Người tạo: Hàn Trung Kiên
     * Ngày tạo: 25/8/2019
     * */
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
    /**
     * Hàm thực hiện việc đóng dialog Thêm khách hàng
     * Người tạo: Hàn Trung Kiên
     * Ngày tạo: 25/8/2019
     * */
    CloseDiaLog() {
        $('#dialog-add').dialog("close");


    }
    CloseDiaLogDetail() {
        $('#dialog-student-detail').dialog("close");

    }

    /**
     * Hàm thực hiện việc đóng dialog Sửa khách hàng
     * Người tạo: Hàn Trung Kiên
     * Ngày tạo: 25/8/2019
     * */
    CloseDiaLogEdit() {
        $('#dialog-edit').dialog("close");

    }

    /**
     * Hàm thực hiện việc mở dialog Thêm khách hàng
     * Người tạo: Hàn Trung Kiên
     * Ngày tạo: 25/8/2019
     * */
    showDiaLogAdd() {
        $('#dialog-add').dialog({

            modal: true,


        });

    }
    student_id;
    showDiaLogDetail() {
        $('#dialog-student-detail').dialog({
            modal: true,
        });
        var me = this;
        var listRow = $('.select');
        var listID = [];
        var class_id;

        $.each(listRow, function (index, item) {
            listID.push($(item).data('recordid'));
        });

        $.ajax({
            method: 'GET',
            url: '/students/' + listID[0],
            success: function (res) {
                class_id = res.ClassID;
                $('#dialog-student-detail #student_code').text("Mã học sinh: " + res.Code);
                $('#dialog-student-detail #student_name').text("Họ và tên: " + res.Name);
                $('#dialog-student-detail #student_sex').text("Giới tính: " + res.Sex);
                $('#dialog-student-detail #student_birthday').text("Ngày sinh: " + res.Birthday);
                $('#dialog-student-detail #student_address').text("Địa chỉ: " + res.Address);
                $('#dialog-student-detail #student_bonus').text("Số khen thưởng/tuyên dương: " + res.Bonus);
                $('#dialog-student-detail #student_critic').text("Số phê bình: " + res.Critic);
                $('#dialog-student-detail #student_attendance').text("Điểm danh: " + res.Attendence);
                $('#dialog-student-detail #student_conduct').text("Hạnh kiểm: " + res.Conduct);
                //$('#dialog-student-detail #student_mediumscore').text("Điểm TB: " + res.MediumScore);
                $('#dialog-student-detail #student_classify').text("Xếp loại: " + res.Classify);
                $('#dialog-student-detail #student_status').text("Tình trạng: " + res.Status);
                $('#dialog-student-detail #parent_name').text("Tên phụ huynh: " + res.ParentName);
                $('#dialog-student-detail #parent_phone').text("Số điện thoại: " + res.ParentPhone);
                $.ajax({
                    method: 'GET',
                    url: '/classes/' + class_id,
                    dataType: 'json',
                    async: false,
                    success: function (res) {
                        $('#dialog-student-detail #student_class').text("Lớp: " + res.Code + " - " + res.Name);
                        var teacherID = res.TeacherID;
                        $.ajax({
                            method: 'GET',
                            url: '/teachers/' + teacherID,
                            dataType: 'json',
                            async: false,
                            success: function (res) {
                                $('#dialog-student-detail #student_teacher').text("Giáo viên chủ nhiệm: " + res.Name);

                            },
                            error: function (res) {
                                alert("Hệ thống đang bị lỗi!");
                            }
                        })
                    },
                    error: function (res) {
                        alert("Hệ thống đang bị lỗi!");
                    }
                });
            },
            error: function () {
                alert("Hệ thống đang bị lỗi!");
            }
        });
        this.student_id = listID[0];
        this.loadScore(this.student_id);

    }

    /**
     * Hàm thực hiện việc mở dialog Sửa học sinh
     * Người tạo: Hàn Trung Kiên
     * */
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
            url: '/students/' + listID[0],
            success: function (res) {
                $('#code-dialog-edit').val(res.Code);
                $('#name-dialog-edit').val(res.Name);
                $('#sex-dialog-edit').val(res.Sex);
                $('#birthday-dialog-edit').val(res.Birthday);
                $('#address-dialog-edit').val(res.Address);
                $('#parentname-dialog-edit').val(res.ParentName);
                $('#parentphone-dialog-edit').val(res.ParentPhone);
                $('#note-dialog-edit').val(res.Note);
            },
            error: function () {
                alert("Hệ thống đang bị lỗi!");
            }
        });


    }
    /**
     * Hàm thực hiện show dialog xác nhận xóa khách hàng
     * Người tạo: Hàn Trung Kiên
     * Ngày tạo: 24/8/2019
     * */
    deleteScore() {
        alert("Xác nhận xóa điểm?");
        var me = this;
        var listRow = $('.select');
        var listID = [];
        $.each(listRow, function (index, item) {
            listID.push($(item).data('recordid'));
        });
        var listID_update = [];
        for (var i = 1; i < listID.length; i++) {
            listID_update.push(listID[i]);
        }
        $.ajax({
            method: 'DELETE',
            url: '/scores',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(listID_update),
            success: function (res) {
                alert("Xóa điểm thành công!");
                me.loadScore(me.student_id);
            },
            error: function (res) {
                alert("Hệ thống đang bị lỗi!");
            }
        });

        
    }
    editScore() {
        var me = this;
        var listRow = $('.select');
        var listID = [];
        $.each(listRow, function (index, item) {
            listID.push($(item).data('recordid'));
        });
        var listID_update = [];
        for (var i = 1; i < listID.length; i++) {
            listID_update.push(listID[i]);
        }
        if ($('#edit_score').text() == "Sửa") {
            $.ajax({
                method: 'GET',
                url: '/scores/' + listID[1],
                dataType: 'json',
                async: false,
                success: function (res) {
                    $('#score_subject').val(res.Subject);
                    $('#score_type').val(res.Type);
                    $('#score_point').val(res.Point);
                    $('#edit_score').text("Lưu lại")
                },
                error: function (res) {
                    alert("Hệ thống đang bị lỗi!");
                }
            })
           
        } else if ($('#edit_score').text() == "Lưu lại") {
            var object = {};

            object["ScoreID"] = listID[1];
            object["Subject"] = $('#score_subject').val();
            object["Type"] = $('#score_type').val();
            object["Point"] = $('#score_point').val();
            object["StudentID"] = me.student_id;

            $.ajax({
                method: 'PUT',
                url: '/scores',
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    alert("Sửa điểm thành công!");
                    me.loadScore(me.student_id);
                    $('#edit_score').text("Sửa");
                    $('#score_subject').val("");
                    $('#score_type').val("");
                    $('#score_point').val("");

                },
                error: function () {
                    alert("Hệ thống đang bị lỗi! Vui lòng liên hệ MISA!");
                }
            });
        }
        

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
                url: '/students/' + listID[0],
                success: function (res) {
                    ma = res.Code;
                    ten = res.Name;
                    var html = "Bạn có chắc chắn muốn xóa Học sinh << " + ma + " - " + ten + " >> không?";

                    $('#thong-bao').empty();

                    $('#thong-bao').append(html);


                },
                error: function () {
                    alert("Hệ thống đang bị lỗi!");
                }
            });
        } else if (listID.length > 1) {
            var html = "Bạn có chắc chắn muốn xóa những Học sinh đã chọn không?";
            $('#thong-bao').empty();
            $('#thong-bao').append(html);
        }



        //var html = "Bạn có chắc chắn muốn xóa khách hàng << " + ma + " - " + ten + " >> không?";
        //$('#thong-bao').empty();

        //$('#thong-bao').append(html);

        $('#dialog').dialog({
            title: "CUKCUK - Quản lý nhà hàng",
            modal: true,
            buttons: {
                "Có": function () {
                    $.ajax({
                        method: 'DELETE',
                        url: '/students',
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

    /**
     * Hàm thực hiện việc click chuột vào một bản ghi dữ liệu
     * Người tạo: Hàn Trung Kiên
     * Ngày tạo: 11/8/2019
     * */
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
    /**
     *Hàm thực hiện load lại dữ liệu khi chọn trang tương ứng
     * Người tạo: Hàn Trung Kiên
     * Ngày tạo: 11/8/2019
     * */
    PagingData(event) {
        if (event.keyCode === 13) {
            $('.main-table tbody').empty();

            this.loadData();



        }



    }

    /**
     * Hàm thực hiện sự kiện xóa dữ liệu khách hàng :
     * Người tạo: Hàn Trung Kiên
     * Ngày tạo: 17/8/2019
     * */
    ClickButtonXoa(event) {


        var me = this;
        var listRow = $('.select');
        var listID = [];
        $.each(listRow, function (index, item) {
            listID.push($(item).data('recordid'));
        });
        $.ajax({
            method: 'DELETE',
            url: '/students',
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

    /**
     * Hàm thực hiện lưu khách hàng lên database : (dialog Thêm mới)
     * Người tạo: Hàn Trung Kiên
     * Ngày tạo: 26/8/2019
     * */
    SaveStudent() {

        var me = this;
        var object = {};


        object["Code"] = $('#code-dialog').val();
        object["Name"] = $('#name-dialog').val();
        object["Sex"] = $('#sex-dialog').val();
        object["Birthday"] = $('#birthday-dialog').val();
        object["Address"] = $('#address-dialog').val();
        object["ParentName"] = $('#parentname-dialog').val();
        object["ParentPhone"] = $('#parentphone-dialog').val();
        object["Note"] = $('#note-dialog').val();
        object["ClassID"] = classID;

        if (object["Code"] == "" || object["Name"] == "" || object["Sex"] == "" || object["Birthday"] === "" || object["Address"] === "" || object["ParentName"] === "" || object["ParentPhone"] === "") {
            alert("Bạn phải nhập thông tin trong các trường bắt buộc!");
        } else {
            $.ajax({
                method: 'POST',
                url: '/students',
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    $('.dong1 input').val("");
                    $('#dialog-add').dialog('close');
                    me.loadData();
                },
                error: function () {
                    alert("Hệ thống đang bị lỗi! Vui lòng liên hệ MISA!");
                }
            });
        }
    }
    AddScore() {
        var me = this;
        var object = {};
        object["Subject"] = $('#score_subject').val();
        object["Type"] = $('#score_type').val();
        object["Point"] = $('#score_point').val();
        object["StudentID"] = this.student_id;
        if (false) {
            alert("Bạn phải nhập thông tin trong các trường bắt buộc!");
        } else {
            $.ajax({
                method: 'POST',
                url: '/scores',
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    alert("Thêm mới điểm thành công!");
                    $('#score_subject').val("Toán");
                    $('#score_type').val("Điểm miệng");
                    $('#score_point').val("");
                    me.loadScore(me.student_id);

                },
                error: function () {
                    alert("Hệ thống đang bị lỗi! Vui lòng liên hệ MISA!");
                }
            });
        }
    }
    /**
    * Hàm thực hiện lưu khách hàng lên database : (dialog Sửa)
    * Người tạo: Hàn Trung Kiên
    * Ngày tạo: 26/8/2019
    * */
    SaveStudentEdit() {
        var me = this;
        var object = {};

        var listRow = $('.select');
        var listID = [];

        $.each(listRow, function (index, item) {
            listID.push($(item).data('recordid'));
        });

        object["StudentID"] = listID[0];
        object["Code"] = $('#code-dialog-edit').val();
        object["Name"] = $('#name-dialog-edit').val();
        object["Sex"] = $('#sex-dialog-edit').val();
        object["Birthday"] = $('#birthday-dialog-edit').val();
        object["Address"] = $('#address-dialog-edit').val();
        object["ParentName"] = $('#parentname-dialog-edit').val();
        object["ParentPhone"] = $('#parentphone-dialog-edit').val();
        object["Note"] = $('#note-dialog-edit').val();
        object["ClassID"] = classID;

        if (object["Code"] == "" || object["Name"] == "" || object["Sex"] == "" || object["Birthday"] === "" || object["Address"] === "" || object["ParentName"] === "" || object["ParentPhone"] === "") {
            alert("Bạn phải nhập thông tin trong các trường bắt buộc!");
        } else {
            $.ajax({
                method: 'PUT',
                url: '/students',
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    console.log(object);
                    //$('.dong1 input').val("");
                    $('#dialog-edit').dialog('close');
                    me.loadData();
                },
                error: function () {
                    alert("Hệ thống đang bị lỗi! Vui lòng liên hệ MISA!");
                }
            });
        }

    }


}