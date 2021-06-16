using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DL;
using Entities;
namespace BL
{
    public class ParentBL
    {
        private ParentDL _parentDL = new ParentDL();
        
        public IEnumerable<Parent> GetPagingData(int _pageIndex, int _pageSize)
        {
            var _parents = _parentDL.GetParent();
            _parents = _parents.OrderBy(p => p.Code)
            .Skip((_pageIndex - 1) * _pageSize)
            .Take(_pageSize);
            return _parents;

        }
    }
}
