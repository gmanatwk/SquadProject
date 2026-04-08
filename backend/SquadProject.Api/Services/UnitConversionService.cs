using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using SquadProject.Backend.Models.Dtos;

namespace SquadProject.Backend.Services
{
    public class UnitConversionService : IUnitConversionService
    {
        private readonly ILogger<UnitConversionService> _logger;

        // Define base units per category and factors relative to base
        private readonly Dictionary<string, (string Category, double FactorToBase)> _unitMap;
        private readonly Dictionary<string, string> _unitCategoryBase;

        public UnitConversionService(ILogger<UnitConversionService> logger)
        {
            _logger = logger;

            // Base units: Length -> meter, Weight -> kilogram, Volume -> liter, Speed -> m/s
            _unitMap = new Dictionary<string, (string, double)>(StringComparer.OrdinalIgnoreCase)
            {
                // Length (base: meter)
                ["meter"] = ("Length", 1.0),
                ["m"] = ("Length", 1.0),
                ["kilometer"] = ("Length", 1000.0),
                ["km"] = ("Length", 1000.0),
                ["mile"] = ("Length", 1609.344),
                ["mi"] = ("Length", 1609.344),
                ["foot"] = ("Length", 0.3048),
                ["ft"] = ("Length", 0.3048),
                ["inch"] = ("Length", 0.0254),
                ["in"] = ("Length", 0.0254),

                // Weight (base: kilogram)
                ["kilogram"] = ("Weight", 1.0),
                ["kg"] = ("Weight", 1.0),
                ["gram"] = ("Weight", 0.001),
                ["g"] = ("Weight", 0.001),
                ["pound"] = ("Weight", 0.45359237),
                ["lb"] = ("Weight", 0.45359237),
                ["ounce"] = ("Weight", 0.028349523125),
                ["oz"] = ("Weight", 0.028349523125),

                // Volume (base: liter)
                ["liter"] = ("Volume", 1.0),
                ["l"] = ("Volume", 1.0),
                ["milliliter"] = ("Volume", 0.001),
                ["ml"] = ("Volume", 0.001),
                ["gallon"] = ("Volume", 3.785411784), // US liquid gallon
                ["gal"] = ("Volume", 3.785411784),

                // Speed (base: m/s)
                ["m/s"] = ("Speed", 1.0),
                ["km/h"] = ("Speed", 1000.0/3600.0), // 0.277777...
                ["kmh"] = ("Speed", 1000.0/3600.0),
                ["mph"] = ("Speed", 1609.344/3600.0),

                // Temperature handled specially
                ["celsius"] = ("Temperature", 1.0),
                ["c"] = ("Temperature", 1.0),
                ["fahrenheit"] = ("Temperature", 1.0),
                ["f"] = ("Temperature", 1.0),
                ["kelvin"] = ("Temperature", 1.0),
                ["k"] = ("Temperature", 1.0),
            };

            _unitCategoryBase = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
            {
                ["Length"] = "meter",
                ["Weight"] = "kilogram",
                ["Volume"] = "liter",
                ["Speed"] = "m/s",
                ["Temperature"] = "celsius"
            };
        }

        public Task<bool> ValidateUnitAsync(string unitName)
        {
            return Task.FromResult(!string.IsNullOrWhiteSpace(unitName) && _unitMap.ContainsKey(unitName));
        }

        public Task<IEnumerable<UnitDto>> GetSupportedUnitsAsync()
        {
            var units = _unitMap.Select(kvp => new UnitDto { Name = kvp.Key, Category = kvp.Value.Category, Description = kvp.Key })
                                 .OrderBy(u => u.Category).ThenBy(u => u.Name)
                                 .ToList();
            return Task.FromResult((IEnumerable<UnitDto>)units);
        }

        public Task<ConversionResultDto> ConvertAsync(decimal fromValue, string fromUnit, string toUnit, int precision = 6)
        {
            if (fromUnit == null) throw new ArgumentNullException(nameof(fromUnit));
            if (toUnit == null) throw new ArgumentNullException(nameof(toUnit));

            _logger.LogInformation("Converting {FromValue} {FromUnit} -> {ToUnit}", fromValue, fromUnit, toUnit);

            if (!_unitMap.TryGetValue(fromUnit, out var fromDef))
                throw new UnitNotFoundException(fromUnit);
            if (!_unitMap.TryGetValue(toUnit, out var toDef))
                throw new UnitNotFoundException(toUnit);

            if (!string.Equals(fromDef.Category, toDef.Category, StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidConversionException($"Cannot convert units in different categories: {fromDef.Category} -> {toDef.Category}");
            }

            double result;
            if (string.Equals(fromDef.Category, "Temperature", StringComparison.OrdinalIgnoreCase))
            {
                // Convert temperature via Celsius as base
                double celsius = ToCelsius((double)fromValue, fromUnit);
                result = FromCelsius(celsius, toUnit);
            }
            else
            {
                // Use factor to base unit then to target
                double fromFactor = fromDef.FactorToBase;
                double toFactor = toDef.FactorToBase;

                // value in base = fromValue * fromFactor
                double baseValue = (double)fromValue * fromFactor;
                // value in target = baseValue / toFactor
                result = baseValue / toFactor;
            }

            var rounded = Math.Round(result, Math.Max(0, precision));

            var dto = new ConversionResultDto
            {
                FromValue = fromValue,
                FromUnit = fromUnit,
                ToUnit = toUnit,
                Result = (decimal)rounded,
                Precision = precision,
                TimestampUtc = DateTime.UtcNow
            };

            _logger.LogInformation("Conversion result: {Result}", dto.Result);
            return Task.FromResult(dto);
        }

        private static double ToCelsius(double value, string unit)
        {
            unit = unit.ToLowerInvariant();
            return unit switch
            {
                "celsius" or "c" => value,
                "fahrenheit" or "f" => (value - 32.0) * 5.0 / 9.0,
                "kelvin" or "k" => value - 273.15,
                _ => throw new UnitNotFoundException(unit)
            };
        }

        private static double FromCelsius(double celsius, string unit)
        {
            unit = unit.ToLowerInvariant();
            return unit switch
            {
                "celsius" or "c" => celsius,
                "fahrenheit" or "f" => celsius * 9.0 / 5.0 + 32.0,
                "kelvin" or "k" => celsius + 273.15,
                _ => throw new UnitNotFoundException(unit)
            };
        }
    }
}
