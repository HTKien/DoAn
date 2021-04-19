using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class CriticDL
    {
        private VIEWContext db = new VIEWContext();

        //Hàm thực hiện lấy dữ liệu điểm từ database về 
        //Người tạo: Hàn Trung Kiên
        public IEnumerable<Critic> GetCritic()
        {
            return db.Critics;
        }

        //Hàm thực hiện việc xóa dữ  liệu  bản ghi điểm: xoa nhieu hoac xoa 1 deu duoc
        //Người tạo: Hàn Trung Kiên
        public void DeleteCritic(List<Guid> ids)
        {
            foreach (var id in ids)
            {
                var criticItem = db.Critics.Where(p => p.CriticID == id).FirstOrDefault();
                db.Critics.Remove(criticItem);
            }
            db.SaveChanges();


        }

        //Hàm thực hiện thêm mới điểm: 
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        public void AddCritic(Critic _critic)
        {
            _critic.CriticID = Guid.NewGuid();
            db.Critics.Add(_critic);
            db.SaveChanges();
        }


        //Hàm thực hiện sửa thông tin điểm
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        public void UpdateCritic(Critic _critic)
        {
            var criticFind = db.Critics.Where(n => n.CriticID == _critic.CriticID).SingleOrDefault();
            criticFind.Time = _critic.Time;
            criticFind.Content = _critic.Content;
            criticFind.Subject = _critic.Subject;
            criticFind.Value = _critic.Value;
            criticFind.StudentID = _critic.StudentID;
            db.SaveChanges();
        }
    }
}
