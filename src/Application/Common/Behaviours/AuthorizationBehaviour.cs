using MediatR;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Common.Behaviours;

public class AuthorizationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>, IAuthorizedRequest
{
    private readonly IApplicationDbContext _context;
    private readonly IAuthService _authService;

    public AuthorizationBehaviour(IApplicationDbContext context, IAuthService authService)
    {
        _context = context;
        _authService = authService;
    }

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken
    )
    {
        var isAuthorized = await request.Authorize(_context, _authService);

        if (!isAuthorized)
        {
            throw new UnauthorizedAccessException("User cannot access this resource");
        }

        var response = await next();

        return response;
    }
}