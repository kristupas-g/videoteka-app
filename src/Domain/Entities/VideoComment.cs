using Videoteka.Domain.Common;

namespace Domain.Entities;

public class VideoComment : BaseAuditableEntity
{
    public string Comment { get; set; }

    public Guid VideoId { get; set; }
    public Video Video { get; set; } = null!;

    public Guid AuthorId { get; set; }
    public User Author { get; set; } = null!;
}