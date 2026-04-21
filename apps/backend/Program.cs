using Microsoft.EntityFrameworkCore;
using Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Connection string from environment variable
var connStr = builder.Configuration.GetConnectionString("Default") ??
    builder.Configuration["ConnectionStrings:Default"] ??
    "Host=localhost;Port=5432;Database=nicknames;Username=user;Password=password";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connStr));

builder.Services.AddControllers();

var app = builder.Build();

// Seed demo data in development
using (var scope = app.Services.CreateScope())
{{
    var ctx = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    if (!ctx.Nicknames.Any())
    {{
        ctx.Nicknames.AddRange(new[] {{
            new Api.Models.Nickname {{ FullName = "Alice Anderson", Nick = "ali" }},
            new Api.Models.Nickname {{ FullName = "Bob Brown", Nick = "bobby" }},
            new Api.Models.Nickname {{ FullName = "Carol Clark", Nick = "caz" }},
        }});
        ctx.SaveChanges();
    }}
}}

app.MapControllers();
app.Run();
