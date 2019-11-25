# Buto-Plugin-AjaxError
Show an alert when there is an ajax error. Push to Slack as an option.
## Usage
Inside html tag on a page.
```
type: widget
data:
  plugin: ajax/error
  method: include
```
## Slack
Post to Slack by setting up page /ajax_error/*.
```
plugin_modules:
  ajax_error:
    plugin: ajax/error
    settings:
      slack: 'yml:/../buto_data/theme/_some_/_theme_/ajax_error_slack.yml'
```
In ajax_error_slack.yml
```
webhook: _webhook_url_
group: _name_of_group_
```
