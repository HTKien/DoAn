$(document).ready(function () {
    var student = new Student();
    $("#search_fulltable").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#student_table_body tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#search_bonus").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#table_bonus_detail tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#search_tuyen_duong").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#table_tuyen_duong tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#search_critic").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#table_critic tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
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
        $(document).on('click', '#sort_by_score', this.sortByScoreMedium.bind(this));
        $(document).on('click', '#sort_by_name', this.sortByName.bind(this));
        $(document).on('click', '#sort_by_bonus', this.sortByBonus.bind(this));
        $(document).on('click', '#sort_by_critic', this.sortByCritic.bind(this));
        $(document).on('keyup', '#code_search', this.searchByCode.bind(this));
        $(document).on('keyup', '#name_search', this.searchByName.bind(this));
        $(document).on('keyup', '#sex_search', this.searchBySex.bind(this));
        $(document).on('keyup', '#bonus_search', this.searchByBonus.bind(this));
        $(document).on('keyup', '#critic_search', this.searchByCritic.bind(this));
        $(document).on('keyup', '#conduct_search', this.searchByConduct.bind(this));
        $(document).on('keyup', '#medium_score_search', this.searchByMediumScore.bind(this));
        $(document).on('keyup', '#classify_search', this.searchByClassify.bind(this));

        //sự kiện chọn một hay nhiều hàng rồi ấn nút xóa thì xóa dữ liệu:
        //$(document).on('click', 'button.delete', this.ClickButtonXoa.bind(this));


        //sự kiện show dialog xác nhận xóa khách hàng:
        $(document).on('click', 'button.delete', this.showDiaLog.bind(this));
        $(document).on('click', 'button.attendence', this.submitAttendence.bind(this));
        $(document).on('click', '#delete_score', this.deleteScore.bind(this));
        $(document).on('click', '#delete_bonus', this.deleteBonus.bind(this));
        $(document).on('click', '#delete_critic', this.deleteCritic.bind(this));
        $(document).on('click', '#edit_score', this.editScore.bind(this));
        $(document).on('click', '#edit_bonus', this.editBonus.bind(this));
        $(document).on('click', '#edit_critic', this.editCritic.bind(this));

        //sự kiện show dialog thêm khách hàng:
        $(document).on('click', 'button.add', this.showDiaLogAdd.bind(this));
        $(document).on('click', 'button.detail', this.showDiaLogDetail.bind(this));
        $(document).on('click', 'button.submit_score', this.showDiaLogScore.bind(this));

        //sự kiện đóng dialog khi nhấn icon đóng:
        $(document).on('click', 'button.icon-tieu-de-dialog-add', this.CloseDiaLog.bind(this));
        $(document).on('click', 'button.icon-tieu-de-dialog-detail', this.CloseDiaLogDetail.bind(this));
        $(document).on('click', 'button.icon-tieu-de-dialog-score', this.CloseDiaLogScore.bind(this));

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
        $(document).on('click', '#add_bonus', this.AddBonus.bind(this));
        $(document).on('click', '#add_critic', this.AddCritic.bind(this));
        $(document).on('click', '#save_submit_score', this.SaveSubmitScore.bind(this));


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
    CloseDiaLogScore() {
        $('#dialog-score').dialog("close");

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
    showDiaLogScore() {
        $('#dialog-score').dialog({

            modal: true,


        });
        this.loadSubmitScore();
        sortTable("table_submit_score", 0, ">");
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
                $('#dialog-student-detail #student_bonus').text("Điểm cộng (khen thưởng): " + res.Bonus);
                $('#dialog-student-detail #student_critic').text("Điểm trừ (phê bình): " + res.Critic);
                $('#dialog-student-detail #student_attendance').text("Điểm danh: " + res.Attendence + "/" + res.Status);
                $('#dialog-student-detail #student_conduct').text("Hạnh kiểm: " + res.Conduct);
                $('#dialog-student-detail #student_mediumscore').text("Điểm TB các môn: " + res.MediumScore);
                $('#dialog-student-detail #student_classify').text("Xếp loại: " + res.Classify);
                $('#dialog-student-detail #student_status').text("Tình trạng: setup linh hoạt"  );
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
        this.loadBonusStudent(this.student_id);
        this.loadCritic(this.student_id);

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
        cuteAlert({
            type: "question",
            title: "Xác nhận",
            message: "Bạn có chắc chắn xóa điểm đã chọn?",
            confirmText: "Có",
            cancelText: "Hủy"
        }).then((e) => {
            if (e == "confirm") {
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
                        cuteAlert({
                            type: "success",
                            title: "Thông báo",
                            message: "Xóa điểm thành công!",
                            buttonText: "OK"
                        })
                        me.loadScore(me.student_id);
                        me.RowOnClick();
                    },
                    error: function (res) {
                        alert("Hệ thống đang bị lỗi!");
                    }
                });
            }
        });

        

        
    }
    deleteBonus() {
        cuteAlert({
            type: "question",
            title: "Xác nhận",
            message: "Bạn có chắc chắn xóa khen thưởng đã chọn?",
            confirmText: "Có",
            cancelText: "Hủy"
        }).then((e) => {
            if (e == "confirm") {
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
                    url: '/bonusStudents',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(listID_update),
                    success: function (res) {
                        cuteAlert({
                            type: "success",
                            title: "Thông báo",
                            message: "Xóa khen thưởng thành công!",
                            buttonText: "OK"
                        })
                        me.loadBonusStudent(me.student_id);
                        me.RowOnClick();
                    },
                    error: function (res) {
                        alert("Hệ thống đang bị lỗi!");
                    }
                });
            }
        })
        
    }
    deleteCritic() {
        cuteAlert({
            type: "question",
            title: "Xác nhận",
            message: "Bạn có chắc chắn xóa phê bình đã chọn?",
            confirmText: "Có",
            cancelText: "Hủy"
        }).then((e) => {
            if (e == "confirm") {
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
                    url: '/critics',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(listID_update),
                    success: function (res) {
                        cuteAlert({
                            type: "success",
                            title: "Thông báo",
                            message: "Xóa phê bình thành công!",
                            buttonText: "OK"
                        })
                        me.loadCritic(me.student_id);
                        me.RowOnClick();
                    },
                    error: function (res) {
                        alert("Hệ thống đang bị lỗi!");
                    }
                });
            }
        })
        
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
                    $('#edit_score').text("Lưu lại");
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
                    cuteAlert({
                        type: "success",
                        title: "Thông báo",
                        message: "Sửa điểm thành công!",
                        buttonText: "OK"
                    })
                    me.loadScore(me.student_id);
                    $('#edit_score').text("Sửa");
                    $('#score_subject').val("");
                    $('#score_type').val("");
                    $('#score_point').val("");
                    me.RowOnClick();

                },
                error: function () {
                    alert("Hệ thống đang bị lỗi! Vui lòng liên hệ MISA!");
                }
            });
        }
        

    }
    editBonus() {
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
        if ($('#edit_bonus').text() == "Sửa") {
            $.ajax({
                method: 'GET',
                url: '/bonusStudents/' + listID[1],
                dataType: 'json',
                async: false,
                success: function (res) {
                    $('#bonus_time').val(res.Time);
                    $('#bonus_content').val(res.Content);
                    $('#bonus_subject').val(res.Subject);
                    $('#bonus_value').val(res.Value);
                    $('#edit_bonus').text("Lưu lại");
                },
                error: function (res) {
                    alert("Hệ thống đang bị lỗi!");
                }
            })

        } else if ($('#edit_bonus').text() == "Lưu lại") {
            var object = {};

            object["BonusStudentID"] = listID[1];
            object["Time"] = $('#bonus_time').val();
            object["Content"] = $('#bonus_content').val();
            object["Subject"] = $('#bonus_subject').val();
            object["Value"] = $('#bonus_value').val();
            object["StudentID"] = me.student_id;

            $.ajax({
                method: 'PUT',
                url: '/bonusStudents',
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    cuteAlert({
                        type: "success",
                        title: "Thông báo",
                        message: "Sửa khen thưởng thành công!",
                        buttonText: "OK"
                    })
                    me.loadBonusStudent(me.student_id);
                    $('#edit_bonus').text("Sửa");
                    $('#bonus_time').val("");
                    $('#bonus_content').val("");
                    $('#bonus_subject').val("");
                    $('#bonus_value').val("");
                    me.RowOnClick();

                },
                error: function () {
                    alert("Hệ thống đang bị lỗi! Vui lòng liên hệ MISA!");
                }
            });
        }
    }
    editCritic() {
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
        if ($('#edit_critic').text() == "Sửa") {
            $.ajax({
                method: 'GET',
                url: '/critics/' + listID[1],
                dataType: 'json',
                async: false,
                success: function (res) {
                    $('#critic_time').val(res.Time);
                    $('#critic_content').val(res.Content);
                    $('#critic_subject').val(res.Subject);
                    $('#critic_value').val(res.Value);
                    $('#edit_critic').text("Lưu lại");
                },
                error: function (res) {
                    alert("Hệ thống đang bị lỗi!");
                }
            })

        } else if ($('#edit_critic').text() == "Lưu lại") {
            var object = {};

            object["CriticID"] = listID[1];
            object["Time"] = $('#critic_time').val();
            object["Content"] = $('#critic_content').val();
            object["Subject"] = $('#critic_subject').val();
            object["Value"] = $('#critic_value').val();
            object["StudentID"] = me.student_id;

            $.ajax({
                method: 'PUT',
                url: '/critics',
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    cuteAlert({
                        type: "success",
                        title: "Thông báo",
                        message: "Sửa phê bình thành công!",
                        buttonText: "OK"
                    })
                    me.loadCritic(me.student_id);
                    $('#edit_critic').text("Sửa");
                    $('#critic_time').val("");
                    $('#critic_content').val("");
                    $('#critic_subject').val("");
                    $('#critic_value').val("");
                    me.RowOnClick();

                },
                error: function () {
                    alert("Hệ thống đang bị lỗi! Vui lòng liên hệ MISA!");
                }
            });
        }
    }
    submitAttendence() {
        cuteAlert({
            type: "question",
            title: "Xác nhận",
            message: "Bạn có chắc chắn điểm danh những học sinh đã chọn?",
            confirmText: "Có",
            cancelText: "Hủy"
        }).then((e) => {
            if (e == "confirm") {
                var me = this;
                var listRow = $('.select');
                var listID = [];

                $.each(listRow, function (index, item) {
                    listID.push($(item).data('recordid'));
                });
                for (var i = 0; i < listID.length; i++) {
                    $.ajax({
                        method: 'GET',
                        url: '/students/' + listID[i],
                        success: function (ress) {
                            var object = {};
                            object["StudentID"] = ress.StudentID;
                            object["Attendence"] = parseInt(ress.Attendence) + 1;
                            $.ajax({
                                method: 'PUT',
                                url: '/students_attendence',
                                data: JSON.stringify(object),
                                contentType: "application/json; charset=utf-8",
                                success: function (res) {
                                },
                                error: function () {
                                    alert("Hệ thống đang bị lỗi! Vui lòng liên hệ MISA!");
                                }
                            });
                        },
                        error: function () {
                            alert("Hệ thống đang bị lỗi!");
                        }
                    });


                }
                //submit total điểm danh: 
                var listAllStudent = [];
                listAllStudent = this.getAllData(classID);
                for (var k = 0; k < listAllStudent.length; k++) {
                    var object = {};
                    object["StudentID"] = listAllStudent[k].StudentID;
                    object["Status"] = parseInt(listAllStudent[k].Status) + 1;
                    $.ajax({
                        method: 'PUT',
                        url: '/students_total_attendence',
                        data: JSON.stringify(object),
                        contentType: "application/json; charset=utf-8",
                        success: function (res) {
                        },
                        error: function () {
                            alert("Hệ thống đang bị lỗi! Vui lòng liên hệ MISA!");
                        }
                    });


                }
                //
                me.loadData();
                cuteAlert({
                    type: "success",
                    title: "Thông báo",
                    message: "Điểm danh thành công!",
                    buttonText: "OK"
                })

            } else {
               
            }
        })
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
                    var html = "Bạn có chắc chắn muốn xóa Học sinh '" + ma + " - " + ten + "' không?";

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
            title: "Xác nhận",
            modal: true,
            buttons: {
                "Có": function () {
                    $.ajax({
                        method: 'DELETE',
                        url: '/students',
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(listID),
                        success: function (res) {
                            cuteAlert({
                                type: "success",
                                title: "Thông báo",
                                message: "Xóa học sinh thành công!",
                                buttonText: "OK"
                            })
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
        var selected_table_score = $('#table_bonus_detail tbody tr.select').length;
        var selected_table_bonus = $('#table_tuyen_duong tbody tr.select').length;
        var selected_table_critic = $('#table_critic tbody tr.select').length;

        if (selected === 0) {
            $('button.delete').prop('disabled', true);
            $('button.duplicate').prop('disabled', true);
            $('button.edit').prop('disabled', true);
            $('button.detail').prop('disabled', true);
        } else if (selected === 1) {
            $('button.delete').removeAttr('disabled');
            $('button.duplicate').removeAttr('disabled');
            $('button.edit').removeAttr('disabled');
            $('button.detail').removeAttr('disabled');
        } else if (selected > 1) {
            $('button.delete').removeAttr('disabled');
            $('button.duplicate').prop('disabled', true);
            $('button.edit').prop('disabled', true);
            $('button.detail').prop('disabled', true);
        }

        if (selected_table_score === 0) {
            $('#edit_score').prop('disabled', true);
            $('#delete_score').prop('disabled', true);
        } else if (selected_table_score === 1) {
            $('#edit_score').removeAttr('disabled');
            $('#delete_score').removeAttr('disabled');

        } else if (selected_table_score > 1) {
            $('#edit_score').prop('disabled', true);
            $('#delete_score').removeAttr('disabled');

        }

        if (selected_table_bonus === 0) {
            $('#edit_bonus').prop('disabled', true);
            $('#delete_bonus').prop('disabled', true);
        } else if (selected_table_bonus === 1) {
            $('#edit_bonus').removeAttr('disabled');
            $('#delete_bonus').removeAttr('disabled');

        } else if (selected_table_bonus > 1) {
            $('#edit_bonus').prop('disabled', true);
            $('#delete_bonus').removeAttr('disabled');

        }
        if (selected_table_critic === 0) {
            $('#edit_critic').prop('disabled', true);
            $('#delete_critic').prop('disabled', true);
        } else if (selected_table_critic === 1) {
            $('#edit_critic').removeAttr('disabled');
            $('#delete_critic').removeAttr('disabled');

        } else if (selected_table_critic > 1) {
            $('#edit_critic').prop('disabled', true);
            $('#delete_critic').removeAttr('disabled');

        }
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
        object["Bonus"] = 0;
        object["Critic"] = 0;
        object["MediumScore"] = "0.00";
        object["Conduct"] = "Tốt";
        object["Attendence"] =0;
        object["Status"] = 0;
        object["Classify"] = "Chưa xếp loại";
        object["ClassID"] = classID;

        if (object["Code"] == "" || object["Name"] == "" || object["Sex"] == "" || object["Birthday"] === "" || object["Address"] === "" || object["ParentName"] === "" || object["ParentPhone"] === "") {
            cuteAlert({
                type: "warning",
                title: "Thông báo",
                message: "Bạn phải nhập thông tin trong các trường bắt buộc!",
                buttonText: "OK"
            })
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
                    cuteAlert({
                        type: "success",
                        title: "Thông báo",
                        message: "Thêm học sinh thành công!",
                        buttonText: "OK"
                    })
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

        if (object["Subject"] == "" || object["Type"] == "" || object["Point"] == "") {
            alert("Bạn phải nhập thông tin trong các trường bắt buộc!");
        } else {
            $.ajax({
                method: 'POST',
                url: '/scores',
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    $('#score_subject').val("Toán");
                    $('#score_type').val("Điểm miệng");
                    $('#score_point').val("");
                    me.loadScore(me.student_id);
                    cuteAlert({
                        type: "success",
                        title: "Thông báo",
                        message: "Thêm mới điểm thành công!",
                        buttonText: "OK"
                    })
                },
                error: function () {
                    alert("Hệ thống đang bị lỗi! Vui lòng liên hệ MISA!");
                }
            });
        }
    }
    AddBonus() {
        var me = this;
        var object = {};
        object["Time"] = $('#bonus_time').val();
        object["Content"] = $('#bonus_content').val();
        object["Subject"] = $('#bonus_subject').val();
        object["Value"] = $('#bonus_value').val();
        object["StudentID"] = this.student_id;
        if (object["Time"] == "" || object["Content"] == "" || object["Subject"] == "" || object["Value"] == "") {
            alert("Bạn phải nhập thông tin trong các trường bắt buộc!");
        } else {
            $.ajax({
                method: 'POST',
                url: '/bonusStudents',
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    $('#bonus_time').val("");
                    $('#bonus_content').val("");
                    $('#bonus_subject').val("");
                    $('#bonus_value').val("");
                    me.loadBonusStudent(me.student_id);
                    cuteAlert({
                        type: "success",
                        title: "Thông báo",
                        message: "Thêm mới khen thưởng thành công!",
                        buttonText: "OK"
                    })

                },
                error: function () {
                    alert("Hệ thống đang bị lỗi! Vui lòng liên hệ MISA!");
                }
            });
        }
    }
    SaveSubmitScore() {
        var me = this;
        var listRow = $('#table_submit_score tbody tr');
        var listID = [];
        

        $.each(listRow, function (index, item) {
                listID.push($(item).data('recordid'));
        });
        var listScore = [];
        for (var k = 1; k < document.getElementById("table_submit_score").rows.length ; k++) {
            var objCells = document.getElementById("table_submit_score").rows.item(k).cells;
            listScore.push(objCells.item(2).innerHTML);
        }
        for (var i = 0; i < listID.length; i++) {
            var object = {};
            object["Subject"] = $('#submit_score_subject').val();
            object["Type"] = $('#submit_score_type').val();
            if (listScore[i] === "") {
                object["Point"] = "Thiếu điểm";
            } else {
                object["Point"] = listScore[i];
            }
            object["StudentID"] = listID[i];
            if (false) {
                alert("Bạn phải nhập thông tin trong các trường bắt buộc!");
            } else {
                $.ajax({
                    method: 'POST',
                    url: '/scores',
                    data: JSON.stringify(object),
                    contentType: "application/json; charset=utf-8",
                    success: function (res) {

                    },
                    error: function () {
                        alert("Hệ thống đang bị lỗi! Vui lòng liên hệ MISA!");
                    }
                });
            }
        }
        cuteAlert({
            type: "success",
            title: "Thông báo",
            message: "Thêm danh sách điểm thành công!",
            buttonText: "OK"
        })
        $('#dialog-score').dialog('close');

    }
    AddCritic() {
        var me = this;
        var object = {};
        object["Time"] = $('#critic_time').val();
        object["Content"] = $('#critic_content').val();
        object["Subject"] = $('#critic_subject').val();
        object["Value"] = $('#critic_value').val();
        object["StudentID"] = this.student_id;
        if (object["Time"] == "" || object["Content"] == "" || object["Subject"] == "" || object["Value"] == "") {
            alert("Bạn phải nhập thông tin trong các trường bắt buộc!");
        } else {
            $.ajax({
                method: 'POST',
                url: '/critics',
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    $('#critic_time').val("");
                    $('#critic_content').val("");
                    $('#critic_subject').val("");
                    $('#critic_value').val("");
                    me.loadCritic(me.student_id);
                    cuteAlert({
                        type: "success",
                        title: "Thông báo",
                        message: "Thêm mới phê bình thành công!",
                        buttonText: "OK"
                    })

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
                    cuteAlert({
                        type: "success",
                        title: "Thông báo",
                        message: "Sửa học sinh thành công!",
                        buttonText: "OK"
                    })
                },
                error: function () {
                    alert("Hệ thống đang bị lỗi! Vui lòng liên hệ MISA!");
                }
            });
        }

    }


}