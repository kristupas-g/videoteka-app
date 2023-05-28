using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Videoteka.Application.Common.Interfaces;
using Videoteka.Application.Videos.Queries.Dtos;

namespace Videoteka.Application.Videos.Commands;

public record CreateVideoCommand : IRequest, IAuthorizedRequest
{
    public string Name { get; init; }
    public string? Description { get; init; }
    public IFormFile File { get; init; }

    public async Task<bool> Authorize(IApplicationDbContext context, IAuthService authService)
    {
        return await authService.ValidateCookieAndGetUsername() != null;
    }
}

public class CreateVideoCommandHandler : IRequestHandler<CreateVideoCommand>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IVideoService _videoService;
    private readonly IAuthService _authService;

    public CreateVideoCommandHandler(
        IApplicationDbContext dbContext, IVideoService videoService, IAuthService authService)
    {
        _dbContext = dbContext;
        _videoService = videoService;
        _authService = authService;
    }

    public async Task<Unit> Handle(CreateVideoCommand request, CancellationToken cancellationToken)
    {
        var id = Guid.NewGuid();
        var user = await FindUserAsync();
        var video = CreateVideo(id, request, user);

        using (IDbContextTransaction transaction = _dbContext.Database.BeginTransaction())
        {
            try
            {
                Stream stream = request.File.OpenReadStream();
                await _videoService.StoreVideo(stream, id.ToString());

                _dbContext.Videos.Add(video);
                await _dbContext.SaveChangesAsync();

                transaction.Commit();

                return Unit.Value;
            }
            catch (System.Exception)
            {
                transaction.Rollback();
                throw;
            }
        }
    }

    private async Task<User> FindUserAsync()
    {
        var username = await _authService.ValidateCookieAndGetUsername();

        return await _dbContext.Users.FirstAsync(x => x.Username == username);
    }

    private Video CreateVideo(Guid id, CreateVideoCommand request, User user)
    {
        return new Video
        {
            Id = id,
            Name = request.Name,
            Description = request.Description,
            UploaderId = user.Id,
        };
    }
}