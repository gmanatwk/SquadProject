using System;

namespace SquadProject.Backend.Services
{
    public class UnitNotFoundException : Exception
    {
        public UnitNotFoundException(string unit) : base($"Unit not found: {unit}") { }
    }
}
