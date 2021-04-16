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
                        ScoreID = c.Guid(nullable: false),
                        Subject = c.String(),
                        Type = c.String(),
                        Point = c.String(),
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
