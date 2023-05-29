using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Videoteka.Application.Common.Exceptions;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.VideoComments.Commands;

public record CreateCommentCommand : IRequest, IAuthorizedRequest
{
    public Guid VideoId { get; init; }
    public string Comment { get; init; }

    public async Task<bool> Authorize(IApplicationDbContext context, IAuthService authService)
    {
        return await authService.ValidateCookieAndGetUsername() != null;
    }
}

public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IAuthService _authService;

    public CreateCommentCommandHandler(IApplicationDbContext dbContext, IAuthService authService)
    {
        _dbContext = dbContext;
        _authService = authService;
    }

    public async Task<Unit> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
    {
        var user = await FindUserAsync();
        var video = await _dbContext.Videos.FindAsync(request.VideoId);
        var comment = CreateComment(request, user);

        if (video is null)
        {
            throw new NotFoundException(nameof(Video), request.VideoId);
        }

        _dbContext.VideoComments.Add(comment);
        await _dbContext.SaveChangesAsync();

        return Unit.Value;
    }

    private async Task<User> FindUserAsync()
    {
        var username = await _authService.ValidateCookieAndGetUsername();

        return await _dbContext.Users.FirstAsync(x => x.Username == username);
    }

    private VideoComment CreateComment(CreateCommentCommand request, User user)
    {
        return new VideoComment
        {
            Comment = request.Comment,
            VideoId = request.VideoId,
            AuthorId = user.Id,
        };
    }
}