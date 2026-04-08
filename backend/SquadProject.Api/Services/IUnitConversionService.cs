using System.Collections.Generic;
using System.Threading.Tasks;
using SquadProject.Backend.Models.Dtos;

namespace SquadProject.Backend.Services
{
    public interface IUnitConversionService
    {
        Task<ConversionResultDto> ConvertAsync(decimal fromValue, string fromUnit, string toUnit, int precision = 6);
        Task<IEnumerable<UnitDto>> GetSupportedUnitsAsync();
        Task<bool> ValidateUnitAsync(string unitName);
    }
}
