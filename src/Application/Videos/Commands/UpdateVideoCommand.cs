using System;
using MediatR;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Videos.Commands;

    public record UpdateVideoCommand(Guid Id, string Name, string? Description) : IRequest, IAuthorizedRequest
    {
        public async Task<bool> Authorize(IApplicationDbContext context, IAuthService authService)
        {
            return await authService.ValidateCookieAndGetUsername() != null;
        }
    }
    

    public class UpdateVideoCommandHandler : IRequestHandler<UpdateVideoCommand>
    {
        private readonly IApplicationDbContext _dbContext;

        public UpdateVideoCommandHandler(IApplicationDbContext dbContext )
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(UpdateVideoCommand request, CancellationToken cancellationToken)
        {
            var video = await _dbContext.Videos.FindAsync(request.Id);

            if (video == null)
            {
                return Unit.Value;
            }

            video.Name = request.Name;
            video.Description = request.Description;

            _dbContext.Videos.Update(video);
            await _dbContext.SaveChangesAsync();

            return Unit.Value;
        }
    }
    

