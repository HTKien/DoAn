$(document).ready(function () {
    var classID;
    let classIDStorageGet = localStorage.getItem('classIDStorage') ? JSON.parse(localStorage.getItem('classIDStorage')) : [];
    classID = classIDStorageGet[classIDStorageGet.length - 1].id;
    $.ajax({
        method: 'GET',
        url: '/classes/' + classID,
        dataType: 'json',
        async: false,
        success: function (res) {
            $('#class_title').text("Mã lớp: " + res.Code + "- Tên lớp: " + res.Name);
            $('#type_class').text(res.Note);
            $('#school_year').text(res.SchoolYear);

        },
        error: function (res) {
            alert("Hệ thống đang bị lỗi!");
        }
    });

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
    $('#total_student').text(fakeData.length);

    //Hạnh kiểm:
    var hk_tot = 0;
    var hk_kha = 0;
    var hk_tb = 0;
    var hk_yeu = 0;
    //học lực
    var classify_gioi = 0;
    var classify_kha = 0;
    var classify_tb = 0;
    var classify_yeu = 0;
    for (var i = 0; i < fakeData.length; i++) {
        if (fakeData[i].Conduct == "Tốt") {
            hk_tot++;
        }
        if (fakeData[i].Conduct == "Khá") {
            hk_kha++;
        }
        if (fakeData[i].Conduct == "Trung bình") {
            hk_tb++;
        }
        if (fakeData[i].Conduct == "Yếu") {
            hk_yeu++;
        }

        //
        if (fakeData[i].Classify == "Giỏi") {
            classify_gioi = classify_gioi + 1;
        }
        if (fakeData[i].Classify == "Khá") {
            classify_kha = classify_kha + 1;
        }
        if (fakeData[i].Classify == "Trung bình") {
            classify_tb = classify_tb + 1;
        }
        if (fakeData[i].Classify == "Yếu") {
            classify_yeu = classify_yeu + 1;
        }
    }
    
    $('#conduct_good').text(hk_tot + " học sinh");
    $('#rating_hk_tot').text(((hk_tot / fakeData.length) * 100).toFixed(2) + "%");
    $('#rating_hk_kha').text(((hk_kha / fakeData.length) * 100).toFixed(2) + "%");
    $('#rating_hk_tb').text(((hk_tb / fakeData.length) * 100).toFixed(2) + "%");
    $('#rating_hk_yeu').text(((hk_yeu / fakeData.length) * 100).toFixed(2) + "%");
    $('#conduct_kha').text(hk_kha + " học sinh");
    $('#conduct_tb').text(hk_tb + " học sinh");
    $('#conduct_yeu').text(hk_yeu + " học sinh");

    //Học lực:
    $('#hocluc_gioi').text(classify_gioi + " học sinh")
    $('#hocluc_kha').text(classify_kha + " học sinh")
    $('#hocluc_tb').text(classify_tb + " học sinh")
    $('#hocluc_yeu').text(classify_yeu + " học sinh")
    $('#rating_hl_gioi').text(((classify_gioi / fakeData.length) * 100).toFixed(2) + "%");
    $('#rating_hl_kha').text(((classify_kha / fakeData.length) * 100).toFixed(2) + "%");
    $('#rating_hl_tb').text(((classify_tb / fakeData.length) * 100).toFixed(2) + "%");
    $('#rating_hl_yeu').text(((classify_yeu / fakeData.length) * 100).toFixed(2) + "%");

    
})