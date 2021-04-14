using Xunit;
using Dotnetcore_Gitflow_Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dotnetcore_Gitflow_Test.Tests
{
    public class TemperatureTransferTests
    {
        private readonly TemperatureTransfer _temperatureTransfer;

        public TemperatureTransferTests()
        {
            _temperatureTransfer = new();
        }
        
        // [Theory]
        // [InlineData(0,32)]
        // [InlineData(25, 77)]
        // [InlineData(-273.15, -459.67)]
        // [InlineData(10.54, 50.97)]
        // public void ConvertToFTest(double input,double result )
        // {
        //     var actual = _temperatureTransfer.ConvertToF(input);
        //     Assert.Equal(actual, result);
        // }
        //
        // [Theory]
        // [InlineData(32, 0)]
        // //[InlineData(32, 50)]
        // [InlineData(77, 25)]
        // [InlineData(-459.67, -273.15)]
        // [InlineData(50.97, 10.54)]
        // public void ConvertToCTest(double input, double result)
        // {
        //     var actual = _temperatureTransfer.ConvertToC(input);
        //     Assert.Equal(actual, result);
        // }
    }
}