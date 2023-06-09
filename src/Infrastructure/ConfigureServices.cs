﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Videoteka.Application.Common.Interfaces;
using Videoteka.Infrastructure.Persistence;
using Videoteka.Infrastructure.Services;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options => options.UseMySQL(configuration.GetConnectionString("DefaultConnection")));

        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

        services.AddScoped<ApplicationDbContextInitialiser>();

        services.AddTransient<IAuthService, AuthService>();

        services.AddScoped<IVideoService, VideoService>();

        services.AddTransient<IDateTime, DateTimeService>();

        return services;
    }
}