using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Scores
    {
        public Guid ScoresID { get; set; }
        public string Code { get; set; }
        public string Subject { get; set; }
        public string Type { get; set; }
        public string Point { get; set; }
        public Guid StudentID { get; set; }
    }
}
