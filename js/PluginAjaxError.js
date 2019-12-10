/**
 * 
 */
function PluginAjaxError(){
  this.push = false;
  this.alert = function(url, responseText){
    /**
     * Push
     */
    if(url!='/ajax_error/push'){
      if(this.push){
        $.post( "/ajax_error/push", { url: url, responseText: responseText } );
      }
    }
    /**
     * No action there is this plugin request
     */
    if(url=='/ajax_error/push'){
      return null;
    }
    /**
     * Handle responseText
     */
    if(typeof responseText==='undefined'){
      responseText = 'Seems like there is no internet connection';
    }
    /**
     * Alert
     */
    alert("PluginAjaxError says: Error requesting page " + url + " ("+responseText+").");
  }
}
/**
 * 
 */
var PluginAjaxError = new PluginAjaxError();
/**
 * 
 */
$( document ).ajaxError(function( event, request, settings ) {
  PluginAjaxError.alert(settings.url, request.responseText);
});
