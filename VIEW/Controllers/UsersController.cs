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
    public class UsersController : ApiController
    {
        private UserDL _userDL = new UserDL();
        private UserBL _userBL = new UserBL();
        public VIEWContext db = new VIEWContext();
        /// <summary>
        /// service thực hiện lấy toàn bộ danh sách phụ huynh
        /// Người tạo: Hàn Trung Kiên
        /// </summary>
        /// <returns></returns>

        [Route("users")]
        [HttpGet]
        public IEnumerable<User> GetAllUser()
        {
            return _userDL.GetUser();
        }

        /// <summary>
        /// service thực hiện lấy danh sách phụ huynh tùy vào trang và kích thước trang:
        /// Người tạo: Hàn Trung Kiên
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>


        [Route("users/{pageIndex}/{pageSize}")]
        [HttpGet]
        public IEnumerable<User> GetPagingUser(int pageIndex, int pageSize)
        {
            return _userBL.GetPagingData(pageIndex, pageSize);
        }


        //service thực hiện xóa dữ liệu phụ huynh trên database:
        //Người tạo : Hàn Trung Kiên
        [Route("users")]
        [HttpDelete]
        public async Task<AjaxResult> DeleteUserCtrl([FromBody] List<Guid> ids)
        {
            await Task.Delay(1000);
            var ajaxResult = new AjaxResult();
            try
            {
                _userDL.DeleteUser(ids);
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
        [Route("users/{id}")]
        [HttpGet]
        public User GetInforUser(Guid id)
        {
            var userItem = db.Users.Where(p => p.UserID == id).FirstOrDefault();
            return userItem;
        }


        //Service thực hiện thêm mới phụ huynh: 
        //Người tạo: Hàn Trung Kiên
        //Ngày tạo: 26/8/2019
        [Route("users")]
        [HttpPost]
        public AjaxResult PostUser([FromBody] User _user)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                _userDL.AddUser(_user);
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

        [Route("users")]
        [HttpPut]
        public AjaxResult PutUser([FromBody] User _user)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                _userDL.UpdateUser(_user);
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