using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class ScoreDL
    {
        private VIEWContext db = new VIEWContext();

        //Hàm thực hiện lấy dữ liệu điểm từ database về 
        //Người tạo: Hàn Trung Kiên
        public IEnumerable<Score> GetScore()
        {
            return db.Scores;
        }

        //Hàm thực hiện việc xóa dữ  liệu  bản ghi điểm: xoa nhieu hoac xoa 1 deu duoc
        //Người tạo: Hàn Trung Kiên
        public void DeleteScore(List<Guid> ids)
        {
            foreach (var id in ids)
            {
                var scoreItem = db.Scores.Where(p => p.ScoreID == id).FirstOrDefault();
                db.Scores.Remove(scoreItem);
            }
            db.SaveChanges();


        }

        //Hàm thực hiện thêm mới điểm: 
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        public void AddScore(Score _score)
        {
            _score.ScoreID = Guid.NewGuid();
            db.Scores.Add(_score);
            db.SaveChanges();
        }


        //Hàm thực hiện sửa thông tin điểm
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        public void UpdateScore(Score _score)
        {
            var scoreFind = db.Scores.Where(n => n.ScoreID == _score.ScoreID).SingleOrDefault();
            scoreFind.Subject = _score.Subject;
            scoreFind.Type = _score.Type;
            scoreFind.Point = _score.Point;
            scoreFind.StudentID = _score.StudentID;
            db.SaveChanges();
        }
    }
}
