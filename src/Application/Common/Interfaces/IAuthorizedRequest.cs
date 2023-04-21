namespace Videoteka.Application.Common.Interfaces;

public interface IAuthorizedRequest
{
    public Task<bool> Authorize(IApplicationDbContext context);
}