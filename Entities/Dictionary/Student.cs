using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Student
    {
        public Guid StudentID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Sex { get; set; }
        public string Birthday { get; set; }
        public string Address { get; set; }
        public Guid ClassID { get; set; }
        public string ParentName { get; set; }
        public string ParentPhone { get; set; }
        public string Bonus { get; set; }
        public string Critic { get; set; }
        public string Attendence { get; set; }
        public string Conduct { get; set; }
        public string MediumScore { get; set; }
        public string Classify { get; set; }
        public string Status { get; set; }
        public string Note { get; set; }
    }
}
