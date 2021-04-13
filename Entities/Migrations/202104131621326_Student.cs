namespace Entities.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Student : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Students",
                c => new
                    {
                        StudentID = c.Guid(defaultValueSql: "newid()"),
                        Code = c.String(nullable: false),
                        Name = c.String(nullable: false),
                        Sex = c.String(nullable: false),
                        Birthday = c.String(nullable: false),
                        Address = c.String(nullable: false),
                        ClassID = c.Guid(nullable: false),
                        ParentName = c.String(),
                        ParentPhone = c.String(),
                        Bonus = c.String(),
                        Critic = c.String(),
                        Attendence = c.String(),
                        Conduct = c.String(),
                        MediumScore = c.String(),
                        Classify = c.String(),
                        Status = c.String(),
                        Note = c.String(),
                    })
                .PrimaryKey(t => t.StudentID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Students");
        }
    }
}
