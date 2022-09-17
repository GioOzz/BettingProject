using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BettingProject.Migrations
{
    public partial class ConfigKeyTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConfigKey",
                columns: table => new
                {
                    IdConfig = table.Column<int>(type: "int", nullable: false),
                    Key = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Value = table.Column<string>(type: "varchar(max)", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.IdConfig);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "ConfigKey");
        }
    }
}
