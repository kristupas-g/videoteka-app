using Domain.Entities;

namespace Videoteka.Application.Videos.Queries.Dtos;

public record VideoDto
{
    public VideoDto(Video video)
    {
        Id = video.Id;
        Name = video.Name;
        Description = video.Description;
        Views = video.Views;
        ThumbnailUrl = video.ThumbnailUrl;
        VideoUrl = video.VideoUrl;
        UploaderId = video.Uploader.Id;
        Username = video.Uploader.Username;
        Created = video.Created;
    }

    public Guid Id { get; init; }
    public string Name { get; init; }
    public string? Description { get; init; }
    public int Views { get; init; }

    public string ThumbnailUrl { get; init; }
    public string VideoUrl { get; init; }

    public Guid? UploaderId { get; init; }
    public string Username { get; init; }

    public DateTime Created { get; init; }
}