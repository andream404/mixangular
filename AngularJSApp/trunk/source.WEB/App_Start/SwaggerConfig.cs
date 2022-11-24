using System.Web.Http;
using WebActivatorEx;
using Swashbuckle.Application;
using System.Collections.Generic;
using System.Linq;
using Swashbuckle.Swagger;
using System.Web.Http.Description;
using System.Web.Configuration;
using IT4.Web.Common;
[assembly: PreApplicationStartMethod(typeof(AngularJSApp.SwaggerConfig), "Register")]
namespace AngularJSApp
{
	public class SwaggerConfig
	{
	    public static void Register()
	    {
	        bool owinAutomaticAppStartup = false;
	        if (bool.TryParse(WebConfigurationManager.AppSettings["owin:AutomaticAppStartup"], out owinAutomaticAppStartup) && owinAutomaticAppStartup)
	        {
	            var thisAssembly = typeof(SwaggerConfig).Assembly;
	            string webRoot = WebConfigurationManager.AppSettings["webroot"];
	            GlobalConfiguration.Configuration
	                .EnableSwagger(c =>
	                    {
	                        c.SingleApiVersion("v1", "AngularJSApp");
	                        if (!string.IsNullOrEmpty(webRoot))
	                        {
	                            c.RootUrl(req => webRoot);
	                        }
	                        c.OAuth2("oauth2")
	                            .Description("OAuth2 Password Grant")
	                            .Flow("password")
	                            .TokenUrl(webRoot + "/AccessToken");
	                        c.OperationFilter<AssignOAuth2SecurityRequirements>();
	                        c.DocumentFilter<AllowedAPI>();
	                        c.IncludeXmlComments(GetXmlCommentsPath());
	                        c.SchemaId(x => x.FullName);
	                    })
	                .EnableSwaggerUi(c =>
	                    {
	                    });
	        }
	    }
	    protected static string GetXmlCommentsPath()
	    {
	        return System.String.Format(@"{0}\bin\AngularJSApp.xml", System.AppDomain.CurrentDomain.BaseDirectory);
	    }
	    public class AssignOAuth2SecurityRequirements : IOperationFilter
	    {
	        public void Apply(Operation operation, SchemaRegistry schemaRegistry, ApiDescription apiDescription)
	        {
	            //var authorized = apiDescription.ActionDescriptor.GetCustomAttributes<AuthorizeOAuth2>();
	            var authorized = apiDescription.GetControllerAndActionAttributes<Kam4GenaratedApi>();
	            if (!authorized.Any()) return;
	            if (operation.security == null)
	                operation.security = new List<IDictionary<string, IEnumerable<string>>>();
	            var oAuthRequirements = new Dictionary<string, IEnumerable<string>>
	            {
	                {"oauth2", Enumerable.Empty<string>()}
	            };
	            operation.security.Add(oAuthRequirements);
	        }
	    }
	    public class AllowedAPI : IDocumentFilter
	    {
	        public void Apply(Swashbuckle.Swagger.SwaggerDocument swaggerDoc, Swashbuckle.Swagger.SchemaRegistry schemaRegistry, IApiExplorer apiExplorer)
	        {
	            foreach (var apiDescription in apiExplorer.ApiDescriptions)
	            {
	                if (!apiDescription.ActionDescriptor.ControllerDescriptor.GetCustomAttributes<Kam4GenaratedApi>().Any())
	                {
	                    swaggerDoc.paths.Remove(string.Format("/{0}", apiDescription.RelativePath));
	                }
	            }
	        }
	    }
	}
}
