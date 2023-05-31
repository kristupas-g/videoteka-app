using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Videoteka.Application.Common.Exceptions;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Auth.Commands;

public record LoginCommand : IRequest
{
    public string Username { get; init; }
    public string HashedPassword { get; init; }
}

public class LoginCommandHandler : IRequestHandler<LoginCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly IAuthService _authService;

    public LoginCommandHandler(IApplicationDbContext context, IAuthService userService)
    {
        _context = context;
        _authService = userService;
    }

    public async Task<Unit> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _context.Users
            .Where(x =>
                x.Username == request.Username && x.HashedPassword == request.HashedPassword)
            .FirstOrDefaultAsync();

        if (user is null)
        {
            throw new NotFoundException(nameof(User), "User not found");
        }

        await _authService.Login(user);

        return Unit.Value;
    }
}