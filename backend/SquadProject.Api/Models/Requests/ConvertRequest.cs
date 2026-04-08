namespace SquadProject.Backend.Models.Requests
{
    public class ConvertRequest
    {
        public decimal FromValue { get; set; }
        public string FromUnit { get; set; } = string.Empty;
        public string ToUnit { get; set; } = string.Empty;
        public int? Precision { get; set; }
    }
}
