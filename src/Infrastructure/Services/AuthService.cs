using System.Security.Claims;
using Domain.Entities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuthService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<string?> ValidateCookieAndGetUsername()
    {
        var result = await _httpContextAccessor.HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        if (result?.Principal is ClaimsPrincipal claimsPrincipal)
        {
            return claimsPrincipal.FindFirst(ClaimTypes.Name)?.Value;
        }

        return null;
    }

    public async Task Login(User user)
    {
        var claims = new List<Claim> { new Claim(type: ClaimTypes.Name, value: user.Username) };

        var identity = new ClaimsIdentity(
            claims,
            CookieAuthenticationDefaults.AuthenticationScheme
        );

        await _httpContextAccessor.HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(identity),
            new AuthenticationProperties
            {
                IsPersistent = true,
                AllowRefresh = true,
                ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(30),
            }
        );
    }

    public async Task Logout()
    {
        await _httpContextAccessor.HttpContext.SignOutAsync();
    }
}