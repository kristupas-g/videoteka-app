using Domain.Entities;

namespace Videoteka.Application.VideoComments.Queries.Dtos;

public record VideoCommentDto
{
    public VideoCommentDto(VideoComment comment)
    {
        Id = comment.Id;
        VideoId = comment.VideoId;
        AuthorId = comment.AuthorId;
        Username = comment.Author.Username;
        Comment = comment.Comment;
        Created = comment.Created;
    }

    public Guid Id { get; init; }
    public Guid VideoId { get; init; }
    public Guid AuthorId { get; init; }
    public string Username { get; init; }
    public string Comment { get; init; }
    public DateTime Created { get; init; }
}