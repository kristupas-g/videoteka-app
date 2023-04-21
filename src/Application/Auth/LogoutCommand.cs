using MediatR;

namespace Videoteka.Application.Auth;

public record LogoutCommand : IRequest { }

public class LogoutCommandHandler : IRequestHandler<LoginCommand>
{
    public LogoutCommandHandler() { }

    public Task<Unit> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}