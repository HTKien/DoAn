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
                        ParentID = c.Guid(nullable: false, defaultValueSql: "newid()"),
                        Code = c.String(nullable: false),
                        Name = c.String(nullable: false),
                        Address = c.String(nullable: false),
                        Phone = c.String(nullable: false),
                        Note = c.String(),
                    })
                .PrimaryKey(t => t.ParentID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Parents");
        }
    }
}
