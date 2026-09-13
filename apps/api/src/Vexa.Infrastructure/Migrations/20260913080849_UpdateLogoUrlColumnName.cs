using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Vexa.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateLogoUrlColumnName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Logo",
                table: "Category",
                newName: "LogoUrl");

            migrationBuilder.RenameColumn(
                name: "Logo",
                table: "Brand",
                newName: "LogoUrl");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LogoUrl",
                table: "Category",
                newName: "Logo");

            migrationBuilder.RenameColumn(
                name: "LogoUrl",
                table: "Brand",
                newName: "Logo");
        }
    }
}
