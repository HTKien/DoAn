﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DL;
using Entities;

namespace BL
{
    public class ClassBL
    {
        private ClassDL _classDL = new ClassDL();
        //Hàm thực hiện lấy dữ liệu theo số trang và kích thước trang:
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 22/8/2019
        public IEnumerable<Class> GetPagingData(int _pageIndex, int _pageSize)
        {
            var _classs = _classDL.GetClass();
            _classs = _classs.OrderBy(p => p.Code)
            .Skip((_pageIndex - 1) * _pageSize)
            .Take(_pageSize);
            return _classs;

        }
    }
}