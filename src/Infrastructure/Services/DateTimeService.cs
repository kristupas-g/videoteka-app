using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Infrastructure.Services;

public class DateTimeService : IDateTime
{
    public DateTime Now => DateTime.Now;
}
