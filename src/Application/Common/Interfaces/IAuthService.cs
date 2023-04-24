using Domain.Entities;

namespace Videoteka.Application.Common.Interfaces;

public interface IAuthService
{
    public Task Login(User user);
    public Task Logout();
}