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
    public class StudentsController : ApiController
    {
        private StudentDL _studentDL = new StudentDL();
        private StudentBL _studentBL = new StudentBL();
        public VIEWContext db = new VIEWContext();
        /// <summary>
        /// service thực hiện lấy toàn bộ danh sách học sinh
        /// Người tạo: Hàn Trung Kiên
        /// </summary>
        /// <returns></returns>

        [Route("students")]
        [HttpGet]
        public IEnumerable<Student> GetAllStudent()
        {
            return _studentDL.GetStudent();
        }

        /// <summary>
        /// service thực hiện lấy danh sách học sinh tùy vào trang và kích thước trang:
        /// Người tạo: Hàn Trung Kiên
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>


        [Route("students/{pageIndex}/{pageSize}")]
        [HttpGet]
        public IEnumerable<Student> GetPagingStudent(int pageIndex, int pageSize)
        {
            return _studentBL.GetPagingData(pageIndex, pageSize);
        }


        //service thực hiện xóa dữ liệu học sinh trên database:
        //Người tạo : Hàn Trung Kiên
        [Route("students")]
        [HttpDelete]
        public async Task<AjaxResult> DeleteStudentCtrl([FromBody] List<Guid> ids)
        {
            await Task.Delay(1000);
            var ajaxResult = new AjaxResult();
            try
            {
                _studentDL.DeleteStudent(ids);
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
        [Route("students/{id}")]
        [HttpGet]
        public Student GetInforStudent(Guid id)
        {
            var studentItem = db.Students.Where(p => p.StudentID == id).FirstOrDefault();
            return studentItem;
        }


        //Service thực hiện thêm mới học sinh: 
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        [Route("students")]
        [HttpPost]
        public AjaxResult PostStudent([FromBody] Student _student)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                _studentDL.AddStudent(_student);
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

        [Route("students")]
        [HttpPut]
        public AjaxResult PutStudent([FromBody] Student _student)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                _studentDL.UpdateStudent(_student);
            }
            catch (Exception ex)
            {
                ajaxResult.Data = ex;
                ajaxResult.Success = false;
                ajaxResult.Message = "Hệ thống đang bị lỗi!";
            }
            return ajaxResult;
        }
        //Hàm thực hiện sửa thông tin cập nhật thêm của học sinh
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019

        [Route("studentscalculate")]
        [HttpPut]
        public AjaxResult PutStudentCalculate([FromBody] Student _student)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                _studentDL.UpdateStudentCalculate(_student);
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