using Videoteka.Application.Common.Mappings;
using Videoteka.Domain.Entities;

namespace Videoteka.Application.TodoLists.Queries.ExportTodos;

public class TodoItemRecord : IMapFrom<TodoItem>
{
    public string? Title { get; set; }

    public bool Done { get; set; }
}
