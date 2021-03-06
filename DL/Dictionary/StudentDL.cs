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
        public IEnumerable<Student> GetStudent()
        {
            return db.Students;
        }

        //Hàm thực hiện việc xóa dữ  liệu  bản ghi học sinh: xoa nhieu hoac xoa 1 deu duoc
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
        public void AddStudent(Student _student)
        {
            _student.StudentID = Guid.NewGuid();
            db.Students.Add(_student);
            db.SaveChanges();
        }


        //Hàm thực hiện sửa thông tin học sinh
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
        //Hàm thực hiện update các thông số của học sinh
        public void UpdateStudentCalculate(Student _student)
        {
            var studentFind = db.Students.Where(n => n.StudentID == _student.StudentID).SingleOrDefault();
            studentFind.MediumScore = _student.MediumScore;
            studentFind.Bonus = _student.Bonus;
            studentFind.Critic = _student.Critic;
            studentFind.Conduct = _student.Conduct;
            studentFind.Classify = _student.Classify;
            db.SaveChanges();
        }
        //Hàm thực hiện việc update điểm danh:
        public void UpdateAttendence(Student _student)
        {
            var studentFind = db.Students.Where(n => n.StudentID == _student.StudentID).SingleOrDefault();
            studentFind.Attendence = _student.Attendence;
            db.SaveChanges();
        }
        //Hàm thực hiện việc update total điểm danh:
        public void UpdateTotalAttendence(Student _student)
        {
            var studentFind = db.Students.Where(n => n.StudentID == _student.StudentID).SingleOrDefault();
            studentFind.Status = _student.Status;
            db.SaveChanges();
        }
        //Hàm thực hiện việc update total điểm danh:
        public void UpdatePH(Student _student)
        {
            var studentFind = db.Students.Where(n => n.StudentID == _student.StudentID).SingleOrDefault();
            studentFind.ParentName = _student.ParentName;
            studentFind.ParentPhone = _student.ParentPhone;
            db.SaveChanges();
        }

    }
}
