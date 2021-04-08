using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Entities;
using DL;
using BL;
using System.Threading.Tasks;

namespace VIEW.Controllers
{
    public class ParentsController : ApiController
    {
        private ParentDL _parentDL = new ParentDL();
        private ParentBL _parentBL = new ParentBL();
        public VIEWContext db = new VIEWContext();
        /// <summary>
        /// service thực hiện lấy toàn bộ danh sách khách hàng
        /// Người tạo: Hàn Trung Kiên
        /// Ngày tạo :22/8/2019
        /// </summary>
        /// <returns></returns>

        [Route("parents")]
        [HttpGet]
        public IEnumerable<Parent> GetAllParent()
        {
            return _parentDL.GetParent();
        }

        /// <summary>
        /// service thực hiện lấy danh sách khách hàng tùy vào trang và kích thước trang:
        /// Người tạo: Hàn Trung Kiên
        /// Ngày tạo: 22/8/2019
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>


        [Route("parents/{pageIndex}/{pageSize}")]
        [HttpGet]
        public IEnumerable<Parent> GetPagingParent(int pageIndex, int pageSize)
        {


            return _parentBL.GetPagingData(pageIndex, pageSize);


        }


        //service thực hiện xóa dữ liệu khách hàng trên database:
        //Người tạo : Hàn Trung Kiên
        //Ngày tạo: 22/8/2019
        [Route("parents")]
        [HttpDelete]
        public async Task<AjaxResult> DeleteParentCtrl([FromBody] List<Guid> ids)
        {
            await Task.Delay(1000);
            var ajaxResult = new AjaxResult();
            try
            {
                _parentDL.DeleteParent(ids);
            }
            catch (Exception ex)
            {
                ajaxResult.Data = ex;
                ajaxResult.Success = false;
                ajaxResult.Message = "Hệ thống đang lỗi!";
            }
            return ajaxResult;
        }

        //service thực hiện lấy thông tin phiếu thu theo ID
        //Người tạo : Hàn Trung Kiên
        //Ngày tạo: 25/8/2019
        [Route("parents/{id}")]
        [HttpGet]
        public Parent GetInforParent(Guid id)
        {
            var parentItem = db.Parents.Where(p => p.ParentID == id).FirstOrDefault();
            return parentItem;
        }


        //Service thực hiện thêm mới khách hàng: 
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        [Route("parents")]
        [HttpPost]
        public AjaxResult PostParent([FromBody] Parent _parent)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                _parentDL.AddParent(_parent);
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

        [Route("parents")]
        [HttpPut]
        public AjaxResult PutParent([FromBody] Parent _parent)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                _parentDL.UpdateParent(_parent);
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