using System;
using Xunit;

namespace SquadProject.Api.Tests.Fixtures
{
    public class DatabaseFixture : IDisposable
    {
        // Setup test database connection (e.g., TestContainers or local SQL instance)
        public DatabaseFixture()
        {
            // TODO: initialize and seed test database
        }

        public void Dispose()
        {
            // TODO: cleanup test database
        }
    }
}
