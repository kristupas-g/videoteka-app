using MediatR;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Auth;

public record LoginCommand : IRequest, IAuthorizedRequest
{
    public Task<bool> Authorize(IApplicationDbContext context)
    {
        //authorization logic should go here
        //this gets executed before handle
        //if this returns false handle is NOT executed
        return Task.FromResult(false);
    }
}

public class LoginCommandHandler : IRequestHandler<LoginCommand>
{
    public LoginCommandHandler() { }

    public Task<Unit> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        return Task.FromResult(Unit.Value);
    }
}