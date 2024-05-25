using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rentify.Migrations
{
    public partial class second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CarParking",
                table: "properties",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "RentPerMonth",
                table: "properties",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CarParking",
                table: "properties");

            migrationBuilder.DropColumn(
                name: "RentPerMonth",
                table: "properties");
        }
    }
}
