using Domain.Entities;

namespace Videoteka.Application.Videos.Queries.Dtos;

public record VideoDto
{
    public VideoDto(Video video)
    {
        Name = video.Name;
    }
    
    public string Name { get; init; }
}