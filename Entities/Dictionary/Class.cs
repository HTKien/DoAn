using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Class
    {
        public Guid ClassID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string SchoolYear { get; set; }
        public string Note { get; set; }
        public Guid TeacherID { get; set; }
    }
}
