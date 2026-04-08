namespace SquadProject.Backend.Data.Entities
{
    /// <summary>
    /// Simple Person entity for random generation
    /// </summary>
    public class Person
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public Address? Address { get; set; }
    }
}