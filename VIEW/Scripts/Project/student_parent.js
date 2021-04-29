$(document).ready(function () {
    

    var studentID;
    let studentIDStorageGet = localStorage.getItem('studentIDStorage') ? JSON.parse(localStorage.getItem('studentIDStorage')) : [];
    studentID = studentIDStorageGet[studentIDStorageGet.length - 1].id;
    var classID;
    $.ajax({
        method: 'GET',
        url: '/students/' + studentID,
        success: function (res) {
            classID = res.ClassID;
            $('#student_infor #student_code').text("Mã học sinh: " + res.Code);
            $('#student_infor #student_name').text("Họ và tên: " + res.Name);
            $('#student_infor #student_sex').text("Giới tính: " + res.Sex);
            $('#student_infor #student_birthday').text("Ngày sinh: " + res.Birthday);
            $('#student_infor #student_address').text("Địa chỉ: " + res.Address);
            $('#student_infor #student_bonus').text("Số khen thưởng/tuyên dương: " + res.Bonus);
            $('#student_infor #student_critic').text("Số phê bình: " + res.Critic);
            $('#student_attendence').text("Điểm danh: " + res.Attendence + "/" + res.Status);
            $('#student_conduct').text("Hạnh kiểm: " + res.Conduct);
            $('#student_mediumscore').text("Điểm TB các môn: " + res.MediumScore);
            $('#student_classify').text("Xếp loại: " + res.Classify);
            $('#student_infor #parent_name').text("Tên phụ huynh: " + res.ParentName);
            $('#student_infor #parent_phone').text("Số điện thoại: " + res.ParentPhone);

            //
            $.ajax({
                method: 'GET',
                url: '/classes/' + classID,
                dataType: 'json',
                async: false,
                success: function (res) {
                    $('#class_code').text("Mã lớp: " + res.Code);
                    $('#class_name').text("Tên lớp: " + res.Name);

                    var teacherID = res.TeacherID;
                    $.ajax({
                        method: 'GET',
                        url: '/teachers/' + teacherID,
                        dataType: 'json',
                        async: false,
                        success: function (res) {
                            $('#teacher_code').text("Mã giáo viên: " + res.Code);
                            $('#teacher_name').text("Tên giáo viên: " + res.Name);
                            $('#teacher_address').text("Địa chỉ: " + res.Address);
                            $('#teacher_phone').text("Điện thoại GVCN: " + res.Phone);

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
            //
        },
        error: function () {
            alert("Hệ thống đang bị lỗi!");
        }
    });
    var data = GetScore(studentID);
    AppendScore(data);

    //load tuyen dương/ khen thưởng:
    var bonuss = GetBonusStudent(studentID);
    AppendBonusStudent(bonuss);

    //load phê bình
    var critics = GetCritic(studentID);
    AppendCritic(critics);
});

function GetScore(studentID) {
    var fakeData = [];
    $.ajax({
        method: 'GET',
        url: '/scores',
        dataType: 'json',
        async: false,
        success: function (res) {
            $.each(res, function (index, item) {
                if (item.StudentID === studentID) {
                    fakeData.push(item);
                }
            });
        },
        error: function (res) {
            alert("Hệ thống đang bị lỗi!");
        }
    })
    return fakeData;
}
function AppendScore(fakeData) {
    //tinh diem trung binh Toán:
    var tbToan = 0;
    parseFloat(tbToan);
    var totalToan = 0;
    parseFloat(totalToan);
    var countToan = 0;
    for (var i = 0; i < fakeData.length; i++) {
        if (fakeData[i].Subject === "Toán") {
            if (fakeData[i].Point !== "Thiếu điểm") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalToan = totalToan + parseFloat(fakeData[i].Point);
                    countToan = countToan + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalToan = totalToan + parseFloat(fakeData[i].Point) * 2;
                    countToan = countToan + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalToan = totalToan + parseFloat(fakeData[i].Point) * 3;
                    countToan = countToan + 3;
                } else {
                    totalToan = totalToan + parseFloat(fakeData[i].Point);
                    countToan = countToan + 1;
                }
            }
            
        }
    }
    if (countToan === 0) {
        tbToan = 0;
    } else {
        tbToan = totalToan / countToan;
    }
    $('#scoreToan').text("Toán: " + tbToan.toFixed(2));
    //tinh diem trung binh Vật lý:
    var tbVatLy = 0;
    parseFloat(tbVatLy);
    var totalVatLy = 0;
    parseFloat(totalVatLy);
    var countVatLy = 0;
    for (var i = 0; i < fakeData.length; i++) {
        if (fakeData[i].Subject === "Vật lý") {
            if (fakeData[i].Point !== "Thiếu điểm") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalVatLy = totalVatLy + parseFloat(fakeData[i].Point);
                    countVatLy = countVatLy + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalVatLy = totalVatLy + parseFloat(fakeData[i].Point) * 2;
                    countVatLy = countVatLy + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalVatLy = totalVatLy + parseFloat(fakeData[i].Point) * 3;
                    countVatLy = countVatLy + 3;
                } else {
                    totalVatLy = totalVatLy + parseFloat(fakeData[i].Point);
                    countVatLy = countVatLy + 1;
                }
            }
            
        }
    }
    if (countVatLy === 0) {
        tbVatLy = 0;
    } else {
        tbVatLy = totalVatLy / countVatLy;
    }
    $('#scoreVatLy').text("Vật lý: " + tbVatLy.toFixed(2));
    //tinh diem trung binh Hóa học:
    var tbHoaHoc = 0;
    parseFloat(tbHoaHoc);
    var totalHoaHoc = 0;
    parseFloat(totalHoaHoc);
    var countHoaHoc = 0;
    for (var i = 0; i < fakeData.length; i++) {
        if (fakeData[i].Subject === "Hóa học") {
            if (fakeData[i].Point !== "Thiếu điểm") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalHoaHoc = totalHoaHoc + parseFloat(fakeData[i].Point);
                    countHoaHoc = countHoaHoc + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalHoaHoc = totalHoaHoc + parseFloat(fakeData[i].Point) * 2;
                    countHoaHoc = countHoaHoc + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalHoaHoc = totalHoaHoc + parseFloat(fakeData[i].Point) * 3;
                    countHoaHoc = countHoaHoc + 3;
                } else {
                    totalHoaHoc = totalHoaHoc + parseFloat(fakeData[i].Point);
                    countHoaHoc = countHoaHoc + 1;
                }
            }
            
        }
    }

    if (countHoaHoc === 0) {
        tbHoaHoc = 0;
    } else {
        tbHoaHoc = totalHoaHoc / countHoaHoc;
    }
    $('#scoreHoaHoc').text("Hóa học: " + tbHoaHoc.toFixed(2));
    //tinh diem trung binh Sinh học:
    var tbSinhHoc = 0;
    parseFloat(tbSinhHoc);
    var totalSinhHoc = 0;
    parseFloat(totalSinhHoc);
    var countSinhHoc = 0;
    for (var i = 0; i < fakeData.length; i++) {
        if (fakeData[i].Subject === "Sinh học") {
            if (fakeData[i].Point !== "Thiếu điểm") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalSinhHoc = totalSinhHoc + parseFloat(fakeData[i].Point);
                    countSinhHoc = countSinhHoc + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalSinhHoc = totalSinhHoc + parseFloat(fakeData[i].Point) * 2;
                    countSinhHoc = countSinhHoc + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalSinhHoc = totalSinhHoc + parseFloat(fakeData[i].Point) * 3;
                    countSinhHoc = countSinhHoc + 3;
                } else {
                    totalSinhHoc = totalSinhHoc + parseFloat(fakeData[i].Point);
                    countSinhHoc = countSinhHoc + 1;
                }
            }
            
        }
    }
    if (countSinhHoc === 0) {
        tbSinhHoc = 0;
    } else {
        tbSinhHoc = totalSinhHoc / countSinhHoc;
    }
    $('#scoreSinhHoc').text("Sinh học: " + tbSinhHoc.toFixed(2));

    //tinh diem trung binh Ngu van:
    var tbNguVan = 0;
    parseFloat(tbNguVan);
    var totalNguVan = 0;
    parseFloat(totalNguVan);
    var countNguVan = 0;
    for (var i = 0; i < fakeData.length; i++) {
        if (fakeData[i].Subject === "Ngữ văn") {
            if (fakeData[i].Point !== "Thiếu điểm") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalNguVan = totalNguVan + parseFloat(fakeData[i].Point);
                    countNguVan = countNguVan + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalNguVan = totalNguVan + parseFloat(fakeData[i].Point) * 2;
                    countNguVan = countNguVan + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalNguVan = totalNguVan + parseFloat(fakeData[i].Point) * 3;
                    countNguVan = countNguVan + 3;
                } else {
                    totalNguVan = totalNguVan + parseFloat(fakeData[i].Point);
                    countNguVan = countNguVan + 1;
                }
            }
            
        }
    }
    if (countNguVan === 0) {
        tbNguVan = 0;
    } else {
        tbNguVan = totalNguVan / countNguVan;
    }
    $('#scoreNguVan').text("Ngữ văn: " + tbNguVan.toFixed(2));
    //tinh diem trung binh Lịch sử:
    var tbLichSu = 0;
    parseFloat(tbLichSu);
    var totalLichSu = 0;
    parseFloat(totalLichSu);
    var countLichSu = 0;
    for (var i = 0; i < fakeData.length; i++) {
        if (fakeData[i].Subject === "Lịch sử") {
            if (fakeData[i].Point !== "Thiếu điểm") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalLichSu = totalLichSu + parseFloat(fakeData[i].Point);
                    countLichSu = countLichSu + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalLichSu = totalLichSu + parseFloat(fakeData[i].Point) * 2;
                    countLichSu = countLichSu + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalLichSu = totalLichSu + parseFloat(fakeData[i].Point) * 3;
                    countLichSu = countLichSu + 3;
                } else {
                    totalLichSu = totalLichSu + parseFloat(fakeData[i].Point);
                    countLichSu = countLichSu + 1;
                }
            }
            
        }
    }
    if (countLichSu === 0) {
        tbLichSu = 0;
    } else {
        tbLichSu = totalLichSu / countLichSu;

    }
    $('#scoreLichSu').text("Lịch sử: " + tbLichSu.toFixed(2));
    //tinh diem trung binh Địa lý:
    var tbDiaLy = 0;
    parseFloat(tbDiaLy);
    var totalDiaLy = 0;
    parseFloat(totalDiaLy);
    var countDiaLy = 0;
    for (var i = 0; i < fakeData.length; i++) {
        if (fakeData[i].Subject === "Địa lý") {
            if (fakeData[i].Point !== "Thiếu điểm") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalDiaLy = totalDiaLy + parseFloat(fakeData[i].Point);
                    countDiaLy = countDiaLy + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalDiaLy = totalDiaLy + parseFloat(fakeData[i].Point) * 2;
                    countDiaLy = countDiaLy + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalDiaLy = totalDiaLy + parseFloat(fakeData[i].Point) * 3;
                    countDiaLy = countDiaLy + 3;
                } else {
                    totalDiaLy = totalDiaLy + parseFloat(fakeData[i].Point);
                    countDiaLy = countDiaLy + 1;
                }
            }
            
        }
    }
    if (countDiaLy === 0) {
        tbDiaLy = 0;
    } else {
        tbDiaLy = totalDiaLy / countDiaLy;
    }
    $('#scoreDiaLy').text("Địa lý: " + tbDiaLy.toFixed(2));
    //tinh diem trung binh Tin học:
    var tbTinHoc = 0;
    parseFloat(tbTinHoc);
    var totalTinHoc = 0;
    parseFloat(totalTinHoc);
    var countTinHoc = 0;
    for (var i = 0; i < fakeData.length; i++) {
        if (fakeData[i].Subject === "Tin học") {
            if (fakeData[i].Point !== "Thiếu điểm") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalTinHoc = totalTinHoc + parseFloat(fakeData[i].Point);
                    countTinHoc = countTinHoc + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalTinHoc = totalTinHoc + parseFloat(fakeData[i].Point) * 2;
                    countTinHoc = countTinHoc + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalTinHoc = totalTinHoc + parseFloat(fakeData[i].Point) * 3;
                    countTinHoc = countTinHoc + 3;
                } else {
                    totalTinHoc = totalTinHoc + parseFloat(fakeData[i].Point);
                    countTinHoc = countTinHoc + 1;
                }
            }
            
        }
    }
    if (countTinHoc === 0) {
        tbTinHoc = 0;
    } else {
        tbTinHoc = totalTinHoc / countTinHoc;
    }
    $('#scoreTinHoc').text("Tin học: " + tbTinHoc.toFixed(2));
    //tinh diem trung binh Giáo dục công dân:
    var tbCongDan = 0;
    parseFloat(tbCongDan);
    var totalCongDan = 0;
    parseFloat(totalCongDan);
    var countCongDan = 0;
    for (var i = 0; i < fakeData.length; i++) {
        if (fakeData[i].Subject === "Giáo dục công dân") {
            if (fakeData[i].Point !== "Thiếu điểm") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalCongDan = totalCongDan + parseFloat(fakeData[i].Point);
                    countCongDan = countCongDan + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalCongDan = totalCongDan + parseFloat(fakeData[i].Point) * 2;
                    countCongDan = countCongDan + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalCongDan = totalCongDan + parseFloat(fakeData[i].Point) * 3;
                    countCongDan = countCongDan + 3;
                } else {
                    totalCongDan = totalCongDan + parseFloat(fakeData[i].Point);
                    countCongDan = countCongDan + 1;
                }
            }
            
        }
    }
    if (countCongDan === 0) {
        tbCongDan = 0;
    } else {
        tbCongDan = totalCongDan / countCongDan;
    }
    $('#scoreCongDan').text("Giáo dục công dân: " + tbCongDan.toFixed(2));
    //tinh diem trung binh Giáo dục Tiếng Anh:
    var tbTiengAnh = 0;
    parseFloat(tbTiengAnh);
    var totalTiengAnh = 0;
    parseFloat(totalTiengAnh);
    var countTiengAnh = 0;
    for (var i = 0; i < fakeData.length; i++) {
        if (fakeData[i].Subject === "Tiếng Anh") {
            if (fakeData[i].Point !== "Thiếu điểm") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalTiengAnh = totalTiengAnh + parseFloat(fakeData[i].Point);
                    countTiengAnh = countTiengAnh + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalTiengAnh = totalTiengAnh + parseFloat(fakeData[i].Point) * 2;
                    countTiengAnh = countTiengAnh + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalTiengAnh = totalTiengAnh + parseFloat(fakeData[i].Point) * 3;
                    countTiengAnh = countTiengAnh + 3;
                } else {
                    totalTiengAnh = totalTiengAnh + parseFloat(fakeData[i].Point);
                    countTiengAnh = countTiengAnh + 1;
                }
            }
            
        }
    }
    if (countTiengAnh === 0) {
        tbTiengAnh = 0;
    } else {
        tbTiengAnh = totalTiengAnh / countTiengAnh;
    }
    $('#scoreTiengAnh').text("Tiếng Anh: " + tbTiengAnh.toFixed(2));
    //tinh diem trung binh Giáo dục Thể dục:
    var tbTheDuc = 0;
    parseFloat(tbTheDuc);
    var totalTheDuc = 0;
    parseFloat(totalTheDuc);
    var countTheDuc = 0;
    for (var i = 0; i < fakeData.length; i++) {
        if (fakeData[i].Subject === "Thể dục") {
            if (fakeData[i].Point !== "Thiếu điểm") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalTheDuc = totalTheDuc + parseFloat(fakeData[i].Point);
                    countTheDuc = countTheDuc + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalTheDuc = totalTheDuc + parseFloat(fakeData[i].Point) * 2;
                    countTheDuc = countTheDuc + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalTheDuc = totalTheDuc + parseFloat(fakeData[i].Point) * 3;
                    countTheDuc = countTheDuc + 3;
                } else {
                    totalTheDuc = totalTheDuc + parseFloat(fakeData[i].Point);
                    countTheDuc = countTheDuc + 1;
                }
            }
            
        }
    }
    if (countTheDuc === 0) {
        tbTheDuc = 0;
    } else {
        tbTheDuc = totalTheDuc / countTheDuc;
    }
    $('#scoreTheDuc').text("Thể dục: " + tbTheDuc.toFixed(2));
    //tinh diem trung binh Giáo dục Công nghệ:
    var tbCongNghe = 0;
    parseFloat(tbCongNghe);
    var totalCongNghe = 0;
    parseFloat(totalCongNghe);
    var countCongNghe = 0;
    for (var i = 0; i < fakeData.length; i++) {
        if (fakeData[i].Subject === "Công nghệ") {
            if (fakeData[i].Point !== "Thiếu điểm") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    totalCongNghe = totalCongNghe + parseFloat(fakeData[i].Point);
                    countCongNghe = countCongNghe + 1;
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    totalCongNghe = totalCongNghe + parseFloat(fakeData[i].Point) * 2;
                    countCongNghe = countCongNghe + 2;
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    totalCongNghe = totalCongNghe + parseFloat(fakeData[i].Point) * 3;
                    countCongNghe = countCongNghe + 3;
                } else {
                    totalCongNghe = totalCongNghe + parseFloat(fakeData[i].Point);
                    countCongNghe = countCongNghe + 1;
                }
            }
            
        }
    }
    if (countCongNghe === 0) {
        tbCongNghe = 0;
    } else {
        tbCongNghe = totalCongNghe / countCongNghe;
    }

    $('#scoreCongNghe').text("Công nghệ: " + tbCongNghe.toFixed(2));
    this.tbScore = ((tbToan + tbVatLy + tbHoaHoc + tbSinhHoc + tbNguVan + tbLichSu + tbDiaLy + tbTinHoc + tbCongDan + tbTiengAnh + tbTheDuc + tbCongNghe) / 12).toFixed(2);
    $('#dialog-student-detail #student_mediumscore').text("Điểm trung bình các môn: " + this.tbScore);
    var fields = $('.main-table-score th[fieldName]');
    $('.main-table-score tbody').empty();
    $.each(fakeData, function (index, item) {
        var rowHTML = $('<tr></tr>').data("recordid", item["ScoreID"]);
        $.each(fields, function (fieldIndex, fieldItem) {
            var fieldName = fieldItem.getAttribute('fieldName');
            var fieldValue = item[fieldName];
            rowHTML.append('<td>' + fieldValue + '</td>');
        });
        $('.main-table-score tbody').append(rowHTML);
    });

    


}
function GetBonusStudent(studentID) {
    var fakeData = [];
    $.ajax({
        method: 'GET',
        url: '/bonusStudents',
        dataType: 'json',
        async: false,
        success: function (res) {
            $.each(res, function (index, item) {
                if (item.StudentID === studentID) {
                    fakeData.push(item);
                }
            });
        },
        error: function (res) {
            alert("Hệ thống đang bị lỗi!");
        }
    })
    return fakeData;
}
function AppendBonusStudent(fakeData) {
    var totalBonus = 0;
    totalBonus = parseFloat(totalBonus);
    for (var t = 0; t < fakeData.length; t++) {
        totalBonus = totalBonus + parseFloat(fakeData[t].Value);
    }
    $('#total_bonus').text("Tổng điểm cộng: " + totalBonus);
    var fields = $('.main-table-bonus th[fieldName]');
    $('.main-table-bonus tbody').empty();
    $.each(fakeData, function (index, item) {
        var rowHTML = $('<tr></tr>').data("recordid", item["BonusStudentID"]);
        $.each(fields, function (fieldIndex, fieldItem) {
            var fieldName = fieldItem.getAttribute('fieldName');
            var fieldValue = item[fieldName];
            rowHTML.append('<td>' + fieldValue + '</td>');
        });
        $('.main-table-bonus tbody').append(rowHTML);
    });
}
function GetCritic(studentID) {
    var fakeData = [];
    $.ajax({
        method: 'GET',
        url: '/critics',
        dataType: 'json',
        async: false,
        success: function (res) {
            $.each(res, function (index, item) {
                if (item.StudentID === studentID) {
                    fakeData.push(item);
                }
            });
        },
        error: function (res) {
            alert("Hệ thống đang bị lỗi!");
        }
    })
    return fakeData;
}
function AppendCritic(fakeData) {
    var totalCritic = 0;
    totalCritic = parseFloat(totalCritic);
    for (var t = 0; t < fakeData.length; t++) {
        totalCritic = totalCritic + parseFloat(fakeData[t].Value);
    }
    $('#total_critic').text("Tổng điểm trừ: " + totalCritic);
    var fields = $('.main-table-critic th[fieldName]');
    $('.main-table-critic tbody').empty();
    $.each(fakeData, function (index, item) {
        var rowHTML = $('<tr></tr>').data("recordid", item["CriticID"]);
        $.each(fields, function (fieldIndex, fieldItem) {
            var fieldName = fieldItem.getAttribute('fieldName');
            var fieldValue = item[fieldName];
            rowHTML.append('<td>' + fieldValue + '</td>');
        });
        $('.main-table-critic tbody').append(rowHTML);
    });
}
