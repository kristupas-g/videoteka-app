using System;
using MediatR;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Videos.Commands;

    public record UpdateVideoCommand(Guid Id, string Name, string? Description) : IRequest;
    

    public class UpdateVideoCommandHandler : IRequestHandler<UpdateVideoCommand>
    {
        private readonly IApplicationDbContext _dbContext;

        public UpdateVideoCommandHandler(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(UpdateVideoCommand request, CancellationToken cancellationToken)
        {
            var video = await _dbContext.Videos.FindAsync(request.Id);
            Console.WriteLine(video);

            if (video == null)
            {
                return Unit.Value;
            }

            // Update the video properties
            video.Name = request.Name;
            video.Description = request.Description;

            _dbContext.Videos.Update(video);
            await _dbContext.SaveChangesAsync();

            return Unit.Value;
        }
    }
    

