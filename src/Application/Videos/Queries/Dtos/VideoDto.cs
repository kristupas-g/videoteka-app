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
        UploaderId = video.Uploader.Id;
    }

    public Guid Id { get; init; }
    public string Name { get; init; }
    public string? Description { get; init; }
    public int Views { get; init; }
    public Guid? UploaderId { get; init; }
}