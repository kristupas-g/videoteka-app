using Domain.Entities;
using MediatR;
using Videoteka.Application.Auth.Queries.Dtos;
using Videoteka.Application.Common.Exceptions;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Users.Queries;

public record GetUserQuery(Guid Id) : IRequest<UserDto>;

public class GetUserQueryHandler : IRequestHandler<GetUserQuery, UserDto>
{
    private readonly IApplicationDbContext _context;

    public GetUserQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<UserDto> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        var user = await _context.Users.FindAsync(request.Id);

        if (user is null)
        {
            throw new NotFoundException(nameof(User), request.Id);
        }

        return new UserDto(user);
    }
}