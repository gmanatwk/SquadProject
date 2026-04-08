namespace SquadProject.Backend.Models.Responses
{
    public class ConvertResponse
    {
        public int FromUnitId { get; set; }
        public int ToUnitId { get; set; }
        public decimal OriginalValue { get; set; }
        public decimal ConvertedValue { get; set; }
    }
}
