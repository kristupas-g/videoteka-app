using Domain.Entities;

namespace Videoteka.Application.Auth.Queries.Dtos;

public record UserDto
{
    public UserDto(User user)
    {
        Id = user.Id;
        Username = user.Username;
        Created = user.Created;
    }

    public Guid Id { get; init; }
    public string Username { get; init; }
    public DateTime Created { get; init; }
}