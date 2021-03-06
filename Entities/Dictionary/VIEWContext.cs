using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Entities
{
    public class VIEWContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public VIEWContext() : base("name=VIEWContext")
        {
        }

        public System.Data.Entity.DbSet<Entities.Parent> Parents { get; set; }
        public System.Data.Entity.DbSet<Entities.Teacher> Teachers { get; set; }
        public System.Data.Entity.DbSet<Entities.Class> Classes { get; set; }
        public System.Data.Entity.DbSet<Entities.Student> Students { get; set; }
        public System.Data.Entity.DbSet<Entities.Score> Scores { get; set; }
        public System.Data.Entity.DbSet<Entities.BonusStudent> BonusStudents { get; set; }
        public System.Data.Entity.DbSet<Entities.Critic> Critics { get; set; }
        public System.Data.Entity.DbSet<Entities.User> Users { get; set; }
    }
}
