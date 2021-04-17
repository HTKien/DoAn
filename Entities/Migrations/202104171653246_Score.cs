namespace Entities.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Score : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Scores",
                c => new
                {
                    ScoreID = c.Guid(defaultValueSql: "newid()"),
                    Subject = c.String(nullable: false),
                    Type = c.String(nullable: false),
                    Point = c.String(nullable: false),
                    StudentID = c.Guid(nullable: false),
                })
                .PrimaryKey(t => t.ScoreID);
        }
        
        public override void Down()
        {
            DropTable("dbo.Scores");

        }
    }
}
