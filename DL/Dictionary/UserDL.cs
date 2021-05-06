using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class UserDL
    {
        private VIEWContext db = new VIEWContext();

        //Hàm thực hiện lấy dữ liệu phụ huynh từ database về 
        //Người tạo: Hàn Trung Kiên
        public IEnumerable<User> GetUser()
        {
            return db.Users;
        }

        //Hàm thực hiện việc xóa dữ  liệu  bản ghi phụ huynh: xoa nhieu hoac xoa 1 deu duoc
        //Người tạo: Hàn Trung Kiên
        public void DeleteUser(List<Guid> ids)
        {
            foreach (var id in ids)
            {
                var userItem = db.Users.Where(p => p.UserID == id).FirstOrDefault();
                db.Users.Remove(userItem);
            }
            db.SaveChanges();


        }

        //Hàm thực hiện thêm mới phụ huynh: 
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        public void AddUser(User _user)
        {
            _user.UserID = Guid.NewGuid();
            db.Users.Add(_user);
            db.SaveChanges();
        }


        //Hàm thực hiện sửa thông tin phụ huynh
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        public void UpdateUser(User _user)
        {
            var userFind = db.Users.Where(n => n.UserID == _user.UserID).SingleOrDefault();
            userFind.Password = _user.Password;
            db.SaveChanges();
        }
    }
}
