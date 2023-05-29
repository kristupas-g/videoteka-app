using MediatR;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Videos.Commands;

public record UpdateVideoViewsCommand(Guid Id) : IRequest;

public class UpdateVideoViewsCommandHandler : IRequestHandler<UpdateVideoViewsCommand>
{
    private readonly IApplicationDbContext _dbContext;

    public UpdateVideoViewsCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Unit> Handle(UpdateVideoViewsCommand request, CancellationToken cancellationToken)
    {
        var video = await _dbContext.Videos.FindAsync(request.Id);

        if (video == null)
        {
            return Unit.Value;
        }

        video.Views += 1;

        _dbContext.Videos.Update(video);
        await _dbContext.SaveChangesAsync();

        return Unit.Value;
    }
}