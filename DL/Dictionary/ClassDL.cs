using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class ClassDL
    {
        private VIEWContext db = new VIEWContext();

        //Hàm thực hiện lấy dữ liệu lớp học từ database về 
        //Người tạo: Hàn Trung Kiên
        public IEnumerable<Class> GetClass()
        {
            return db.Classes;
        }

        //Hàm thực hiện việc xóa dữ  liệu  bản ghi lớp học: xoa nhieu hoac xoa 1 deu duoc
        //Người tạo: Hàn Trung Kiên
        public void DeleteClass(List<Guid> ids)
        {
            foreach (var id in ids)
            {
                var classItem = db.Classes.Where(p => p.ClassID == id).FirstOrDefault();
                db.Classes.Remove(classItem);
            }
            db.SaveChanges();


        }

        //Hàm thực hiện thêm mới lớp học: 
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        public void AddClass(Class _class)
        {
            _class.ClassID = Guid.NewGuid();
            db.Classes.Add(_class);
            db.SaveChanges();
        }


        //Hàm thực hiện sửa thông tin lớp học
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        public void UpdateClass(Class _class)
        {
            var classFind = db.Classes.Where(n => n.ClassID == _class.ClassID).SingleOrDefault();
            classFind.Code = _class.Code;
            classFind.Name = _class.Name;
            classFind.SchoolYear = _class.SchoolYear;
            classFind.Note = _class.Note;
            classFind.TeacherID = _class.TeacherID;
            db.SaveChanges();
        }
    }
}
