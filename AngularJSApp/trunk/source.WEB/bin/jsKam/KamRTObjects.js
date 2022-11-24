var KamRTObjects=new Object();

KamRTObjects.RTControl=function()
{
  this.name="";
 // this.readOnly=false;
  this._RTControl=function() //costruttore
  {
  }
  this._RTControl(); //Chiama il costruttore
  this.clear=function()
  {
  }
  this.select=function()
  {
  }
  
  this.hide=function()
  {
  }
  
    this.setReadOnly=function(value)
	{  
	}
  
};

KamRTObjects.RTPage=function(name)
{
  this.components=new Array(); // of RTControl
  this.name=null;
  
  this._RTPage=function(name)
  {
    this._RTControl(); //chiama costruttore padre
    this.name=name;
  }
  this._RTPage(name);
  
  
};KamRTObjects.RTPage.prototype=new KamRTObjects.RTControl;


KamRTObjects.RTForm=function(name,rtPage)
{
  
  this.internalUpdate=false;
  this.rtFields=new Array(); //of array of RTField;
  this.rtPage=null;
	if (window.KamUIObjects!=undefined)
	this.uiControl=new KamUIObjects.UIForm(); //default
	else this.uiControl=null;
  
  this.addRTField=function(rtField)
  {
    //aggiunge elementi per tenere conto del fatto che più campi della form possono far riferimento allo stesso campo del DB
    if(this.rtFields[rtField.fieldName]==undefined)
	{
      this.rtFields[rtField.fieldName]=new Array(rtField);
	}
	else
	{
	  this.rtFields[rtField.fieldName].push(rtField);
	}
  }
  this._RTForm=function(name,rtPage)
  {
    this._RTControl(name);
	this.rtPage=rtPage;
	if (rtPage!=undefined) rtPage.components[this.name]=this;
  }
  this._RTForm(name,rtPage);
  
  this.hide=function()
  {
    this.uiControl.hide();
  }
  
  //settato da fuori
  this.AjaxUpdateField=function()
  {
    
  };   
  this.AjaxUpdateFieldResponse=function(response,userContext,methodName)
  {

	if (response.IsError) alert(response.ResponseMessage);
	else
	{
		this.internalUpdate=true;
		for(var i=0;i<response.ChangedFields.length;i++)
		{
			for (var j=0;j<this.rtFields[response.ChangedFields[i].FieldName].length;j++)
			{
				if (response.ChangedFields[i].Value==null) this.rtFields[response.ChangedFields[i].FieldName][j].clear();
				else this.rtFields[response.ChangedFields[i].FieldName][j].setValue(response.ChangedFields[i].Value);
			}
		}
		eval(response.jsStatements);
	    this.internalUpdate=false;
   }
  }
   
  
  
  
};KamRTObjects.RTForm.prototype=new KamRTObjects.RTControl;

KamRTObjects.RTFormControl=function()
{
	this.name="";
	this.fieldName="";
	if (window.KamUIObjects!=undefined)
	this.uiControl=new KamUIObjects.UIFormControl(); //default
	else this.uiControl=null;
	this.rtForm=null;
	this.setRTForm=function(rtForm)
	{
	  this.rtForm=rtForm;
	  //attenzione gli eredi dovrebbero fare base call, ma non funziona forse...
	}

	this._RTFormControl=function()
	{
	  this._RTControl();
	}
	this._RTFormControl();
	
	  this.hide=function()
  {
    this.uiControl.hide();
  }
    this.setReadOnly=function(value)
	{  
	  this.uiControl.setReadOnly(value);
	}
    this.show=function()
  {
    this.uiControl.show();
  }
  
};KamRTObjects.RTFormControl.prototype=new KamRTObjects.RTControl;

KamRTObjects.RTFieldsGroup=function()
{
	if (window.KamUIObjects!=undefined)
	this.uiControl=new KamUIObjects.UIFieldsGroup(); //default
	else this.uiControl=null;

	this._RTFieldsGroup=function()
	{
	  this._RTFormControl();
	}
	this._RTFieldsGroup();
	
  this.hide=function()
  {
    this.uiControl.hide();
  }
    this.show=function()
  {
    this.uiControl.show();
  }
  
};KamRTObjects.RTFieldsGroup.prototype=new KamRTObjects.RTFormControl;

KamRTObjects.RTField=function()
{
	this.fieldName="";
	if (window.KamUIObjects!=undefined)
	this.uiControl=new KamUIObjects.UIFFTextBox(); //default
	else this.uiControl=null;
	this._RTField=function()
	{
	  this._RTFormControl();
	}
  	this._RTField();
	
	this.setRTForm=function(rtForm)
	{
	//attenzione servirebbe fare base call
	  this.rtForm=rtForm;
	  rtForm.addRTField(this);
	}
	
  this.clear=function()
  {
    this.uiControl.clear();
  }
  this.setValue=function(value,disableEvents)
  {
	if (disableEvents==undefined) var disableEvents=false;
    this.uiControl.setValue(value,disableEvents);
  }	
  

  
  this.OnChanged=function(value)
  {
    if (!this.rtForm.internalUpdate)
	{
		thisObj=this;
		this.rtForm.AjaxUpdateField(this.fieldName,value,
		function(response,userContext,methodName)
		  {
		  //usa thisObj perchè è un callback
			thisObj.rtForm.AjaxUpdateFieldResponse(response,userContext,methodName);
		  }
		  ,null);
	 }
  }


};KamRTObjects.RTField.prototype=new KamRTObjects.RTFormControl;

KamRTObjects.RTFieldText=function()
{
	if (window.KamUIObjects!=undefined)
	this.uiControl=new KamUIObjects.UIFFTextBox(); //default
	else this.uiControl=null;
	this._RTFieldText=function()
	{
	  this._RTField();
	}
  	this._RTFieldText();
	
	
};KamRTObjects.RTFieldText.prototype=new KamRTObjects.RTField;

KamRTObjects.RTFieldBoolean=function()
{
	if (window.KamUIObjects!=undefined)
	this.uiControl=new KamUIObjects.UIFFCheckBox(); //default
	else this.uiControl=null;
	this._RTFieldBoolean=function()
	{
	  this._RTField();
	}
  	this._RTFieldBoolean();
	
	
};KamRTObjects.RTFieldBoolean.prototype=new KamRTObjects.RTField;

KamRTObjects.RTFieldQueryLookup=function()
{
	this.fieldName="";
	if (window.KamUIObjects!=undefined)
	this.uiControl=new KamUIObjects.UIFFTokenInput(); //default
	else this.uiControl=null;
	this.rtForm=null;
	this._RTFieldQueryLookup=function()
	{
	  this._RTField();
	}
	
	this.getLookupValuePageMethod="";
	this.getLookupValue=function(value,resultCallback)
	{
		$.ajax({
		  type: "POST",
		  async: false,
		  url: this.getLookupValuePageMethod,
		  data: "{KeyID: '"+String(value).replace(/"'"/g,"\\'")+"' }",
		  contentType: "application/json; charset=utf-8",
		  dataType: "json",
		  success: resultCallback
		});
	};
	this._RTFieldQueryLookup();
	
	this.setValue=function(value,disableEvents)
	{
	    if (disableEvents==undefined) var disableEvents=false;
	    thiscontrol=this;
		this.getLookupValue(value,function(result)
		{

		   thiscontrol.setLookupValue(value,result.d,disableEvents);
		});

	}		
	this.setLookupValue=function(id,value,disableEvents)
	{
	  if (disableEvents==undefined) var disableEvents=false;
	  this.uiControl.setValue(id,value,disableEvents);
	}		

};KamRTObjects.RTFieldQueryLookup.prototype=new KamRTObjects.RTField;


KamRTObjects.RTFieldQueryMultiselectLookup=function()
{
	this.fieldName="";
	if (window.KamUIObjects!=undefined)
	this.uiControl=new KamUIObjects.UIFFTokenInput(); //default
	else this.uiControl=null;
	this.rtForm=null;
	this._RTFieldQueryLookup=function()
	{
	  this._RTField();
	}
	
	this.getLookupValuesPageMethod="";
	this.getLookupValues=function(value,resultCallback)
	{
		$.ajax({
		  type: "POST",
		  async: false,
		  url: this.getLookupValuesPageMethod,
		  data: "{KeyID: '"+String(value).replace(/"'"/g,"\\'")+"' }",
		  contentType: "application/json; charset=utf-8",
		  dataType: "json",
		  success: resultCallback
		});
	};
	this._RTFieldQueryMultiselectLookup();
	
	this.setValue=function(value,disableEvents)
	{
	    if (disableEvents==undefined) var disableEvents=false;
	    thiscontrol=this;
		this.getLookupValues(value,function(result)
		{

		   thiscontrol.setLookupValue(value,result.d,disableEvents);
		});

	}		
	this.setLookupValue=function(id,value,disableEvents)
	{
	  if (disableEvents==undefined) var disableEvents=false;
	  this.uiControl.setValue(id,value,disableEvents);
	}		

};KamRTObjects.RTFieldQueryMultiselectLookup.prototype=new KamRTObjects.RTField;


KamRTObjects.RTFieldMultiselectCustomLookup=function()
{
	this.fieldName="";
	if (window.KamUIObjects!=undefined)
	this.uiControl=new KamUIObjects.UIFFTokenInput(); //default
	else this.uiControl=null;
	this.rtForm=null;
	this._RTFieldMultiselectCustomLookup=function()
	{
	  this._RTField();
	}
	
	this.getLookupValuesPageMethod="";
	this.getLookupValues=function(value,resultCallback)
	{
		$.ajax({
		  type: "POST",
		  async: false,
		  url: this.getLookupValuesPageMethod,
		  data: "{KeyID: '"+String(value).replace(/"'"/g,"\\'")+"' }",
		  contentType: "application/json; charset=utf-8",
		  dataType: "json",
		  success: resultCallback
		});
	};
	this._RTFieldMultiselectCustomLookup();
	
	this.setValue=function(value,disableEvents)
	{
	    if (disableEvents==undefined) var disableEvents=false;
	    thiscontrol=this;
		this.getLookupValues(value,function(result)
		{

		   thiscontrol.setLookupValue(value,result.d,disableEvents);
		});

	}		
	this.setLookupValue=function(id,value,disableEvents)
	{
	  if (disableEvents==undefined) var disableEvents=false;
	  this.uiControl.setValue(id,value,disableEvents);
	}		

};KamRTObjects.RTFieldMultiselectCustomLookup.prototype=new KamRTObjects.RTField;

KamRTObjects.RTFieldQueryLazyLookup=function()
{
	this.fieldName="";
	if (window.KamUIObjects!=undefined)
	this.uiControl=new KamUIObjects.UIFFLazyLookup(); //default
	else this.uiControl=null;
	this.rtForm=null;
	this._RTFieldQueryLazyLookup=function()
	{
	  this._RTFieldText();
	}
	
	this._RTFieldQueryLazyLookup();
	
		

};KamRTObjects.RTFieldQueryLazyLookup.prototype=new KamRTObjects.RTFieldText;


KamRTObjects.RTFieldDateTimePicker=function()
{
	this.fieldName="";
	if (window.KamUIObjects!=undefined)
	this.uiControl=new KamUIObjects.UIFFDateTimePicker(); //default
	else this.uiControl=null;
	this.rtForm=null;
	this._RTFieldDateTimePicker=function()
	{
	  this._RTFieldText();
	}
	
	this._RTFieldDateTimePicker();
	
		

};KamRTObjects.RTFieldDateTimePicker.prototype=new KamRTObjects.RTFieldText;
