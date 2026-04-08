namespace SquadProject.Api.Tests.Fixtures
{
    public static class SampleDataBuilder
    {
        public static object BuildConversionRecord()
        {
            // TODO: return a strongly-typed test entity used in integration tests
            return new { FromUnit = "meter", ToUnit = "kilometer", Value = 1.0, Result = 0.001 };
        }
    }
}
