using Domain.Entities;

namespace Videoteka.Application.Videos.Queries.Dtos;

public record VideoDto
{
    public VideoDto(Video video)
    {
        Id = video.Id;
        Name = video.Name;
        UploaderId = video.Uploader.Id;
    }

    public Guid Id { get; init; }
    public string Name { get; init; }
    public Guid UploaderId { get; init; }
}