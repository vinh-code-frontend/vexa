using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Vexa.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMigrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Category_Category_ParentId",
                table: "Category");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Category",
                table: "Category");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Brand",
                table: "Brand");

            migrationBuilder.RenameTable(
                name: "Category",
                newName: "Categories");

            migrationBuilder.RenameTable(
                name: "Brand",
                newName: "Brands");

            migrationBuilder.RenameIndex(
                name: "IX_Category_Slug",
                table: "Categories",
                newName: "IX_Categories_Slug");

            migrationBuilder.RenameIndex(
                name: "IX_Category_ParentId",
                table: "Categories",
                newName: "IX_Categories_ParentId");

            migrationBuilder.RenameIndex(
                name: "IX_Category_Name",
                table: "Categories",
                newName: "IX_Categories_Name");

            migrationBuilder.RenameIndex(
                name: "IX_Category_DeletedAt",
                table: "Categories",
                newName: "IX_Categories_DeletedAt");

            migrationBuilder.RenameIndex(
                name: "IX_Brand_Slug",
                table: "Brands",
                newName: "IX_Brands_Slug");

            migrationBuilder.RenameIndex(
                name: "IX_Brand_Name",
                table: "Brands",
                newName: "IX_Brands_Name");

            migrationBuilder.RenameIndex(
                name: "IX_Brand_DeletedAt",
                table: "Brands",
                newName: "IX_Brands_DeletedAt");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Categories",
                table: "Categories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Brands",
                table: "Brands",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Categories_ParentId",
                table: "Categories",
                column: "ParentId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Categories_ParentId",
                table: "Categories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Categories",
                table: "Categories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Brands",
                table: "Brands");

            migrationBuilder.RenameTable(
                name: "Categories",
                newName: "Category");

            migrationBuilder.RenameTable(
                name: "Brands",
                newName: "Brand");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_Slug",
                table: "Category",
                newName: "IX_Category_Slug");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_ParentId",
                table: "Category",
                newName: "IX_Category_ParentId");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_Name",
                table: "Category",
                newName: "IX_Category_Name");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_DeletedAt",
                table: "Category",
                newName: "IX_Category_DeletedAt");

            migrationBuilder.RenameIndex(
                name: "IX_Brands_Slug",
                table: "Brand",
                newName: "IX_Brand_Slug");

            migrationBuilder.RenameIndex(
                name: "IX_Brands_Name",
                table: "Brand",
                newName: "IX_Brand_Name");

            migrationBuilder.RenameIndex(
                name: "IX_Brands_DeletedAt",
                table: "Brand",
                newName: "IX_Brand_DeletedAt");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Category",
                table: "Category",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Brand",
                table: "Brand",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Category_Category_ParentId",
                table: "Category",
                column: "ParentId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
