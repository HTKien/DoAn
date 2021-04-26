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
    public class CriticsController : ApiController
    {
        private CriticDL _criticDL = new CriticDL();
        private CriticBL _criticBL = new CriticBL();
        public VIEWContext db = new VIEWContext();
        /// <summary>
        /// service thực hiện lấy toàn bộ danh sách phụ huynh
        /// Người tạo: Hàn Trung Kiên
        /// </summary>
        /// <returns></returns>

        [Route("critics")]
        [HttpGet]
        public IEnumerable<Critic> GetAllCritic()
        {
            return _criticDL.GetCritic();
        }

        /// <summary>
        /// service thực hiện lấy danh sách phụ huynh tùy vào trang và kích thước trang:
        /// Người tạo: Hàn Trung Kiên
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>


        [Route("critics/{pageIndex}/{pageSize}")]
        [HttpGet]
        public IEnumerable<Critic> GetPagingCritic(int pageIndex, int pageSize)
        {
            return _criticBL.GetPagingData(pageIndex, pageSize);
        }


        //service thực hiện xóa dữ liệu phụ huynh trên database:
        //Người tạo : Hàn Trung Kiên
        [Route("critics")]
        [HttpDelete]
        public async Task<AjaxResult> DeleteCriticCtrl([FromBody] List<Guid> ids)
        {
            await Task.Delay(1000);
            var ajaxResult = new AjaxResult();
            try
            {
                _criticDL.DeleteCritic(ids);
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
        //Người tạo : Hàn Trung Kiên
        [Route("critics/{id}")]
        [HttpGet]
        public Critic GetInforCritic(Guid id)
        {
            var criticItem = db.Critics.Where(p => p.CriticID == id).FirstOrDefault();
            return criticItem;
        }


        //Service thực hiện thêm mới phụ huynh: 
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        [Route("critics")]
        [HttpPost]
        public AjaxResult PostCritic([FromBody] Critic _critic)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                _criticDL.AddCritic(_critic);
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
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019

        [Route("critics")]
        [HttpPut]
        public AjaxResult PutCritic([FromBody] Critic _critic)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                _criticDL.UpdateCritic(_critic);
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