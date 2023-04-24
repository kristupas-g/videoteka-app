using MediatR;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Auth;

public record LogoutCommand : IRequest { }

public class LogoutCommandHandler : IRequestHandler<LogoutCommand>
{
    private readonly IAuthService _authService;

    public LogoutCommandHandler(IAuthService authService)
    {
        _authService = authService;
    }

    public Task<Unit> Handle(LogoutCommand request, CancellationToken cancellationToken)
    {
        _authService.Logout();

        return Task.FromResult(Unit.Value);
    }
}