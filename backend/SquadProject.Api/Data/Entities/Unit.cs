namespace SquadProject.Backend.Data.Entities
{
    /// <summary>
    /// Represents a measurement unit (meter, kilogram, etc.)
    /// </summary>
    public class Unit
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Symbol { get; set; } = string.Empty;
    }
}