using System;

namespace SquadProject.Backend.Models.Dtos
{
    public class ConversionResultDto
    {
        public decimal FromValue { get; set; }
        public string FromUnit { get; set; } = string.Empty;
        public string ToUnit { get; set; } = string.Empty;
        public decimal Result { get; set; }
        public int Precision { get; set; }
        public DateTime TimestampUtc { get; set; }
    }
}
