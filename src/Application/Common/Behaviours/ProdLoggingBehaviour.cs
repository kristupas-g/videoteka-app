using MediatR;
using Microsoft.Extensions.Logging;

namespace Videoteka.Application.Common.Behaviours;

public class ProdLoggingBehaviour<TRequest,TResponse> : LoggingBehaviour<TRequest,TResponse>
    where TRequest : IRequest<TResponse>
{
    public ProdLoggingBehaviour(ILogger<TRequest> logger) : base(logger)
    {
    }

    public override async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        var requestName = typeof(TRequest).Name;
        var content = $"Videoteka Request: {requestName} {request}";

        string logFileName = $"{DateTime.Now:yyyyMMdd}.log";
        string logFilePath = Path.Combine("logs", logFileName);

        if (!File.Exists(logFilePath))
        {
            Directory.CreateDirectory("logs");
        }

        File.AppendAllText(logFilePath, content);

        return await next();
    }
}