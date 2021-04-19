namespace Entities.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Critic : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Critics",
                c => new
                    {
                        CriticID = c.Guid(defaultValueSql: "newid()"),
                        Time = c.String(nullable: false),
                        Content = c.String(nullable: false),
                        Subject = c.String(nullable: false),
                        Value = c.String(nullable: false),
                        StudentID = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.CriticID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Critics");
        }
    }
}
