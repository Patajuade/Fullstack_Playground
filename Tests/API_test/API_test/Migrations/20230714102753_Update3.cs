using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_test.Migrations
{
    /// <inheritdoc />
    public partial class Update3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Spec",
                table: "Character");

            migrationBuilder.AlterColumn<string>(
                name: "Class",
                table: "Character",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Character",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "Character");

            migrationBuilder.AlterColumn<string>(
                name: "Class",
                table: "Character",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<string>(
                name: "Spec",
                table: "Character",
                type: "TEXT",
                nullable: true);
        }
    }
}
