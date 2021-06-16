using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using BL;
using DL;
using Entities;

namespace VIEW.Controllers
{
    public class ScoresController : ApiController
    {
        private ScoreDL _scoreDL = new ScoreDL();
        private ScoreBL _scoreBL = new ScoreBL();
        public VIEWContext db = new VIEWContext();
        /// <summary>
        /// service thực hiện lấy toàn bộ danh sách phụ huynh
        /// </summary>
        /// <returns></returns>

        [Route("scores")]
        [HttpGet]
        public IEnumerable<Score> GetAllScore()
        {
            return _scoreDL.GetScore();
        }

        /// <summary>
        /// service thực hiện lấy danh sách phụ huynh tùy vào trang và kích thước trang:
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>


        [Route("scores/{pageIndex}/{pageSize}")]
        [HttpGet]
        public IEnumerable<Score> GetPagingScore(int pageIndex, int pageSize)
        {
            return _scoreBL.GetPagingData(pageIndex, pageSize);
        }


        //service thực hiện xóa dữ liệu phụ huynh trên database:
        [Route("scores")]
        [HttpDelete]
        public async Task<AjaxResult> DeleteScoreCtrl([FromBody] List<Guid> ids)
        {
            await Task.Delay(1000);
            var ajaxResult = new AjaxResult();
            try
            {
                _scoreDL.DeleteScore(ids);
            }
            catch (Exception ex)
            {
                ajaxResult.Data = ex;
                ajaxResult.Success = false;
                ajaxResult.Message = "Hệ thống đang lỗi!";
            }
            return ajaxResult;
        }

        //service thực hiện lấy thông tin bản ghi theo ID
        [Route("scores/{id}")]
        [HttpGet]
        public Score GetInforScore(Guid id)
        {
            var scoreItem = db.Scores.Where(p => p.ScoreID == id).FirstOrDefault();
            return scoreItem;
        }


        //Service thực hiện thêm mới phụ huynh: 
        [Route("scores")]
        [HttpPost]
        public AjaxResult PostScore([FromBody] Score _score)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                _scoreDL.AddScore(_score);
            }
            catch (Exception ex)
            {
                ajaxResult.Data = ex;
                ajaxResult.Success = false;
                ajaxResult.Message = "Hệ thống đang bị lỗi!";
            }
            return ajaxResult;
        }
        //Hàm thực hiện sửa thông tin khách hàng

        [Route("scores")]
        [HttpPut]
        public AjaxResult PutScore([FromBody] Score _score)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                _scoreDL.UpdateScore(_score);
            }
            catch (Exception ex)
            {
                ajaxResult.Data = ex;
                ajaxResult.Success = false;
                ajaxResult.Message = "Hệ thống đang bị lỗi!";
            }
            return ajaxResult;
        }

    }
}