using Microsoft.EntityFrameworkCore;

namespace Videoteka.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}