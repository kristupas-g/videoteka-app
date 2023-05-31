using System;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Videos.Commands;

    public record UpdateVideoCommand(Guid Id, string Name, string? Description) : IRequest, IAuthorizedRequest
    {
        public async Task<bool> Authorize(IApplicationDbContext context, IAuthService authService)
        {
            var video = await context.Videos.Include(x => x.Uploader).FirstAsync(x => x.Id == Id);
            var username = await authService.ValidateCookieAndGetUsername();

            return username != null && video.Uploader.Username == username;
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
    

