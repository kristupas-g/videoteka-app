using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Videoteka.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddUrlsToVideo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ThumbnailUrl",
                table: "Videos",
                type: "longtext",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "VideoUrl",
                table: "Videos",
                type: "longtext",
                nullable: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ThumbnailUrl",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "VideoUrl",
                table: "Videos");
        }
    }
}
