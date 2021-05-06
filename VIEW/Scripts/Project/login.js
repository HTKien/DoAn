$('#btn_login').on('click', function () {
    
    var email = $('#email').val();
    var password = $('#password').val();
    //call all user:
    var allUser = getAllUser();
    var count = 0;
    for (var i = 0; i < allUser.length; i++) {
        if (email === allUser[i].Email && password === allUser[i].Password) {
            count = 1;
            if (allUser[i].Role == 3) {
                let userIDStorage = localStorage.getItem('userIDStorage') ? JSON.parse(localStorage.getItem('userIDStorage')) : [];

                userIDStorage.push({
                    id: allUser[i].UserID
                });
                localStorage.setItem('userIDStorage', JSON.stringify(userIDStorage));
                //điều hướng đến trang học sinh phụ huynh:
                let studentIDStorage = localStorage.getItem('studentIDStorage') ? JSON.parse(localStorage.getItem('studentIDStorage')) : [];

                studentIDStorage.push({
                    id: allUser[i].ReferenceID
                });
                localStorage.setItem('studentIDStorage', JSON.stringify(studentIDStorage));
                location.href = "/Views/student_parent.html";
            } else if (allUser[i].Role == 2) {
                //điều hướng đến trang giáo viên chủ nhiệm:
                let classIDStorage = localStorage.getItem('classIDStorage') ? JSON.parse(localStorage.getItem('classIDStorage')) : [];

                classIDStorage.push({
                    id: allUser[i].ReferenceID
                });
                localStorage.setItem('classIDStorage', JSON.stringify(classIDStorage));
                location.href = "/Views/teacher_dashboard.html";
            } else if (allUser[i].Role == 1) {
                //điều hướng đến trang admin:
                location.href = "/Views/admin_dashboard.html";

            }
        }
    }
    if (count === 0) {
        alert("Email hoặc mật khẩu không đúng!");
    }
});

function getAllUser() {
    var fakeData = [];
    $.ajax({
        method: 'GET',
        url: '/users',
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
$('#logout').on('click', function () {
    cuteAlert({
        type: "question",
        title: "Xác nhận",
        message: "Bạn có chắc chắn muốn đăng xuất?",
        confirmText: "Có",
        cancelText: "Hủy"
    }).then((e) => {
        if (e == "confirm") {
            location.href = "/Views/login.html";
        }
    })
})