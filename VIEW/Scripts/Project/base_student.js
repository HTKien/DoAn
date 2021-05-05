class BaseStudent {
    constructor() {
        this.Calculate();
        this.loadData();
    }
    
    tbScore;
    tb;

    /**
     * Hàm thực hiện lấy toàn bộ dữ liệu
     * Người tạo: Hàn Trung Kiên 
     * */
    getAllData(classID) {
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
        return fakeData;

    }
    /**
    * Hàm  thực hiện lấy dữ liệu từ database theo phân trang
    * Người tạo: Hàn Trung Kiên
    * Ngày tạo: 22/8/2019
    * */
    allStudentClass=[];
    getData() {
        
        var pageIndex = $('.page-index').val();
        var pageSize = $('.page-size option:selected').val();

        this.FormatBtn(pageIndex, pageSize);

        var fakeData = [];

        if (this.getAllData(classID).length === 0) {
            return fakeData;
        }

        this.allStudentClass = this.getAllData(classID);

        function compare(a, b) {
            const NameA = a.Name.toUpperCase();
            const NameB = b.Name.toUpperCase();

            let comparison = 0;
            if (NameA > NameB) {
                comparison = 1;
            } else if (NameA < NameB) {
                comparison = -1;
            }
            return comparison;
        }
        this.allStudentClass.sort(compare);
        if (pageSize >= this.allStudentClass.length) {
            fakeData = this.allStudentClass;
        }else if (pageIndex >= (parseInt(this.allStudentClass.length / pageSize) + 1)) {
            if (allStudentClass.length % pageSize !== 0) {
                $('.page-index').val((parseInt(this.allStudentClass.length / pageSize) + 1));

            } else {
                $('.page-index').val(parseInt(this.allStudentClass.length / pageSize));

            }


            for (var i = ($('.page-index').val() - 1) * pageSize; i < this.allStudentClass.length; i++) {
                fakeData.push(this.allStudentClass[i]);
            }

        } else {
            for (var i = (pageIndex - 1) * pageSize; i < (pageIndex * pageSize); i++) {
                fakeData.push(this.allStudentClass[i]);
            }



        }


        return fakeData;


    }
    /**
    * Hàm  thực hiện load mới dữ liệu theo phân trang phục vụ cho button
    * Người tạo: Hàn Trung Kiên
    * Ngày tạo: 22/8/2019
    * */
    getRefreshData(classID) {
        var pageIndex = $('.page-index').val(1);
        var pageSize = $('.page-size').val(25);

        var pageIndex = $('.page-index').val();
        var pageSize = $('.page-size option:selected').val();
        this.FormatBtn(pageIndex, pageSize);

        var fakeData = [];
        $.ajax({
            method: 'GET',
            url: '/students/' + pageIndex + '/' + pageSize,

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
        return fakeData;


    }

    /**
     * Hàm thực hiện load dữ liệu lên html
     * Người tạo: Hàn Trung Kiên
     * Ngày tạo: 22/8/2019
     * */
    Calculate() {
        var me = this;
        var data = me.getData();
        for (var t = 0; t < data.length; t++) {
            //
            var bonuss = [];
            bonuss = this.GetBonusStudent(data[t].StudentID);
            var totalBonus = 0;
            totalBonus = parseFloat(totalBonus);
            for (var m = 0; m < bonuss.length; m++) {
                totalBonus = totalBonus + parseFloat(bonuss[m].Value);
            }
            //
            var critics = [];
            critics = this.GetCritic(data[t].StudentID);
            var totalCritic = 0;
            totalCritic = parseFloat(totalCritic);
            for (var n = 0; n < critics.length; n++) {
                totalCritic = totalCritic + parseFloat(critics[n].Value);
            }
            //
            var scores = [];
            scores = this.GetScore(data[t].StudentID);
            //toan
            var tbToan = 0;
            parseFloat(tbToan);
            var totalToan = 0;
            parseFloat(totalToan);
            var countToan = 0;
            for (var i = 0; i < scores.length; i++) {
                if (scores[i].Subject === "Toán") {

                    if (scores[i].Type === "Điểm miệng" || scores[i].Type === "Điểm 15 phút") {
                        if (scores[i].Point !== "Thiếu điểm") {
                            totalToan = totalToan + parseFloat(scores[i].Point);
                            countToan = countToan + 1;
                        }
                        
                    } else if (scores[i].Type === "Điểm 45 phút" || scores[i].Type === "Điểm 90 phút") {
                        if (scores[i].Point !== "Thiếu điểm") {
                            totalToan = totalToan + parseFloat(scores[i].Point) * 2;
                            countToan = countToan + 2;
                        }
                        
                    } else if (scores[i].Type === "Điểm thi học kỳ") {
                        if (scores[i].Point !== "Thiếu điểm") {
                           totalToan = totalToan + parseFloat(scores[i].Point) * 3;
                           countToan = countToan + 3;
                        }
                        
                    } else {
                        if (scores[i].Point !== "Thiếu điểm") {
                            totalToan = totalToan + parseFloat(scores[i].Point);
                            countToan = countToan + 1;
                        }
                        
                    }
                }
            }
            if (countToan === 0) {
                tbToan = 0;
            } else {
                tbToan = (totalToan / countToan).toFixed(2);
            }
            tbToan = parseFloat(tbToan);
            //ly
            var tbVatLy = 0;
            parseFloat(tbVatLy);
            var totalVatLy = 0;
            parseFloat(totalVatLy);
            var countVatLy = 0;
            for (var i = 0; i < scores.length; i++) {
                if (scores[i].Subject === "Vật lý") {
                    if (scores[i].Point !== "Thiếu điểm") {
                        if (scores[i].Type === "Điểm miệng" || scores[i].Type === "Điểm 15 phút") {
                            totalVatLy = totalVatLy + parseFloat(scores[i].Point);
                            countVatLy = countVatLy + 1;
                        } else if (scores[i].Type === "Điểm 45 phút" || scores[i].Type === "Điểm 90 phút") {
                            totalVatLy = totalVatLy + parseFloat(scores[i].Point) * 2;
                            countVatLy = countVatLy + 2;
                        } else if (scores[i].Type === "Điểm thi học kỳ") {
                            totalVatLy = totalVatLy + parseFloat(scores[i].Point) * 3;
                            countVatLy = countVatLy + 3;
                        } else {
                            totalVatLy = totalVatLy + parseFloat(scores[i].Point);
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
            tbVatLy = parseFloat(tbVatLy);

            //Hóa học
            var tbHoaHoc = 0;
            parseFloat(tbHoaHoc);
            var totalHoaHoc = 0;
            parseFloat(totalHoaHoc);
            var countHoaHoc = 0;
            for (var i = 0; i < scores.length; i++) {
                if (scores[i].Subject === "Hóa học") {
                    if (scores[i].Point !== "Thiếu điểm") {
                        if (scores[i].Type === "Điểm miệng" || scores[i].Type === "Điểm 15 phút") {
                            totalHoaHoc = totalHoaHoc + parseFloat(scores[i].Point);
                            countHoaHoc = countHoaHoc + 1;
                        } else if (scores[i].Type === "Điểm 45 phút" || scores[i].Type === "Điểm 90 phút") {
                            totalHoaHoc = totalHoaHoc + parseFloat(scores[i].Point) * 2;
                            countHoaHoc = countHoaHoc + 2;
                        } else if (scores[i].Type === "Điểm thi học kỳ") {
                            totalHoaHoc = totalHoaHoc + parseFloat(scores[i].Point) * 3;
                            countHoaHoc = countHoaHoc + 3;
                        } else {
                            totalHoaHoc = totalHoaHoc + parseFloat(scores[i].Point);
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
            tbHoaHoc = parseFloat(tbHoaHoc);

            //Sinh học
            var tbSinhHoc = 0;
            parseFloat(tbSinhHoc);
            var totalSinhHoc = 0;
            parseFloat(totalSinhHoc);
            var countSinhHoc = 0;
            for (var i = 0; i < scores.length; i++) {
                if (scores[i].Subject === "Sinh học") {
                    if (scores[i].Point !== "Thiếu điểm") {
                        if (scores[i].Type === "Điểm miệng" || scores[i].Type === "Điểm 15 phút") {
                            totalSinhHoc = totalSinhHoc + parseFloat(scores[i].Point);
                            countSinhHoc = countSinhHoc + 1;
                        } else if (scores[i].Type === "Điểm 45 phút" || scores[i].Type === "Điểm 90 phút") {
                            totalSinhHoc = totalSinhHoc + parseFloat(scores[i].Point) * 2;
                            countSinhHoc = countSinhHoc + 2;
                        } else if (scores[i].Type === "Điểm thi học kỳ") {
                            totalSinhHoc = totalSinhHoc + parseFloat(scores[i].Point) * 3;
                            countSinhHoc = countSinhHoc + 3;
                        } else {
                            totalSinhHoc = totalSinhHoc + parseFloat(scores[i].Point);
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
            tbSinhHoc = parseFloat(tbSinhHoc);

            //Ngữ văn
            var tbNguVan = 0;
            parseFloat(tbNguVan);
            var totalNguVan = 0;
            parseFloat(totalNguVan);
            var countNguVan = 0;
            for (var i = 0; i < scores.length; i++) {
                if (scores[i].Subject === "Ngữ văn") {
                    if (scores[i].Point !== "Thiếu điểm") {
                        if (scores[i].Type === "Điểm miệng" || scores[i].Type === "Điểm 15 phút") {
                            totalNguVan = totalNguVan + parseFloat(scores[i].Point);
                            countNguVan = countNguVan + 1;
                        } else if (scores[i].Type === "Điểm 45 phút" || scores[i].Type === "Điểm 90 phút") {
                            totalNguVan = totalNguVan + parseFloat(scores[i].Point) * 2;
                            countNguVan = countNguVan + 2;
                        } else if (scores[i].Type === "Điểm thi học kỳ") {
                            totalNguVan = totalNguVan + parseFloat(scores[i].Point) * 3;
                            countNguVan = countNguVan + 3;
                        } else {
                            totalNguVan = totalNguVan + parseFloat(scores[i].Point);
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
            tbNguVan = parseFloat(tbNguVan);

            //Lịch sử
            var tbLichSu = 0;
            parseFloat(tbLichSu);
            var totalLichSu = 0;
            parseFloat(totalLichSu);
            var countLichSu = 0;
            for (var i = 0; i < scores.length; i++) {
                if (scores[i].Subject === "Lịch sử") {
                    if (scores[i].Point !== "Thiếu điểm") {
                        if (scores[i].Type === "Điểm miệng" || scores[i].Type === "Điểm 15 phút") {
                            totalLichSu = totalLichSu + parseFloat(scores[i].Point);
                            countLichSu = countLichSu + 1;
                        } else if (scores[i].Type === "Điểm 45 phút" || scores[i].Type === "Điểm 90 phút") {
                            totalLichSu = totalLichSu + parseFloat(scores[i].Point) * 2;
                            countLichSu = countLichSu + 2;
                        } else if (scores[i].Type === "Điểm thi học kỳ") {
                            totalLichSu = totalLichSu + parseFloat(scores[i].Point) * 3;
                            countLichSu = countLichSu + 3;
                        } else {
                            totalLichSu = totalLichSu + parseFloat(scores[i].Point);
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
            tbLichSu = parseFloat(tbLichSu);

            //Địa lý
            var tbDiaLy = 0;
            parseFloat(tbDiaLy);
            var totalDiaLy = 0;
            parseFloat(totalDiaLy);
            var countDiaLy = 0;
            for (var i = 0; i < scores.length; i++) {
                if (scores[i].Subject === "Địa lý") {
                    if (scores[i].Point !== "Thiếu điểm") {
                        if (scores[i].Type === "Điểm miệng" || scores[i].Type === "Điểm 15 phút") {
                            totalDiaLy = totalDiaLy + parseFloat(scores[i].Point);
                            countDiaLy = countDiaLy + 1;
                        } else if (scores[i].Type === "Điểm 45 phút" || scores[i].Type === "Điểm 90 phút") {
                            totalDiaLy = totalDiaLy + parseFloat(scores[i].Point) * 2;
                            countDiaLy = countDiaLy + 2;
                        } else if (scores[i].Type === "Điểm thi học kỳ") {
                            totalDiaLy = totalDiaLy + parseFloat(scores[i].Point) * 3;
                            countDiaLy = countDiaLy + 3;
                        } else {
                            totalDiaLy = totalDiaLy + parseFloat(scores[i].Point);
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
            tbDiaLy = parseFloat(tbDiaLy);

            //Tin học
            var tbTinHoc = 0;
            parseFloat(tbTinHoc);
            var totalTinHoc = 0;
            parseFloat(totalTinHoc);
            var countTinHoc = 0;
            for (var i = 0; i < scores.length; i++) {
                if (scores[i].Subject === "Tin học") {
                    if (scores[i].Point !== "Thiếu điểm") {
                        if (scores[i].Type === "Điểm miệng" || scores[i].Type === "Điểm 15 phút") {
                            totalTinHoc = totalTinHoc + parseFloat(scores[i].Point);
                            countTinHoc = countTinHoc + 1;
                        } else if (scores[i].Type === "Điểm 45 phút" || scores[i].Type === "Điểm 90 phút") {
                            totalTinHoc = totalTinHoc + parseFloat(scores[i].Point) * 2;
                            countTinHoc = countTinHoc + 2;
                        } else if (scores[i].Type === "Điểm thi học kỳ") {
                            totalTinHoc = totalTinHoc + parseFloat(scores[i].Point) * 3;
                            countTinHoc = countTinHoc + 3;
                        } else {
                            totalTinHoc = totalTinHoc + parseFloat(scores[i].Point);
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
            tbTinHoc = parseFloat(tbTinHoc);

            //Công dân
            var tbCongDan = 0;
            parseFloat(tbCongDan);
            var totalCongDan = 0;
            parseFloat(totalCongDan);
            var countCongDan = 0;
            for (var i = 0; i < scores.length; i++) {
                if (scores[i].Subject === "Giáo dục công dân") {
                    if (scores[i].Point !== "Thiếu điểm") {
                        if (scores[i].Type === "Điểm miệng" || scores[i].Type === "Điểm 15 phút") {
                            totalCongDan = totalCongDan + parseFloat(scores[i].Point);
                            countCongDan = countCongDan + 1;
                        } else if (scores[i].Type === "Điểm 45 phút" || scores[i].Type === "Điểm 90 phút") {
                            totalCongDan = totalCongDan + parseFloat(scores[i].Point) * 2;
                            countCongDan = countCongDan + 2;
                        } else if (scores[i].Type === "Điểm thi học kỳ") {
                            totalCongDan = totalCongDan + parseFloat(scores[i].Point) * 3;
                            countCongDan = countCongDan + 3;
                        } else {
                            totalCongDan = totalCongDan + parseFloat(scores[i].Point);
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
            tbCongDan = parseFloat(tbCongDan);

            //Tiếng Anh
            var tbTiengAnh = 0;
            parseFloat(tbTiengAnh);
            var totalTiengAnh = 0;
            parseFloat(totalTiengAnh);
            var countTiengAnh = 0;
            for (var i = 0; i < scores.length; i++) {
                if (scores[i].Subject === "Tiếng Anh") {
                    if (scores[i].Point !== "Thiếu điểm") {
                        if (scores[i].Type === "Điểm miệng" || scores[i].Type === "Điểm 15 phút") {
                            totalTiengAnh = totalTiengAnh + parseFloat(scores[i].Point);
                            countTiengAnh = countTiengAnh + 1;
                        } else if (scores[i].Type === "Điểm 45 phút" || scores[i].Type === "Điểm 90 phút") {
                            totalTiengAnh = totalTiengAnh + parseFloat(scores[i].Point) * 2;
                            countTiengAnh = countTiengAnh + 2;
                        } else if (scores[i].Type === "Điểm thi học kỳ") {
                            totalTiengAnh = totalTiengAnh + parseFloat(scores[i].Point) * 3;
                            countTiengAnh = countTiengAnh + 3;
                        } else {
                            totalTiengAnh = totalTiengAnh + parseFloat(scores[i].Point);
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
            tbTiengAnh = parseFloat(tbTiengAnh);

            //Thể dục
            var tbTheDuc = 0;
            parseFloat(tbTheDuc);
            var totalTheDuc = 0;
            parseFloat(totalTheDuc);
            var countTheDuc = 0;
            for (var i = 0; i < scores.length; i++) {
                if (scores[i].Subject === "Thể dục") {
                    if (scores[i].Point !== "Thiếu điểm") {
                        if (scores[i].Type === "Điểm miệng" || scores[i].Type === "Điểm 15 phút") {
                            totalTheDuc = totalTheDuc + parseFloat(scores[i].Point);
                            countTheDuc = countTheDuc + 1;
                        } else if (scores[i].Type === "Điểm 45 phút" || scores[i].Type === "Điểm 90 phút") {
                            totalTheDuc = totalTheDuc + parseFloat(scores[i].Point) * 2;
                            countTheDuc = countTheDuc + 2;
                        } else if (scores[i].Type === "Điểm thi học kỳ") {
                            totalTheDuc = totalTheDuc + parseFloat(scores[i].Point) * 3;
                            countTheDuc = countTheDuc + 3;
                        } else {
                            totalTheDuc = totalTheDuc + parseFloat(scores[i].Point);
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
            tbTheDuc = parseFloat(tbTheDuc);

            //Công nghệ
            var tbCongNghe = 0;
            parseFloat(tbCongNghe);
            var totalCongNghe = 0;
            parseFloat(totalCongNghe);
            var countCongNghe = 0;
            for (var i = 0; i < scores.length; i++) {
                if (scores[i].Subject === "Công nghệ") {
                    if (scores[i].Point !== "Thiếu điểm") {
                        if (scores[i].Type === "Điểm miệng" || scores[i].Type === "Điểm 15 phút") {
                            totalCongNghe = totalCongNghe + parseFloat(scores[i].Point);
                            countCongNghe = countCongNghe + 1;
                        } else if (scores[i].Type === "Điểm 45 phút" || scores[i].Type === "Điểm 90 phút") {
                            totalCongNghe = totalCongNghe + parseFloat(scores[i].Point) * 2;
                            countCongNghe = countCongNghe + 2;
                        } else if (scores[i].Type === "Điểm thi học kỳ") {
                            totalCongNghe = totalCongNghe + parseFloat(scores[i].Point) * 3;
                            countCongNghe = countCongNghe + 3;
                        } else {
                            totalCongNghe = totalCongNghe + parseFloat(scores[i].Point);
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
            tbCongNghe = parseFloat(tbCongNghe);


            this.tb = ((tbToan + tbVatLy + tbHoaHoc + tbSinhHoc + tbNguVan + tbLichSu + tbDiaLy + tbTinHoc + tbCongDan + tbTiengAnh + tbTheDuc + tbCongNghe) / 12).toFixed(2);
            //hạnh kiểm: 
            var conduct;
            var tmp = totalBonus + totalCritic;
            if (tmp >= 0) {
                conduct = "Tốt";
            } else if (tmp >= -100 && tmp <0) {
                conduct = "Khá";
            } else if (tmp >= -200 && tmp < -100) {
                conduct = "Trung bình";
            } else if (tmp < -200) {
                conduct = "Yếu";
            }
            //
            //put
            var objectStudent = {};
            objectStudent["StudentID"] = data[t].StudentID;
            objectStudent["MediumScore"] = this.tb;
            objectStudent["Bonus"] = totalBonus;
            objectStudent["Critic"] = totalCritic;
            objectStudent["Conduct"] = conduct;
            $.ajax({
                method: 'PUT',
                url: '/studentscalculate',
                data: JSON.stringify(objectStudent),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                },
                error: function () {
                    alert("Hệ thống đang bị lỗi! Vui lòng liên hệ MISA!");
                }
            });
            //

        }
        
    }
    loadData() {
        $('.loading').show();

        var me = this;
        var data = me.getData();

        this.AppenData(data);
        this.CountRecord();
        //$('.loading').hide();
        setTimeout(function () {
            $('.loading').hide();

        }, 500);
        sortTable("table_student",0, ">");

    }
    loadChangePageSize() {
        var me = this;
        var data = me.getData();
        this.AppenData(data);
        this.CountRecord();
        sortTable("table_student", 0, ">");

    }
    search(colNumber, id_input) {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById(id_input);
        filter = input.value.toUpperCase();
        table = document.getElementById("table_student");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[colNumber];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    sortTable(colNumber, objective) {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("table_student");
        switching = true;

        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[colNumber];
                y = rows[i + 1].getElementsByTagName("TD")[colNumber];
                if (objective == ">") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }

                } else {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }
    sortByScoreMedium() {
        sortTable("table_student", 6, "<");
    }
    sortByName() {
        sortTable("table_student", 1, ">");
    }
    sortByBonus() {
        sortTable("table_student",3, "<");

    }
    sortByCritic() {
        sortTable("table_student", 4, ">");
    }
    searchByCode() {
        this.search(0, "code_search");
    }
    searchByName() {
        this.search(1, "name_search");

    }
    searchBySex() {
        this.search(2, "sex_search");

    }
    
    
    searchByBonus() {
        this.search(3, "bonus_search");
    }
    searchByCritic() {
        this.search(4, "critic_search");
    }
    searchByConduct() {
        this.search(5, "conduct_search");
    }
    searchByMediumScore() {
        this.search(6, "medium_score_search");
    }
    searchByClassify() {
        this.search(7, "classify_search");
    }
    
    /**
    * Hàm  thực hiện load dữ liệu của hàm getRefreshData lên table
    * Người tạo: Hàn Trung Kiên
    * Ngày tạo: 22/8/2019
    * */
    loadRefreshData() {
        $('.loading').show();

        var me = this;
        var data = me.getRefreshData(classID);
        this.AppenData(data);
        this.CountRecord();
        //$('.loading').hide();
        setTimeout(function () {
            $('.loading').hide();

        }, 500);

    }
    loadTrangDau() {
        $('.loading').show();

        var me = this;
        var data = me.getTrangDau();
        this.AppenData(data);
        this.CountRecord();
        setTimeout(function () {
            $('.loading').hide();
        }, 500);
    }
    loadTrangCuoi() {
        $('.loading').show();

        var me = this;
        var data = me.getTrangCuoi(classID);
        this.AppenData(data);
        this.CountRecord();
        setTimeout(function () {
            $('.loading').hide();
        }, 500);
    }
    loadTrangTruoc() {
        $('.loading').show();

        var me = this;
        var data = me.getTrangTruoc();
        this.AppenData(data);
        this.CountRecord();
        setTimeout(function () {
            $('.loading').hide();

        }, 500);
    }
    loadTrangSau() {

        var me = this;
        var data = me.getTrangSau();
        this.AppenData(data);
        this.CountRecord();
        
    }
    


    /**
    * Hàm  thực hiện load dữ liệu trang đầu tiên cho page-size hiện tại
    * Người tạo: Hàn Trung Kiên
    * Ngày tạo: 22/8/2019
    * */
    getTrangDau(classID) {
        $('.loading').show();

        $('.page-index').val(1);

        var pageIndex = $('.page-index').val();
        var pageSize = $('.page-size option:selected').val();

        this.FormatBtn(pageIndex, pageSize);




        var fakeData = [];
        for (var i = (pageIndex - 1) * pageSize; i < (pageIndex * pageSize); i++) {
            fakeData.push(this.allStudentClass[i]);
        }

        return fakeData;




    }

    /**
    * Hàm thực hiện việc quay lại một trang so với trang hiện tại:
    * Người tạo: Hàn Trung Kiên
    * Ngày tạo: 22/8/2019
    * */
    getTrangTruoc() {
        $('.loading').show();



        $('.page-index').val($('.page-index').val() - 1);

        var pageIndex = $('.page-index').val();

        var pageSize = $('.page-size option:selected').val();
        this.FormatBtn(pageIndex, pageSize);




        var fakeData = [];
        for (var i = (pageIndex - 1) * pageSize; i < (pageIndex * pageSize); i++) {
            fakeData.push(this.allStudentClass[i]);
        }
        return fakeData;




    }
    /**
    * Hàm thực hiện việc load trang sau so với trang hiện tại:
    * Người tạo: Hàn Trung Kiên
    * Ngày tạo: 22/8/2019
    * */
    getTrangSau() {
        $('.page-index').val(parseInt($('.page-index').val()) + 1);
        var pageIndex = $('.page-index').val();
        var pageSize = $('.page-size option:selected').val();
        this.FormatBtn(pageIndex, pageSize);

        var fakeData = [];
        for (var i = (pageIndex - 1) * pageSize; i < (pageIndex * pageSize); i++) {
            fakeData.push(this.allStudentClass[i]);
        }
        return fakeData;
    }

    /**
     * Hàm thực hiện load trang cuối cùng
     * Người tạo: Hàn Trung Kiên
     * Ngày tạo: 22/8/2019
     * */

    getTrangCuoi(classID) {
        $('.loading').show();

        var pageSize = $('.page-size option:selected').val();

        if (this.getAllData(classID).length % pageSize !== 0) {
            $('.page-index').val(parseInt(this.getAllData(classID).length / pageSize) + 1);

        } else if (this.getAllData(classID).length % pageSize === 0) {
            $('.page-index').val(parseInt(this.getAllData(classID).length / pageSize));

        }




        var pageIndex = $('.page-index').val();
        this.FormatBtn(pageIndex, pageSize);




        var fakeData = [];
        for (var i = (pageIndex - 1) * pageSize; i < this.allStudentClass.length; i++) {
            fakeData.push(this.allStudentClass[i]);
        }

        return fakeData;

    }
    /**
    *Hàm thực hiện in ra câu hiện thị bao nhiêu bản ghi trong phần Trang:
    * Người tạo: Hàn Trung Kiên
    * Ngày tạo: 22/8/2019
    * */

    CountRecord() {
        var me = this;

        if ($('.main-table tbody tr').length === 0) {
            $('.phan-trang .dem-ban-ghi').text("Không có dữ liệu hoặc vượt quá số trang!");
            $('.phan-trang .dem-ban-ghi').css("color", "red");



        } else {
            var a = ($('.page-index').val() - 1) * $('.page-size').val() + 1;
            var b = ($('.page-index').val() - 1) * $('.page-size').val() + $('.main-table tbody tr').length;
            var c = this.allStudentClass.length;
            

            if (c % ($('.page-size').val()) !== 0) {
                $('.phan-trang .so-trang-max').text("trên " + parseInt(c / ($('.page-size').val()) + 1));

            } else if (c % ($('.page-size').val()) === 0) {
                $('.phan-trang .so-trang-max').text("trên " + parseInt(c / ($('.page-size').val())));

            }

            $('.phan-trang .dem-ban-ghi').text("Hiển thị " + a + " - " + b + " trên " + c + " kết quả");
            $('.phan-trang .dem-ban-ghi').css("color", "black");

        }



    }
    /**
    *Hàm thực hiện việc format trạng thái cho các button ở phần phân trang:
    * Người tạo: Hàn Trung Kiên
    * Ngày tạo: 22/8/2019
    * */
    FormatBtn(pageIndex, pageSize) {
        if (this.getAllData(classID).length % pageSize !== 0) {
            $('.page-index').attr("max", this.getAllData(classID).length / pageSize + 1);
            if (pageIndex > parseInt((this.getAllData(classID).length / pageSize))) {
                $('.page-index').prop('disabled', true);
                $('button#trang-sau').prop('disabled', true);
                $('button#trang-cuoi').prop('disabled', true);



            } else {
                $('.page-index').prop('disabled', false);
                $('button#trang-sau').prop('disabled', false);
                $('button#trang-cuoi').prop('disabled', false);




            }

        } else if (this.getAllData(classID).length % pageSize === 0) {
            $('.page-index').attr("max", this.getAllData(classID).length / pageSize);
            if (pageIndex >= parseInt((this.getAllData(classID).length / pageSize))) {
                $('.page-index').prop('disabled', true);
                $('button#trang-sau').prop('disabled', true);
                $('button#trang-cuoi').prop('disabled', true);



            } else {
                $('.page-index').prop('disabled', false);
                $('button#trang-sau').prop('disabled', false);
                $('button#trang-cuoi').prop('disabled', false);




            }

        }

        if (pageIndex == 1) {
            $('button#trang-dau').prop('disabled', true);
            $('button#trang-truoc').prop('disabled', true);



        } else {
            $('button#trang-dau').prop('disabled', false);
            $('button#trang-truoc').prop('disabled', false);

        }


        $('button.duplicate').prop('disabled', true);
        $('button.delete').prop('disabled', true);
        $('button.edit').prop('disabled', true);

    }

    /**
    *Hàm thực hiện đơn thuần công việc appen dữ liệu lên table
    * Người tạo: Hàn Trung Kiên
    * Ngày tạo: 22/8/2019
    * */
    AppenData(fakeData) {
        var classCode;
        var className;
        var TeacherID;
        $.ajax({
            method: 'GET',
            url: '/classes/' + classID,
            dataType: 'json',
            async: false,
            success: function (res) {
                classCode = res.Code;
                className = res.Name;
                TeacherID = res.TeacherID;
            },
            error: function (res) {
                alert("Hệ thống đang bị lỗi!");
            }
        })
        var teacherName;
        $.ajax({
            method: 'GET',
            url: '/teachers/' + TeacherID,
            dataType: 'json',
            async: false,
            success: function (res) {
                teacherName = res.Name;
            },
            error: function (res) {
                alert("Hệ thống đang bị lỗi!");
            }
        })
        var classTitle = "Mã lớp: " + classCode + " - Tên lớp: " + className + " - Giáo viên chủ nhiệm: " + teacherName;
        $("#class_title").text(classTitle);
        var fields = $('.main-table th[fieldName]');
        $('.main-table tbody').empty();
        $.each(fakeData, function (index, item) {
            var rowHTML = $('<tr></tr>').data("recordid", item["StudentID"]);
            $.each(fields, function (fieldIndex, fieldItem) {
                var fieldName = fieldItem.getAttribute('fieldName');
                var fieldValue;
                if (fieldName == "Classify") {
                    fieldValue = "Chưa xếp loại";
                } else {
                    fieldValue = item[fieldName];
                }
                rowHTML.append('<td>' + fieldValue + '</td>');
            });
            $('.main-table tbody').append(rowHTML);
        });

    }
    AppenSubmitScore(fakeData) {
        var fields = $('.main-table-submit-score th[fieldName]');
        $('.main-table-submit-score tbody').empty();
        $.each(fakeData, function (index, item) {
            var rowHTML = $('<tr></tr>').data("recordid", item["StudentID"]);
            $.each(fields, function (fieldIndex, fieldItem) {
                var fieldName = fieldItem.getAttribute('fieldName');
                var fieldValue = item[fieldName];
                if (fieldValue == undefined) {
                    rowHTML.append('<td contenteditable="true">' + "" + '</td>');

                } else {
                    rowHTML.append('<td>' + fieldValue + '</td>');

                }
            });
            $('.main-table-submit-score tbody').append(rowHTML);
        });
    }

    GetScore(studentID) {
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
    GetBonusStudent(studentID) {
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
    GetCritic(studentID) {
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
    AppendBonusStudent(fakeData) {
        var totalBonus = 0;
        totalBonus = parseFloat(totalBonus);
        for (var t = 0; t < fakeData.length; t++) {
            totalBonus = totalBonus + parseFloat(fakeData[t].Value) ;
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
    AppendCritic(fakeData) {
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

    AppendScore(fakeData) {
        //tinh diem trung binh Toán:
        var tbToan = 0;
        parseFloat(tbToan);
        var totalToan = 0;
        parseFloat(totalToan);
        var countToan = 0;
        for (var i = 0; i < fakeData.length; i++) {
            if (fakeData[i].Subject === "Toán") {
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    if (fakeData[i].Point !== "Thiếu điểm") {
                        totalToan = totalToan + parseFloat(fakeData[i].Point);
                        countToan = countToan + 1;
                    }
                    
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    if (fakeData[i].Point !== "Thiếu điểm") {
                        totalToan = totalToan + parseFloat(fakeData[i].Point) * 2;
                        countToan = countToan + 2;
                    }
                    
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    if (fakeData[i].Point !== "Thiếu điểm") {
                        totalToan = totalToan + parseFloat(fakeData[i].Point) * 3;
                        countToan = countToan + 3;
                    }
                    
                } else {
                    if (fakeData[i].Point !== "Thiếu điểm") {
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
                if (fakeData[i].Type === "Điểm miệng" || fakeData[i].Type === "Điểm 15 phút") {
                    if (fakeData[i].Point !== "Thiếu điểm") {
                        totalVatLy = totalVatLy + parseFloat(fakeData[i].Point);
                        countVatLy = countVatLy + 1;
                    }
                    
                } else if (fakeData[i].Type === "Điểm 45 phút" || fakeData[i].Type === "Điểm 90 phút") {
                    if (fakeData[i].Point !== "Thiếu điểm") {
                        totalVatLy = totalVatLy + parseFloat(fakeData[i].Point) * 2;
                        countVatLy = countVatLy + 2;
                    }
                    
                } else if (fakeData[i].Type === "Điểm thi học kỳ") {
                    if (fakeData[i].Point !== "Thiếu điểm") {
                        totalVatLy = totalVatLy + parseFloat(fakeData[i].Point) * 3;
                        countVatLy = countVatLy + 3;
                    }
                    
                } else {
                    if (fakeData[i].Point !== "Thiếu điểm") {
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
        var tbCongNghe =0;
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
    loadScore(studentID) {
        var data = this.GetScore(studentID);
        this.AppendScore(data);
    }
    loadBonusStudent(studentID) {
        var data = this.GetBonusStudent(studentID);
        this.AppendBonusStudent(data);
    }
    loadCritic(studentID) {
        var data = this.GetCritic(studentID);
        this.AppendCritic(data);
    }
    loadSubmitScore() {
        var data = this.getAllData(classID);
        this.AppenSubmitScore(data);
    }

    

    
}