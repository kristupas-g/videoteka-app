namespace Domain.Entities;

public class Video
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public int Views { get; set; }

    public Guid UploaderId { get; set; }
    public User Uploader { get; set; } = null!;
}