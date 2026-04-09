using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using SquadProject.Backend.Data;
using SquadProject.Backend.Services;
using SquadProject.Backend.MCP;
using SquadProject.Backend.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Bind BackendSettings: prefer environment variables/secrets; fall back to appsettings.json for local dev
var backendSettings = new SquadProject.Backend.Configuration.BackendSettings();

// Environment variables use '__' as separator for hierarchical keys (ConnectionStrings__DefaultConnection)
var envDefaultConn = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection");
if (!string.IsNullOrEmpty(envDefaultConn))
{
    backendSettings.DefaultConnection = envDefaultConn;
}
else
{
    // Try configuration (appsettings.json and other providers)
    backendSettings.DefaultConnection = builder.Configuration.GetConnectionString("DefaultConnection");
}

// Additional settings: prefer env vars, then configuration section
var envExampleSecret = Environment.GetEnvironmentVariable("BackendSettings__ExampleSecret");
if (!string.IsNullOrEmpty(envExampleSecret)) backendSettings.ExampleSecret = envExampleSecret;
backendSettings.ExampleSetting = builder.Configuration["BackendSettings:ExampleSetting"] ?? backendSettings.ExampleSetting;

// Ensure a fallback connection string if nothing provided
backendSettings.DefaultConnection ??= "Server=(localdb)\\mssqllocaldb;Database=SquadProject;Trusted_Connection=True;";

// Register the settings instance for DI
builder.Services.AddSingleton(backendSettings);

// DbContext (use resolved connection string)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(backendSettings.DefaultConnection));

// Business services
builder.Services.AddScoped<IUnitConversionService, UnitConversionService>();
builder.Services.AddScoped<IRandomGeneratorService, RandomGeneratorService>();

// MCP host
builder.Services.AddHostedService<MCPHostService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Global exception handling middleware
app.UseMiddleware<ExceptionHandlingMiddleware>();

// Health endpoint for readiness/liveness checks
app.MapGet("/health", () => Results.Json(new {
    status = "Healthy",
    checks = new[] { new { name = "self", status = "Healthy" } },
    timestampUtc = DateTime.UtcNow
}));

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
