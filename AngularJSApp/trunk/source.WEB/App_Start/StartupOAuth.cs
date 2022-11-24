using IT4.Web.Authentication;
using Microsoft.Owin;
using Microsoft.Owin.Builder;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Configuration;
namespace AngularJSApp
{
	public class StartupOAuth
	{
	    public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }
	    static StartupOAuth()
	    {
	        bool allowInsecureHttp = false;
	        bool.TryParse(WebConfigurationManager.AppSettings["AllowInsecureHttp"], out allowInsecureHttp);
	        OAuthOptions = new OAuthAuthorizationServerOptions
	        {
	            TokenEndpointPath = new PathString("/AccessToken"),
	            Provider = new OAuthAppProvider(new APILoginService()),
	            AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(double.Parse(ConfigurationManager.AppSettings["AccessTokenExpireMinutes"])),
	            AllowInsecureHttp = allowInsecureHttp
	        };
	    }
	    public void ConfigureAuth(IAppBuilder app)
	    {
	        app.UseOAuthBearerTokens(OAuthOptions);
	    }
	    public void Configuration(IAppBuilder app)
	    {
	        ConfigureAuth(app);
	    }
	}
}
