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
    public class TeachersController : ApiController
    {
        private TeacherDL _teacherDL = new TeacherDL();
        private TeacherBL _teacherBL = new TeacherBL();
        public VIEWContext db = new VIEWContext();
        /// <summary>
        /// service thực hiện lấy toàn bộ danh sách phụ huynh
        /// Người tạo: Hàn Trung Kiên
        /// </summary>
        /// <returns></returns>

        [Route("teachers")]
        [HttpGet]
        public IEnumerable<Teacher> GetAllTeacher()
        {
            return _teacherDL.GetTeacher();
        }

        /// <summary>
        /// service thực hiện lấy danh sách phụ huynh tùy vào trang và kích thước trang:
        /// Người tạo: Hàn Trung Kiên
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>


        [Route("teachers/{pageIndex}/{pageSize}")]
        [HttpGet]
        public IEnumerable<Teacher> GetPagingTeacher(int pageIndex, int pageSize)
        {
            return _teacherBL.GetPagingData(pageIndex, pageSize);
        }


        //service thực hiện xóa dữ liệu phụ huynh trên database:
        //Người tạo : Hàn Trung Kiên
        [Route("teachers")]
        [HttpDelete]
        public async Task<AjaxResult> DeleteTeacherCtrl([FromBody] List<Guid> ids)
        {
            await Task.Delay(1000);
            var ajaxResult = new AjaxResult();
            try
            {
                _teacherDL.DeleteTeacher(ids);
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
        [Route("teachers/{id}")]
        [HttpGet]
        public Teacher GetInforTeacher(Guid id)
        {
            var teacherItem = db.Teachers.Where(p => p.TeacherID == id).FirstOrDefault();
            return teacherItem;
        }


        //Service thực hiện thêm mới phụ huynh: 
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        [Route("teachers")]
        [HttpPost]
        public AjaxResult PostTeacher([FromBody] Teacher _teacher)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                _teacherDL.AddTeacher(_teacher);
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

        [Route("teachers")]
        [HttpPut]
        public AjaxResult PutTeacher([FromBody] Teacher _teacher)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                _teacherDL.UpdateTeacher(_teacher);
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