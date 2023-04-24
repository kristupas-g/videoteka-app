using MediatR;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Common.Behaviours;

public class AuthorizationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>, IAuthorizedRequest
{
    private readonly IApplicationDbContext _context;

    public AuthorizationBehaviour(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken
    )
    {
        var isAuthorized = await request.Authorize(_context);

        if (!isAuthorized)
        {
            // TODO handle this exception
            throw new UnauthorizedAccessException("User cannot acces this resource");
        }

        var response = await next();

        return response;
    }
}