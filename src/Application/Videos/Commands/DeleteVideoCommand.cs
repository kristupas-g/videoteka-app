using Domain.Entities;
using MediatR;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Videos.Commands;

public record DeleteVideoCommand(Guid Id) : IRequest;

public class DeleteVideoCommandHandler : IRequestHandler<DeleteVideoCommand>
{
    private readonly IApplicationDbContext _dbContext;

    public DeleteVideoCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    public async Task<Unit> Handle(DeleteVideoCommand request, CancellationToken cancellationToken)
    {
        var video = await _dbContext.Videos.FindAsync(request.Id);

        if (video == null) {
            return Unit.Value;
        }

        _dbContext.Videos.Remove(video);
        await _dbContext.SaveChangesAsync();

        return Unit.Value;
    }
}