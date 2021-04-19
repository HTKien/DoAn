using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Critic
    {
        public Guid CriticID { get; set; }
        public string Time { get; set; }
        public string Content { get; set; }
        public string Subject { get; set; }
        public string Value { get; set; }
        public Guid StudentID { get; set; }
    }
}
