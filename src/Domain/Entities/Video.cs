using Videoteka.Domain.Common;

namespace Domain.Entities;

public class Video : BaseAuditableEntity
{
    public string Name { get; set; }
    public string? Description { get; set; }
    public int Views { get; set; }

    public string ThumbnailUrl { get; set; }
    public string VideoUrl { get; set; }

    public Guid UploaderId { get; set; }
    public User Uploader { get; set; } = null!;

    public ICollection<VideoComment> Comments { get; } = new List<VideoComment>();
}