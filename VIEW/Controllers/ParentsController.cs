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
        /// service thực hiện lấy toàn bộ danh sách phụ huynh
        /// </summary>
        /// <returns></returns>

        [Route("parents")]
        [HttpGet]
        public IEnumerable<Parent> GetAllParent()
        {
            return _parentDL.GetParent();
        }

        /// <summary>
        /// service thực hiện lấy danh sách phụ huynh tùy vào trang và kích thước trang:
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


        //service thực hiện xóa dữ liệu phụ huynh trên database:
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

        //service thực hiện lấy thông tin bản ghi theo ID
        [Route("parents/{id}")]
        [HttpGet]
        public Parent GetInforParent(Guid id)
        {
            var parentItem = db.Parents.Where(p => p.ParentID == id).FirstOrDefault();
            return parentItem;
        }


        //Service thực hiện thêm mới phụ huynh: 
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