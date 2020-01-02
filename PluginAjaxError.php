<?php
class PluginAjaxError{
  public function page_push(){
    /**
     * Settings
     */
    $settings = wfPlugin::getModuleSettings(null, true);
    $settings->set('slack', wfSettings::getSettingsFromYmlString($settings->get('slack')));
    /**
     * Send
     */
    if($settings->get('slack') && wfUser::hasRole('client')){
      $text = 'PluginAjaxError says: '.wfRequest::get('responseText', '(responseText missing)').', page '.wfRequest::get('url', '(url missing)').', user '.wfUser::getSession()->get('user_id').', host '.wfHelp::getHttpAdress().'!';
      wfPlugin::includeonce('slack/webhook_v1');
      $slack_webhook = new PluginSlackWebhook_v1();
      $slack_webhook->url = $settings->get('slack/webhook');
      $slack_webhook->channel = $settings->get('slack/group');
      $slack_webhook->text = $text;
      $slack_webhook->send();
    }
    exit('Push was successfull!');
  }
  public function widget_include($data){
    wfPlugin::includeonce('wf/yml');
    /**
     * 
     */
    $element = new PluginWfYml(__DIR__.'/element/widget_include.yml');
    wfDocument::renderElement($element->get());
    /**
     * 
     */
    $settings = wfPlugin::getModuleSettings('ajax/error', true);
    if($settings && $settings->get('slack')){
      $element = new PluginWfYml(__DIR__.'/element/widget_include_push.yml');
      wfDocument::renderElement($element->get());
    }
  }
}
