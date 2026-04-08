namespace SquadProject.Backend.Models.Requests
{
    public class RandomNumberRequest
    {
        public int Count { get; set; } = 1;
        public int Min { get; set; }
        public int Max { get; set; }
    }
}
