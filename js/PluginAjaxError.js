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
     * Alert
     */
    alert("PluginAjaxError says: Error requesting page " + url + " ("+responseText+")");
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
