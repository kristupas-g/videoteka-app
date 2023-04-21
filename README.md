# Videoteka 

## Running the program

### Running
Commands should be ran in project root
```
dotnet run --project src/WebUI
```

### Testing
```
dotnet test
```

### Adding migrations
```
dotnet ef migrations add "YourMigrationName" --project src\Infrastructure --startup-project src\WebUI --output-dir Persistence\Migrations
```

## Auth
### Authentication
The application uses cookie based authentication. 
All HTTP methods should have an authentication annotation.
#### Examples
Example of an endpoint where the user has to be loged-in.
```csharp
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Endpoint()
    {
        return Ok();
    }
```
Example of an endpoint where the user doesnt have to be loged-in.
```csharp
    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Endpoint()
    {
        return Ok();
    }
```

### Authorization
All **MediatR** commands and queries that need authorization should implement **IAuthorizedRequest** interface.
Example
```csharp
public record ExampleCommand: IRequest, IAuthorizedRequest
{
    public Guid Id { get; init; }
    public Task<bool> Authorize(IApplicationDbContext context)
    {
        //Authorization logic should go here
        //This gets executed before the Handle method
        //If this returns false the Handle method is NOT executed
    }
}
```
