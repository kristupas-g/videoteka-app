namespace Domain.Entities;

public class User
{
    public Guid Id { get; set; }
    public string Username { get; set; }
    public string HashedPassword { get; set; }
    public ICollection<Video> UploadedVideos { get; } = new List<Video>();
}