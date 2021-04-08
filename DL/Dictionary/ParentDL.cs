using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities;

namespace DL
{
    public class ParentDL
    {
        private VIEWContext db = new VIEWContext();

        //Hàm thực hiện lấy dữ liệu từ database về 
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 22/8/2019
        public IEnumerable<Parent> GetParent()
        {
            return db.Parents;
        }

        //Hàm thực hiện việc xóa dữ  liệu  bản ghi khách hàng: xoa nhieu hoac xoa 1 deu duoc
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 22/8/2019
        public void DeleteParent(List<Guid> ids)
        {
            foreach (var id in ids)
            {
                var parentItem = db.Parents.Where(p => p.ParentID == id).FirstOrDefault();
                db.Parents.Remove(parentItem);
            }
            db.SaveChanges();


        }

        //Hàm thực hiện thêm mới khách hàng: 
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        public void AddParent(Parent _parent)
        {
            _parent.ParentID = Guid.NewGuid();
            db.Parents.Add(_parent);
            db.SaveChanges();
        }


        //Hàm thực hiện sửa thông tin khách hàng
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        public void UpdateParent(Parent _parent)
        {
            var parentFind = db.Parents.Where(n => n.ParentID == _parent.ParentID).SingleOrDefault();
            parentFind.Code = _parent.Code;
            parentFind.Name = _parent.Name;
            parentFind.Address = _parent.Address;
            parentFind.Phone = _parent.Phone;
            parentFind.Note = _parent.Note;
            db.SaveChanges();
        }
    }
}
