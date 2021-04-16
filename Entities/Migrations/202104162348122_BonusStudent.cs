namespace Entities.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class BonusStudent : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BonusStudents",
                c => new
                    {
                        BonusStudentID = c.Guid(defaultValueSql: "newid()"),
                        Time = c.String(nullable: false),
                        Content = c.String(nullable: false),
                        Subject = c.String(),
                        Value = c.String(nullable: false),
                        StudentID = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.BonusStudentID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.BonusStudents");
        }
    }
}
