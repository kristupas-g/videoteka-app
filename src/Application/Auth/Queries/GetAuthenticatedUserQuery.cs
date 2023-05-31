using MediatR;
using Videoteka.Application.Auth.Queries.Dtos;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Auth.Queries;

public record GetAuthenticatedUserQuery : IRequest<UserDto?>;

public class GetAuthenticatedUserQueryHandler : IRequestHandler<GetAuthenticatedUserQuery, UserDto?>
{
    private readonly IApplicationDbContext _context;
    private readonly IAuthService _authService;

    public GetAuthenticatedUserQueryHandler(IApplicationDbContext context, IAuthService userService)
    {
        _context = context;
        _authService = userService;
    }

    public async Task<UserDto?> Handle(GetAuthenticatedUserQuery request, CancellationToken cancellationToken)
    {
        var username = await _authService.ValidateCookieAndGetUsername();
        var user = _context.Users.FirstOrDefault(x => x.Username == username);

        if (user is null)
        {
            return null;
        }

        return new UserDto(user);
    }
}