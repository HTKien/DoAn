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
            $('#class_title').text("Mã lớp: "+ res.Code+ "- Tên lớp: "+ res.Name)
        },
        error: function (res) {
            alert("Hệ thống đang bị lỗi!");
        }
    })
    
})