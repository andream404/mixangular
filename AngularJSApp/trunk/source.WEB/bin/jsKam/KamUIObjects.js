var KamUIObjects=new Object();

KamUIObjects.UIControl=function()
{
   this._UIControl=function()
   {
   }
   this._UIControl();
};

KamUIObjects.UIForm=function()
{
  this.backgroundPanelID="";
  this.getBackgroundPanel=function()
  {
      return $("#"+this.backgroundPanelID.replace(/\$/g,"\\$"));
  }
  this._UIForm=function()
  {
    this._UIControl();
  }
  this._UIForm();

  this.hide=function()
  {
    this.getBackgroundPanel().hide();
  }
}; KamUIObjects.UIForm.prototype=new KamUIObjects.UIControl;


KamUIObjects.UIFormControl=function()
{
  this.containerID="";
 this.getContainer=function()
 {
	  return $("#"+this.containerID.replace(/\$/g,"\\$"));
 }
  this._UIFormControl=function()
  {
	this._UIControl();
  }
  this._UIFormControl();
  this.hide=function()
  {
	this.getContainer().hide();
  }
  this.show=function()
  {
	this.getContainer().show();
  }  
	this.setReadOnly=function(value)
	{  
	  alert('ReadOnly non implementato');
	}
  
}; KamUIObjects.UIFormControl.prototype=new KamUIObjects.UIControl;


KamUIObjects.UIFieldsGroup=function()
{

  this._UIFieldsGroup=function()
  {
    this._UIFormControl();
  }
  this._UIFieldsGroup();
  this.hide=function()
  {
    //parent è un hack in quanto il collapsable panel non butta giù l'id sulla table
    this.getContainer().parent().parent().hide();
  }
  this.show=function()
  {
    this.getContainer().parent().parent().show();
  }  
}; KamUIObjects.UIFieldsGroup.prototype=new KamUIObjects.UIFormControl;


KamUIObjects.UIFormField=function()
{
  this.controlID="";
  this._UIFormField=function()
  {
    this._UIFormControl();
  }
  this._UIFormField();
  this.clear=function()
  {
  }

}; KamUIObjects.UIFormField.prototype=new KamUIObjects.UIFormControl;



KamUIObjects.UIFFTextBox=function ()
{
 this.getTextBox=function()
 {
   return $("#"+this.controlID);
 }
  this.clear=function()
  {
    this.getTextBox().val("");
  }
  this.setValue=function(value,disableEvents)
  {
	if (disableEvents==undefined) var disableEvents=false;
    this.getTextBox().val(value);
  }
  this._UIFFTextBox=function()
  {
    this._UIFormField();
  }
  this._UIFFTextBox();
	this.setReadOnly=function(value)
	{  
	  if (value) this.getTextBox().attr("disabled","true");
	  else this.getTextBox().removeAttr("disabled","true");
	}
  
  
};KamUIObjects.UIFFTextBox.prototype=new KamUIObjects.UIFormField;



KamUIObjects.UIFFLazyLookup=function ()
{
 this.getTextBox=function()
 {
   return $("#"+this.controlID);
 }
  this.clear=function()
  {
    this.getTextBox().val("");
  }
  this.setValue=function(value,disableEvents)
  {
	if (disableEvents==undefined) var disableEvents=false;
    this.getTextBox().val(value);
  }
  this._UIFFLazyLookup=function()
  {
    this._UIFFTextBox();
  }
  this._UIFFLazyLookup();

  
};KamUIObjects.UIFFLazyLookup.prototype=new KamUIObjects.UIFFTextBox;

KamUIObjects.UIFFCheckBox=function ()
{
 this.getCheckBoxHtml=function()
 {
   return $("#"+this.controlID)[0];
 }
 
 this.getCheckBox=function()
 {
   return $("#"+this.controlID);
 }
 
  this.clear=function()
  {
    this.getCheckBoxHtml().checked=false;
  }
  this.set=function()
  {
    this.getCheckBoxHtml().checked=true;
  }  
  this.setValue=function(value,disableEvents)
  {
	if (disableEvents==undefined) var disableEvents=false;
    if (value) this.set();
	else this.clear();
  }
  this._UIFFCheckBox=function()
  {
    this._UIFormField();
  }
  this._UIFFCheckBox();
	this.setReadOnly=function(value)
	{  
	  if (value) this.getCheckBox().attr("disabled","true");
	  else this.getCheckBox().removeAttr("disabled","true");
	}

  
};KamUIObjects.UIFFCheckBox.prototype=new KamUIObjects.UIFormField;

KamUIObjects.UIFFTokenInput=function ()
{
 this.tokenInputID="";
 this.getTokenInput=function()
 {
   return this.getTextBox().tokenInput();
 }
 
  this.clear=function()
  {
    this.getTextBox().tokenInput("clear");
  }
  this.setValue=function(id,value,disableEvents)
  {
	if (disableEvents==undefined) var disableEvents=false;
	
    this.clear();
    this.getTextBox().tokenInput("add", {id: id, name: value});
  }

  this._UIFFTokenInput=function()
  {
    this._UIFFTextBox();
  }
  this._UIFFTokenInput();
  
};KamUIObjects.UIFFTokenInput.prototype=new KamUIObjects.UIFFTextBox;

KamUIObjects.UIFFMutiselectTokenInput=function ()
{
 this.tokenInputID="";
 this.getTokenInput=function()
 {
   return this.getTextBox().tokenInput();
 }
 
  this.clear=function()
  {
    this.getTextBox().tokenInput("clear");
  }
  this.setValue=function(id,value,disableEvents)
  {
	if (disableEvents==undefined) var disableEvents=false;
	
    this.clear();
    this.getTextBox().tokenInput("add", {id: id, name: value});
  }

  this._UIFFMutiselectTokenInput=function()
  {
    this._UIFFTextBox();
  }
  this._UIFFMutiselectTokenInput();
  
};KamUIObjects.UIFFMutiselectTokenInput.prototype=new KamUIObjects.UIFFTextBox;


KamUIObjects.UIFFDateTimePicker=function ()
{
  this._UIFFDateTimePicker=function()
  {
    this._UIFFTextBox();
  }
  this._UIFFDateTimePicker();
  this.DateFormat='dd/MM/yyyy';
  this.setValue=function(value,disableEvents)
  {
	if (disableEvents==undefined) var disableEvents=false;
	
    this.clear();
    this.getTextBox().val(value.format(this.DateFormat));
  }  
};KamUIObjects.UIFFDateTimePicker.prototype=new KamUIObjects.UIFFTextBox;


