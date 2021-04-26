using DL;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class CriticBL
    {
        private CriticDL _criticDL = new CriticDL();
        //Hàm thực hiện lấy dữ liệu theo số trang và kích thước trang:
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 22/8/2019
        public IEnumerable<Critic> GetPagingData(int _pageIndex, int _pageSize)
        {
            var _critics = _criticDL.GetCritic();
            _critics = _critics.OrderBy(p => p.Subject)
            .Skip((_pageIndex - 1) * _pageSize)
            .Take(_pageSize);
            return _critics;

        }
    }
}
