using IT4.Common.DB;
using IT4.Common.Data;
using System;
using System.Data;
using IT4.Web.Common;
using IT4.Web.Authentication;
namespace AngularJSApp
{
	[Serializable]
	public class UserInfo:ApplicationUserInfo
	{
		#region SubClasses
		#endregion
		public UserInfo ()
		{
		}
		public  override bool CustomLogin (string username, string password)
		{
			DBUtils dBUtils = DBUtilsHelper.GetNewDBUtils();
			dBUtils.BeginTransaction(IsolationLevel.Snapshot);
			try
			{
			    string queryUtente = string.Format(@"
			        select
			            U.idutente,
			            coalesce(U.pass, ''),
			            U.languageshortnamespace,
			            U.languagelongnamespace,
			            U.roles,
			            coalesce(U.modules, ''),
			            coalesce(U.salt, ''),
			            coalesce(U.iterations, 0)
			        from utenti U
			        where U.login = {0}
			        rows 1", dBUtils.StringToString(username, true));
			    int iDUtente = -1;
			    string dBPassword = string.Empty;
			    string languageShortNamespace = null;
			    string languageLongNamespace = null;
			    string roles = null;
			    string modules = null;
			    string salt = null;
			    int iterations = -1;
			    using (IDataReader readerUtente = dBUtils.ExecQuery(queryUtente))
			    {
			        if (!readerUtente.Read())
			        {
			            return false;
			        }
			        iDUtente = readerUtente.GetInt32(0);
			        dBPassword = readerUtente.GetString(1);
			        languageShortNamespace = readerUtente.IsDBNull(2) ? (string)null : readerUtente.GetString(2);
			        languageLongNamespace = readerUtente.IsDBNull(3) ? (string)null : readerUtente.GetString(3);
			        roles = readerUtente.IsDBNull(4) ? (string)null : readerUtente.GetString(4);
			        modules = readerUtente.IsDBNull(5) ? (string)null : readerUtente.GetString(5);
			        salt = readerUtente.IsDBNull(6) ? null : readerUtente.GetString(6);
			        iterations = readerUtente.GetInt32(7);
			        readerUtente.Close();
			    }
			    if (PasswordUtils.CheckPassword(password, dBPassword, salt, iterations))
			    {
			        fIDUser = iDUtente;
			        LanguageShortNamespace = languageShortNamespace;
			        LanguageLongNamespace = languageLongNamespace;
			        SetRoleNames(roles);
			        SetDictionary(CommonGlobal.DictionaryManager);
			        SetModuleNames(modules);
			        return true;
			    }
			    return false;
			}
			catch (Exception ex)
			{
			    if (dBUtils.InTransaction())
			    {
			        dBUtils.Rollback();
			    }
			    throw new Exception(ex.Message, ex);
			}
		}
	}
}
