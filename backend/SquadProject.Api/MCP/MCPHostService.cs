using Microsoft.Extensions.Hosting;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace SquadProject.Backend.MCP
{
    /// <summary>
    /// Minimal MCP host stub. Implement MCP protocol bindings later.
    /// </summary>
    public class MCPHostService : IHostedService
    {
        private readonly ILogger<MCPHostService> _logger;
        public MCPHostService(ILogger<MCPHostService> logger) => _logger = logger;

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("MCP host starting (stub)");
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("MCP host stopping");
            return Task.CompletedTask;
        }
    }
}
