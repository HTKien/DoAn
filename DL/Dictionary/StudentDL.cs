using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class StudentDL
    {
        private VIEWContext db = new VIEWContext();

        //Hàm thực hiện lấy dữ liệu học sinh từ database về 
        //Người tạo: Hàn Trung Kiên
        public IEnumerable<Student> GetStudent()
        {
            return db.Students;
        }

        //Hàm thực hiện việc xóa dữ  liệu  bản ghi học sinh: xoa nhieu hoac xoa 1 deu duoc
        //Người tạo: Hàn Trung Kiên
        public void DeleteStudent(List<Guid> ids)
        {
            foreach (var id in ids)
            {
                var studentItem = db.Students.Where(p => p.StudentID == id).FirstOrDefault();
                db.Students.Remove(studentItem);
            }
            db.SaveChanges();


        }

        //Hàm thực hiện thêm mới học sinh: 
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        public void AddStudent(Student _student)
        {
            _student.StudentID = Guid.NewGuid();
            db.Students.Add(_student);
            db.SaveChanges();
        }


        //Hàm thực hiện sửa thông tin học sinh
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        public void UpdateStudent(Student _student)
        {
            var studentFind = db.Students.Where(n => n.StudentID == _student.StudentID).SingleOrDefault();
            studentFind.Code = _student.Code;
            studentFind.Name = _student.Name;
            studentFind.Sex = _student.Sex;
            studentFind.Birthday = _student.Birthday;
            studentFind.Address = _student.Address;
            studentFind.ParentName = _student.ParentName;
            studentFind.ParentPhone = _student.ParentPhone;
            studentFind.Note = _student.Note;
            db.SaveChanges();
        }
    }
}
