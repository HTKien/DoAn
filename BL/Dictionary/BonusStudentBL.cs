using DL;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class BonusStudentBL
    {
        private BonusStudentDL _bonusStudentDL = new BonusStudentDL();
        //Hàm thực hiện lấy dữ liệu theo số trang và kích thước trang:
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 22/8/2019
        public IEnumerable<BonusStudent> GetPagingData(int _pageIndex, int _pageSize)
        {
            var _bonusStudents = _bonusStudentDL.GetBonusStudent();
            _bonusStudents = _bonusStudents.OrderBy(p => p.Subject)
            .Skip((_pageIndex - 1) * _pageSize)
            .Take(_pageSize);
            return _bonusStudents;

        }
    }
}
