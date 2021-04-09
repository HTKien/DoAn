namespace Entities.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Parents",
                c => new
                    {
                        ParentID = c.Guid(defaultValueSql:"newid()"),
                        Code = c.String(nullable: false),
                        Name = c.String(nullable: false),
                        Address = c.String(),
                        Phone = c.String(nullable: false),
                        Note = c.String(),
                    })
                .PrimaryKey(t => t.ParentID);
            
            CreateTable(
                "dbo.Teachers",
                c => new
                    {
                        TeacherID = c.Guid(defaultValueSql: "newid()"),
                        Code = c.String(nullable: false),
                        Name = c.String(nullable: false),
                        Address = c.String(),
                        Phone = c.String(nullable: false),
                        Sex = c.String(nullable: false),
                        Note = c.String(),
                    })
                .PrimaryKey(t => t.TeacherID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Teachers");
            DropTable("dbo.Parents");
        }
    }
}
