using IdeaPortal2.RTFReports;
using System;
using EkRtfReport;
using EkRtfFunc;
using EkRtfCons;
using System.IO;
namespace AngularJSApp
{
	public class BSNReports:IdeaPortal2.RTFReports.BusinessReports
	{
		#region SubClasses
		#endregion
		public BSNReports (string CommonResourcePath):base(CommonResourcePath)
		{
		}
		public  override void AddUDFs (RTFReport Report)
		{
		}
	}
}
