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
    public class RandomGeneratorController : ControllerBase
    {
        private readonly IRandomGeneratorService _service;
        private readonly ILogger<RandomGeneratorController> _logger;
        public RandomGeneratorController(IRandomGeneratorService service, ILogger<RandomGeneratorController> logger) { _service = service; _logger = logger; }

        [HttpGet("guid")]
        public async Task<ActionResult<string>> GetGuid()
        {
            var g = await _service.GenerateGuidAsync();
            return Ok(g.ToString());
        }

        [HttpPost("numbers")]
        public async Task<ActionResult<int[]>> GenerateNumbers([FromBody] RandomNumberRequest req)
        {
            if (req == null) return BadRequest("Request body is required");
            if (req.Count <= 0) return BadRequest("count must be > 0");
            if (req.Min > req.Max) return BadRequest("min must be <= max");

            var arr = await _service.GenerateRandomNumbersAsync(req.Count, req.Min, req.Max);
            return Ok(arr);
        }

        [HttpGet("person")]
        public async Task<ActionResult<PersonDto>> GetPerson()
        {
            var p = await _service.GeneratePersonAsync();
            return Ok(p);
        }

        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetAddress()
        {
            var a = await _service.GenerateAddressAsync();
            return Ok(a);
        }
    }
}
