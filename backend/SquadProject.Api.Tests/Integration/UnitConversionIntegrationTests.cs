using Xunit;
using SquadProject.Api.Tests.Fixtures;

namespace SquadProject.Api.Tests.Integration
{
    public class UnitConversionIntegrationTests : IClassFixture<DatabaseFixture>
    {
        private readonly DatabaseFixture _dbFixture;
        public UnitConversionIntegrationTests(DatabaseFixture dbFixture)
        {
            _dbFixture = dbFixture;
        }

        [Fact(Skip = "PENDING - implement integration test against test DB")]
        public void ConvertEndpoint_EndToEnd_Works()
        {
            // Arrange: start test server or use TestServer
            // Act: call /api/convert
            // Assert: response status and payload
        }
    }
}
