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
    public class BonusStudentsController : ApiController
    {
        private BonusStudentDL _bonusStudentDL = new BonusStudentDL();
        private BonusStudentBL _bonusStudentBL = new BonusStudentBL();
        public VIEWContext db = new VIEWContext();
        /// <summary>
        /// service thực hiện lấy toàn bộ danh sách phụ huynh
        /// </summary>
        /// <returns></returns>

        [Route("bonusStudents")]
        [HttpGet]
        public IEnumerable<BonusStudent> GetAllBonusStudent()
        {
            return _bonusStudentDL.GetBonusStudent();
        }

        /// <summary>
        /// service thực hiện lấy danh sách phụ huynh tùy vào trang và kích thước trang:
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>


        [Route("bonusStudents/{pageIndex}/{pageSize}")]
        [HttpGet]
        public IEnumerable<BonusStudent> GetPagingBonusStudent(int pageIndex, int pageSize)
        {
            return _bonusStudentBL.GetPagingData(pageIndex, pageSize);
        }


        //service thực hiện xóa dữ liệu phụ huynh trên database:
        [Route("bonusStudents")]
        [HttpDelete]
        public async Task<AjaxResult> DeleteBonusStudentCtrl([FromBody] List<Guid> ids)
        {
            await Task.Delay(1000);
            var ajaxResult = new AjaxResult();
            try
            {
                _bonusStudentDL.DeleteBonusStudent(ids);
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
        [Route("bonusStudents/{id}")]
        [HttpGet]
        public BonusStudent GetInforBonusStudent(Guid id)
        {
            var bonusStudentItem = db.BonusStudents.Where(p => p.BonusStudentID == id).FirstOrDefault();
            return bonusStudentItem;
        }


        //Service thực hiện thêm mới phụ huynh: 
        [Route("bonusStudents")]
        [HttpPost]
        public AjaxResult PostBonusStudent([FromBody] BonusStudent _bonusStudent)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                _bonusStudentDL.AddBonusStudent(_bonusStudent);
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

        [Route("bonusStudents")]
        [HttpPut]
        public AjaxResult PutBonusStudent([FromBody] BonusStudent _bonusStudent)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                _bonusStudentDL.UpdateBonusStudent(_bonusStudent);
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