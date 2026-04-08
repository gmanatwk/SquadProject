using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using SquadProject.Backend.Models.Dtos;

namespace SquadProject.Backend.Services
{
    public class RandomGeneratorService : IRandomGeneratorService
    {
        private readonly ILogger<RandomGeneratorService> _logger;
        private readonly string[] _firstNames = new[] { "Oliver", "Emma", "Liam", "Ava", "Noah", "Sophia", "Elijah", "Isabella", "Lucas", "Mia" };
        private readonly string[] _lastNames = new[] { "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez" };
        private readonly string[] _streets = new[] { "Main St", "Maple Ave", "Oak St", "Pine St", "Cedar Ln", "Elm St", "Washington Ave", "Lakeview Dr" };
        private readonly (string City, string State, string Zip)[] _cities = new[] {
            ("Seattle","WA","98101"), ("New York","NY","10001"), ("Chicago","IL","60601"), ("Miami","FL","33101"), ("Austin","TX","73301")
        };
        private readonly string[] _countries = new[] { "USA", "Canada", "UK" };

        public RandomGeneratorService(ILogger<RandomGeneratorService> logger)
        {
            _logger = logger;
        }

        public Task<Guid> GenerateGuidAsync()
        {
            return Task.FromResult(Guid.NewGuid());
        }

        public Task<int> GenerateRandomNumberAsync(int min, int max)
        {
            if (min > max) throw new ArgumentException("min must be <= max");
            int value = Random.Shared.Next(min, max + 1);
            _logger.LogInformation("Generated random number {Value} in range [{Min},{Max}]", value, min, max);
            return Task.FromResult(value);
        }

        public Task<int[]> GenerateRandomNumbersAsync(int count, int min, int max)
        {
            if (count <= 0) throw new ArgumentException("count must be > 0");
            if (min > max) throw new ArgumentException("min must be <= max");
            var arr = new int[count];
            for (int i = 0; i < count; i++) arr[i] = Random.Shared.Next(min, max + 1);
            _logger.LogInformation("Generated {Count} random numbers in range [{Min},{Max}]", count, min, max);
            return Task.FromResult(arr);
        }

        public Task<PersonDto> GeneratePersonAsync()
        {
            var first = _firstNames[Random.Shared.Next(_firstNames.Length)];
            var last = _lastNames[Random.Shared.Next(_lastNames.Length)];
            var email = $"{first.ToLowerInvariant()}.{last.ToLowerInvariant()}{Random.Shared.Next(10,99)}@example.com";
            var phone = $"+1-{Random.Shared.Next(200,999)}-{Random.Shared.Next(200,999)}-{Random.Shared.Next(1000,9999)}";
            var age = Random.Shared.Next(18, 90);
            var dto = new PersonDto { FirstName = first, LastName = last, Email = email, PhoneNumber = phone, Age = age };
            _logger.LogInformation("Generated person {First} {Last}", first, last);
            return Task.FromResult(dto);
        }

        public Task<AddressDto> GenerateAddressAsync()
        {
            var streetNum = Random.Shared.Next(1, 9999);
            var streetName = _streets[Random.Shared.Next(_streets.Length)];
            var city = _cities[Random.Shared.Next(_cities.Length)];
            var country = _countries[Random.Shared.Next(_countries.Length)];
            var dto = new AddressDto
            {
                Street = $"{streetNum} {streetName}",
                City = city.City,
                State = city.State,
                ZipCode = city.Zip,
                Country = country
            };
            _logger.LogInformation("Generated address {Street}, {City}", dto.Street, dto.City);
            return Task.FromResult(dto);
        }
    }
}
