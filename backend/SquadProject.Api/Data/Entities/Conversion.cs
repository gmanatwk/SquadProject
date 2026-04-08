namespace SquadProject.Backend.Data.Entities
{
    /// <summary>
    /// Conversion factor between two units
    /// </summary>
    public class Conversion
    {
        public int Id { get; set; }
        public int FromUnitId { get; set; }
        public int ToUnitId { get; set; }
        public decimal Factor { get; set; }

        public Unit? FromUnit { get; set; }
        public Unit? ToUnit { get; set; }
    }
}