using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Videoteka.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<User> Users { get; set; }
    DbSet<Video> Videos { get; set; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}