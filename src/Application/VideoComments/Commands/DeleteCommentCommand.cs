using MediatR;
using Microsoft.EntityFrameworkCore;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.VideoComments.Commands;

public record DeleteCommentCommand(Guid Id) : IRequest, IAuthorizedRequest
{
    public async Task<bool> Authorize(IApplicationDbContext context, IAuthService authService)
    {
        var username = await authService.ValidateCookieAndGetUsername();
        var user = await context.Users.FirstAsync(x => x.Username == username);

        var comment = await context.VideoComments
            .Include(x => x.Author)
            .FirstAsync(x => x.Id == Id);

        return username != null || comment.AuthorId != user.Id;
    }
}

public class DeleteCommentCommandHandler : IRequestHandler<DeleteCommentCommand>
{
    private readonly IApplicationDbContext _dbContext;

    public DeleteCommentCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Unit> Handle(DeleteCommentCommand request, CancellationToken cancellationToken)
    {
        var comment = await _dbContext.VideoComments.FindAsync(request.Id);

        if (comment is null)
        {
            return Unit.Value;
        }

        _dbContext.VideoComments.Remove(comment);
        await _dbContext.SaveChangesAsync();

        return Unit.Value;
    }
}
