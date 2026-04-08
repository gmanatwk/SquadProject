using System;
using System.Threading.Tasks;
using SquadProject.Backend.Models.Dtos;

namespace SquadProject.Backend.Services
{
    public interface IRandomGeneratorService
    {
        Task<Guid> GenerateGuidAsync();
        Task<int> GenerateRandomNumberAsync(int min, int max);
        Task<int[]> GenerateRandomNumbersAsync(int count, int min, int max);
        Task<PersonDto> GeneratePersonAsync();
        Task<AddressDto> GenerateAddressAsync();
    }
}
