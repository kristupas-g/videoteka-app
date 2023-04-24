using MediatR;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Auth;

public record LoginCommand : IRequest
{
    public string Username { get; init; }
    public string HashedPassword { get; init; }
}

public class LoginCommandHandler : IRequestHandler<LoginCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly IAuthService _userService;

    public LoginCommandHandler(IApplicationDbContext context, IAuthService userService)
    {
        _context = context;
        _userService = userService;
    }

    public Task<Unit> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = _context.Users
            .Where(
                x => x.Username == request.Username && x.HashedPassword == request.HashedPassword
            )
            .Single();

        if (user is null)
        {
            // TODO handle this exception
            throw new KeyNotFoundException("Either username or email is incorrect");
        }

        _userService.Login(user);

        return Task.FromResult(Unit.Value);
    }
}