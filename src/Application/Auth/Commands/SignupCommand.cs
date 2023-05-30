using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Videoteka.Application.Common.Exceptions;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Auth.Commands;

public record SignupCommand : IRequest, IAuthorizedRequest
{
    public string Username { get; init; }
    public string HashedPassword { get; init; }

    public async Task<bool> Authorize(IApplicationDbContext context, IAuthService authService)
    {
        return await authService.ValidateCookieAndGetUsername() == null;
    }
}

public class SignupCommandHandler : IRequestHandler<SignupCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly IAuthService _authService;

    public SignupCommandHandler(IApplicationDbContext context, IAuthService userService)
    {
        _context = context;
        _authService = userService;
    }

    public async Task<Unit> Handle(SignupCommand request, CancellationToken cancellationToken)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == request.Username);

        if (user != null)
        {
            throw new ValidationException(request.Username, "Username already exists");
        }

        var newUser = new User
        {
            Username = request.Username,
            HashedPassword = request.HashedPassword,
        };

        _context.Users.Add(newUser);

        await _context.SaveChangesAsync();
        await _authService.Login(newUser);

        return Unit.Value;
    }
}