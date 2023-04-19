using Videoteka.Application.TodoLists.Queries.ExportTodos;

namespace Videoteka.Application.Common.Interfaces;

public interface ICsvFileBuilder
{
    byte[] BuildTodoItemsFile(IEnumerable<TodoItemRecord> records);
}
