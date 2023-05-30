using Videoteka.Domain.Common;

namespace Domain.Entities;

public class User : BaseAuditableEntity
{
    public string Username { get; set; }
    public string HashedPassword { get; set; }
    public ICollection<Video> UploadedVideos { get; } = new List<Video>();
    public ICollection<VideoComment> WrittenComments { get; } = new List<VideoComment>();
}