using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SquadProject.Backend.Services;
using SquadProject.Backend.Models.Requests;
using SquadProject.Backend.Models.Dtos;

namespace SquadProject.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UnitConversionController : ControllerBase
    {
        private readonly IUnitConversionService _service;
        private readonly ILogger<UnitConversionController> _logger;
        public UnitConversionController(IUnitConversionService service, ILogger<UnitConversionController> logger) { _service = service; _logger = logger; }

        [HttpPost("convert")]
        public async Task<ActionResult<ConversionResultDto>> Convert([FromBody] ConvertRequest request)
        {
            if (request == null) return BadRequest("Request body is required");
            if (string.IsNullOrWhiteSpace(request.FromUnit) || string.IsNullOrWhiteSpace(request.ToUnit))
                return BadRequest("fromUnit and toUnit are required");

            var result = await _service.ConvertAsync(request.FromValue, request.FromUnit, request.ToUnit, request.Precision ?? 6);
            return Ok(result);
        }

        [HttpGet("units")]
        public async Task<ActionResult> GetUnits()
        {
            var units = await _service.GetSupportedUnitsAsync();
            return Ok(units);
        }
    }
}
