namespace SquadProject.Backend.Configuration
{
    /// <summary>
    /// Strongly-typed configuration for backend settings.
    /// Values from environment variables (or secrets) will be preferred;
    /// appsettings.json values are used as a fallback for local development.
    /// </summary>
    public class BackendSettings
    {
        public string? DefaultConnection { get; set; }
        public string? ExampleSetting { get; set; }
        public string? ExampleSecret { get; set; }
    }
}
