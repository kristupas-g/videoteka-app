using System.Data.Common;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System.Diagnostics;

namespace Videoteka.Infrastructure.Persistence.Interceptors;

public class QueryLoggingInterceptor : DbCommandInterceptor
{
    public override InterceptionResult<DbDataReader> ReaderExecuting(
        DbCommand command,
        CommandEventData eventData,
        InterceptionResult<DbDataReader> result
    )
    {
        LogQuery(GetLogString(command.CommandText));
        return base.ReaderExecuting(command, eventData, result);
    }

    public override InterceptionResult<int> NonQueryExecuting(
        DbCommand command,
        CommandEventData eventData,
        InterceptionResult<int> result
    )
    {
        LogQuery(GetLogString(command.CommandText));
        return base.NonQueryExecuting(command, eventData, result);
    }

    public override InterceptionResult<object> ScalarExecuting(
        DbCommand command,
        CommandEventData eventData,
        InterceptionResult<object> result
    )
    {
        LogQuery(GetLogString(command.CommandText));
        return base.ScalarExecuting(command, eventData, result);
    }

    private string GetLogString(string commandText)
    {
        string timestamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff");
        return $"[Query at {timestamp}]: {commandText}";
    }

    private void LogQuery(string log)
    {
        Debug.WriteLine(log);
    }
}