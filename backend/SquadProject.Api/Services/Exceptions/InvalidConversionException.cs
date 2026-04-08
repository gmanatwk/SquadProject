using System;

namespace SquadProject.Backend.Services
{
    public class InvalidConversionException : Exception
    {
        public InvalidConversionException(string message) : base(message) { }
    }
}
