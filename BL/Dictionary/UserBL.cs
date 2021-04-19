using DL;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class UserBL
    {
        private UserDL _userDL = new UserDL();
        //Hàm thực hiện lấy dữ liệu theo số trang và kích thước trang:
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 22/8/2019
        public IEnumerable<User> GetPagingData(int _pageIndex, int _pageSize)
        {
            var _users = _userDL.GetUser();
            _users = _users.OrderBy(p => p.Username)
            .Skip((_pageIndex - 1) * _pageSize)
            .Take(_pageSize);
            return _users;

        }
    }
}
