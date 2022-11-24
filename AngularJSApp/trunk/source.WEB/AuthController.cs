using System.Net;
using System.Net.Http;
using System.Web.Http;
using IT4.Web.Common;
using IT4.Web.Authentication;
using System.Linq;
using IT4.Web.Dictionary;
using IT4.Common.Dictionary;
using IT4.Web.UI.Login;
using System.Web;
namespace AngularJSApp
{
	public class AuthController:ApiController
	{
		#region SubClasses
		#endregion
		public AuthController ()
		{
		}
		public  HttpResponseMessage GetServerVersion ()
		{
			return Request.CreateResponse(HttpStatusCode.OK, "ebd7ac43-b02a-4a6d-8050-8567c9aa4754");
		}
		[HttpPost]
		public  HttpResponseMessage Get (GetAuthenticationDataObj getAuthenticationDataObj)
		{
			HttpStatusCode result = HttpStatusCode.BadRequest;
			string clientDate = Request.GetHeaderValue("clientDate");
			string newToken = string.Empty;
			if (!string.IsNullOrEmpty(clientDate))
			{
			    try
			    {
			        newToken = AuthenticationTokensLibrary.AuthenticationTokenList.AddNew(SessionHelper.GetSessionID(), clientDate);
			        result = HttpStatusCode.OK;
			    }
			    catch { }
			}
			DictionaryNameSpaceData dictionaryNameSpaceData = DictionaryNameSpacesManager.GetDictionaryNamespacesData(CommonGlobal.DictionaryFileName);
			string dictionaryNameSpace = null;
			if (dictionaryNameSpaceData.DictionaryNameSpaces.Length != 0)
			{
			    dictionaryNameSpace = dictionaryNameSpaceData.DictionaryNameSpaces[0].name;
			}
			if (!string.IsNullOrEmpty(getAuthenticationDataObj.CurrentDictionaryNameSpace) && dictionaryNameSpaceData.DictionaryNameSpaces.Any(p => p.name == getAuthenticationDataObj.CurrentDictionaryNameSpace))
			{
			    dictionaryNameSpace = getAuthenticationDataObj.CurrentDictionaryNameSpace;
			}
			else
			{
			    for (int i = 0; i < dictionaryNameSpaceData.ConfigDictionaryNameSpaces.Length; i++)
			    {
			        if (dictionaryNameSpaceData.ConfigDictionaryNameSpaces[i].url == getAuthenticationDataObj.AbsUrl)
			        {
			            dictionaryNameSpace = dictionaryNameSpaceData.ConfigDictionaryNameSpaces[i].name;
			        }
			    }
			}
			LoginEntries applicationLoginEntries = new LoginEntries();
			applicationLoginEntries.LoginBackgroundEntries.TitleEntry = HttpUtility.HtmlDecode("Login Background Title");
			applicationLoginEntries.LoginBackgroundEntries.SubtitleEntry = HttpUtility.HtmlDecode("Login Background Subtitle");
			applicationLoginEntries.LoginFormEntries.TitleEntry = HttpUtility.HtmlDecode("Sign into your AngularJSApp account");
			applicationLoginEntries.LoginFormEntries.UsernameFieldTitleEntry = HttpUtility.HtmlDecode("Login");
			applicationLoginEntries.LoginFormEntries.UsernameFieldPlaceholderEntry = HttpUtility.HtmlDecode("User Name");
			applicationLoginEntries.LoginFormEntries.PasswordFieldTitleEntry = HttpUtility.HtmlDecode("Password");
			applicationLoginEntries.LoginFormEntries.PasswordFieldPlaceholderEntry = HttpUtility.HtmlDecode("Credentials");
			applicationLoginEntries.LoginFormEntries.LoginButtonTextEntry = HttpUtility.HtmlDecode("Sign in");
			applicationLoginEntries.LoginFormEntries.FieldRequiredMessageEntry = HttpUtility.HtmlDecode("Field Required");
			applicationLoginEntries.LoginFormEntries.WrongLoginMessageEntry = HttpUtility.HtmlDecode("Username or password incorrect!");
			applicationLoginEntries.LoginFormEntries.KeepMeSignedInEntry = HttpUtility.HtmlDecode("");
			applicationLoginEntries.LoginFormEntries.ForgotPasswordEntry = HttpUtility.HtmlDecode("");
			applicationLoginEntries.LoginFormEntries.ForgotPasswordTitleEntry = HttpUtility.HtmlDecode("");
			applicationLoginEntries.LoginFormEntries.EmailFieldTitleEntry = HttpUtility.HtmlDecode("");
			applicationLoginEntries.LoginFormEntries.EmailFieldPlaceholderEntry = HttpUtility.HtmlDecode("");
			applicationLoginEntries.LoginFormEntries.UserEmailNotValidMessageEntry = HttpUtility.HtmlDecode("");
			applicationLoginEntries.LoginFormEntries.RequestResetPasswordSuccessMessageEntry = HttpUtility.HtmlDecode("");
			applicationLoginEntries.LoginFormEntries.BackButtonTextEntry = HttpUtility.HtmlDecode("");
			applicationLoginEntries.LoginFormEntries.ResetButtonTextEntry = HttpUtility.HtmlDecode("");
			LoginEntries loginEntries = null;
			if (string.IsNullOrEmpty(dictionaryNameSpace))
			{
			    loginEntries = applicationLoginEntries;
			}
			else
			{
			    DictionaryReader dictionaryReader = CommonGlobal.DictionaryManager.NewDictionary(dictionaryNameSpace);
			    loginEntries = LoginHelper.GetLoginEntries(dictionaryReader, applicationLoginEntries);
			}
			return Request.CreateResponse(result, new
			{
			    NewToken = newToken,
			    DictionaryNameSpaceData = dictionaryNameSpaceData,
			    LoginEntries = loginEntries
			});
		}
	}
}
