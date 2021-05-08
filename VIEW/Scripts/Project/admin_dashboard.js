$(document).ready(function () {
    $.ajax({
        method: 'GET',
        url: '/classes',
        dataType: 'json',
        async: false,
        success: function (res) {
            $('#total_class').text(res.length)
        },
        error: function (res) {
            alert("Hệ thống đang bị lỗi!");
        }
    });
    $.ajax({
        method: 'GET',
        url: '/bonusStudents',
        dataType: 'json',
        async: false,
        success: function (res) {
            $('#bonus').text(res.length)
        },
        error: function (res) {
            alert("Hệ thống đang bị lỗi!");
        }
    });
    $.ajax({
        method: 'GET',
        url: '/critics',
        dataType: 'json',
        async: false,
        success: function (res) {
            $('#critic').text(res.length)
        },
        error: function (res) {
            alert("Hệ thống đang bị lỗi!");
        }
    });
    $.ajax({
        method: 'GET',
        url: '/teachers',
        dataType: 'json',
        async: false,
        success: function (res) {
            $('#total_teacher').text(res.length)
        },
        error: function (res) {
            alert("Hệ thống đang bị lỗi!");
        }
    });
    $.ajax({
        method: 'GET',
        url: '/students',
        dataType: 'json',
        async: false,
        success: function (res) {
            $('#total_student').text(res.length);
            var classify_gioi = 0;
            var classify_kha = 0;
            var classify_tb = 0;
            var classify_yeu = 0;

            var conduct_good = 0;
            var conduct_kha = 0;
            var conduct_tb = 0;
            var conduct_yeu = 0;
            for (var k = 0; k < res.length; k++) {
                $.ajax({
                    method: 'GET',
                    url: '/students/' + res[k].StudentID,
                    dataType: 'json',
                    async: false,
                    success: function (ress) {
                        if (ress.Conduct == "Tốt") {
                            conduct_good = conduct_good+1;
                        }
                        if (ress.Conduct == "Khá") {
                            conduct_kha = conduct_kha + 1;
                        }
                        if (ress.Conduct == "Trung bình") {
                            conduct_tb = conduct_tb + 1;
                        }
                        if (ress.Conduct == "Yếu") {
                            conduct_yeu = conduct_yeu + 1;
                        }

                        if (ress.Classify == "Giỏi") {
                            classify_gioi = classify_gioi + 1;
                        }
                        if (ress.Classify == "Khá") {
                            classify_kha = classify_kha + 1;
                        }
                        if (ress.Classify == "Trung bình") {
                            classify_tb = classify_tb + 1;
                        }
                        if (ress.Classify == "Yếu") {
                            classify_yeu = classify_yeu + 1;
                        }
                    },
                    error: function (ress) {
                        alert("Hệ thống đang bị lỗi!");
                    }
                });
            }
            $('#conduct_good').text(conduct_good + " học sinh");
            $('#rating_hk_tot').text(((conduct_good / res.length) * 100).toFixed(2) + "%");
            $('#rating_hk_kha').text(((conduct_kha / res.length) * 100).toFixed(2) + "%");
            $('#rating_hk_tb').text(((conduct_tb / res.length) * 100).toFixed(2) + "%");
            $('#rating_hk_yeu').text(((conduct_yeu / res.length) * 100).toFixed(2) + "%");

            $('#conduct_kha').text(conduct_kha + " học sinh")
            $('#conduct_tb').text(conduct_tb + " học sinh")
            $('#conduct_yeu').text(conduct_yeu + " học sinh")
            $('#hocluc_gioi').text(classify_gioi + " học sinh")
            $('#hocluc_kha').text(classify_kha + " học sinh")
            $('#hocluc_tb').text(classify_tb + " học sinh")
            $('#hocluc_yeu').text(classify_yeu + " học sinh")
            $('#rating_hl_gioi').text(((classify_gioi / res.length) * 100).toFixed(2) + "%");
            $('#rating_hl_kha').text(((classify_kha / res.length) * 100).toFixed(2) + "%");
            $('#rating_hl_tb').text(((classify_tb / res.length) * 100).toFixed(2) + "%");
            $('#rating_hl_yeu').text(((classify_yeu / res.length) * 100).toFixed(2) + "%");



            
        },
        error: function (res) {
            alert("Hệ thống đang bị lỗi!");
        }
    });
})