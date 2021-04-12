namespace Entities.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Scores : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Scores",
                c => new
                    {
                        ScoresID = c.Guid(defaultValueSql: "newid()"),
                        Code = c.String(nullable: false),
                        Subject = c.String(nullable: false),
                        Type = c.String(nullable: false),
                        Point = c.String(nullable: false),
                        StudentID = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.ScoresID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Scores");
        }
    }
}
