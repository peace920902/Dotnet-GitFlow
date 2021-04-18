using System;
using System.Threading.Tasks;
using System.Xml;

namespace Dotnetcore_Gitflow_Test
{
    public class TemperatureTransfer
    {
        public double ConvertToF(double c)
        {
            return Math.Round(c * 9 / 5 + 32, 2);
        }

        public double ConvertToC(double f)
        {
            return Math.Round((f - 32) * 5 / 9, 2);
        }
    }
}