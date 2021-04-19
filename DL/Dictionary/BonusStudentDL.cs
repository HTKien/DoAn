using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class BonusStudentDL
    {
        private VIEWContext db = new VIEWContext();

        //Hàm thực hiện lấy dữ liệu điểm từ database về 
        //Người tạo: Hàn Trung Kiên
        public IEnumerable<BonusStudent> GetBonusStudent()
        {
            return db.BonusStudents;
        }

        //Hàm thực hiện việc xóa dữ  liệu  bản ghi điểm: xoa nhieu hoac xoa 1 deu duoc
        //Người tạo: Hàn Trung Kiên
        public void DeleteBonusStudent(List<Guid> ids)
        {
            foreach (var id in ids)
            {
                var bonusStudentItem = db.BonusStudents.Where(p => p.BonusStudentID == id).FirstOrDefault();
                db.BonusStudents.Remove(bonusStudentItem);
            }
            db.SaveChanges();


        }

        //Hàm thực hiện thêm mới điểm: 
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        public void AddBonusStudent(BonusStudent _bonusStudent)
        {
            _bonusStudent.BonusStudentID = Guid.NewGuid();
            db.BonusStudents.Add(_bonusStudent);
            db.SaveChanges();
        }


        //Hàm thực hiện sửa thông tin điểm
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        public void UpdateBonusStudent(BonusStudent _bonusStudent)
        {
            var bonusStudentFind = db.BonusStudents.Where(n => n.BonusStudentID == _bonusStudent.BonusStudentID).SingleOrDefault();
            bonusStudentFind.Time = _bonusStudent.Time;
            bonusStudentFind.Content = _bonusStudent.Content;
            bonusStudentFind.Subject = _bonusStudent.Subject;
            bonusStudentFind.Value = _bonusStudent.Value;
            bonusStudentFind.StudentID = _bonusStudent.StudentID;
            db.SaveChanges();
        }
    }
}
