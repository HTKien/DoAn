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
    public class ClassesController : ApiController
    {
        private ClassDL _classDL = new ClassDL();
        private ClassBL _classBL = new ClassBL();
        public VIEWContext db = new VIEWContext();
        /// <summary>
        /// service thực hiện lấy toàn bộ danh sách lớp học
        /// </summary>
        /// <returns></returns>

        [Route("classes")]
        [HttpGet]
        public IEnumerable<Class> GetAllClass()
        {
            return _classDL.GetClass();
        }

        /// <summary>
        /// service thực hiện lấy danh sách lớp học tùy vào trang và kích thước trang:
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>


        [Route("classes/{pageIndex}/{pageSize}")]
        [HttpGet]
        public IEnumerable<Class> GetPagingClass(int pageIndex, int pageSize)
        {
            return _classBL.GetPagingData(pageIndex, pageSize);
        }


        //service thực hiện xóa dữ liệu lớp học trên database:
        [Route("classes")]
        [HttpDelete]
        public async Task<AjaxResult> DeleteClassCtrl([FromBody] List<Guid> ids)
        {
            await Task.Delay(1000);
            var ajaxResult = new AjaxResult();
            try
            {
                _classDL.DeleteClass(ids);
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
        [Route("classes/{id}")]
        [HttpGet]
        public Class GetInforClass(Guid id)
        {
            var classItem = db.Classes.Where(p => p.ClassID == id).FirstOrDefault();
            return classItem;
        }


        //Service thực hiện thêm mới lớp học: 
        [Route("classes")]
        [HttpPost]
        public AjaxResult PostClass([FromBody] Class _class)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                _classDL.AddClass(_class);
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

        [Route("classes")]
        [HttpPut]
        public AjaxResult PutClass([FromBody] Class _class)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                _classDL.UpdateClass(_class);
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