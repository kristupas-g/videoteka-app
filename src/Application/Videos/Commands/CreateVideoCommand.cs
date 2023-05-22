using Domain.Entities;
using MediatR;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Videos.Commands;

public record CreateVideoCommand : IRequest
{
    public string Name { get; init; }
}

public class CreateVideoCommandHandler : IRequestHandler<CreateVideoCommand>
{
    private readonly IApplicationDbContext _dbContext;

    public CreateVideoCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    public async Task<Unit> Handle(CreateVideoCommand request, CancellationToken cancellationToken)
    {
        var video = new Video
        {
            Name = request.Name,
        };

        _dbContext.Videos.Add(video);
        await _dbContext.SaveChangesAsync();

        return Unit.Value;
    }
}