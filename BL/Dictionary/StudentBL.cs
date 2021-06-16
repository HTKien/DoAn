using DL;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class StudentBL
    {
        private StudentDL _studentDL = new StudentDL();
       
        public IEnumerable<Student> GetPagingData(int _pageIndex, int _pageSize)
        {
            var _students = _studentDL.GetStudent();
            _students = _students.OrderBy(p => p.Code)
            .Skip((_pageIndex - 1) * _pageSize)
            .Take(_pageSize);
            return _students;

        }
    }
}
