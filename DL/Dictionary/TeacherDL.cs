using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class TeacherDL
    {
        private VIEWContext db = new VIEWContext();

        //Hàm thực hiện lấy dữ liệu giáo viên từ database về 
        //Người tạo: Hàn Trung Kiên
        public IEnumerable<Teacher> GetTeacher()
        {
            return db.Teachers;
        }

        //Hàm thực hiện việc xóa dữ  liệu  bản ghi giáo viên: xoa nhieu hoac xoa 1 deu duoc
        //Người tạo: Hàn Trung Kiên
        public void DeleteTeacher(List<Guid> ids)
        {
            foreach (var id in ids)
            {
                var teacherItem = db.Teachers.Where(p => p.TeacherID == id).FirstOrDefault();
                db.Teachers.Remove(teacherItem);
            }
            db.SaveChanges();


        }

        //Hàm thực hiện thêm mới giáo viên: 
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        public void AddTeacher(Teacher _teacher)
        {
            _teacher.TeacherID = Guid.NewGuid();
            db.Teachers.Add(_teacher);
            db.SaveChanges();
        }


        //Hàm thực hiện sửa thông tin giáo viên
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        public void UpdateTeacher(Teacher _teacher)
        {
            var teacherFind = db.Teachers.Where(n => n.TeacherID == _teacher.TeacherID).SingleOrDefault();
            teacherFind.Code = _teacher.Code;
            teacherFind.Name = _teacher.Name;
            teacherFind.Address = _teacher.Address;
            teacherFind.Phone = _teacher.Phone;
            teacherFind.Sex = _teacher.Sex;
            teacherFind.Note = _teacher.Note;
            db.SaveChanges();
        }
    }
}
