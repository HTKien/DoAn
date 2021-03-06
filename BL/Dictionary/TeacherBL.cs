using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DL;
using Entities;

namespace BL
{
    public class TeacherBL
    {
        private TeacherDL _teacherDL = new TeacherDL();
        
        public IEnumerable<Teacher> GetPagingData(int _pageIndex, int _pageSize)
        {
            var _teachers = _teacherDL.GetTeacher();
            _teachers = _teachers.OrderBy(p => p.Code)
            .Skip((_pageIndex - 1) * _pageSize)
            .Take(_pageSize);
            return _teachers;

        }
    }
}
