# Notes on Building the Household Builder

## Instructions

1. Start the Web Server
2. Run the tests

##### Start the Web Server

* cd into the `hhbuilder` directory that contains the `index.html` and `index.js`
* start a web server using `python3 -m 'http.server'` or `python -m SimpleHTTPServer`
  * this will start a web server accessible at http://localhost:8000

##### Run the tests

The tests are written using Ruby's Capybara library, which controls the browser-testing tool, `Selenium`.
These specs are currently written expecting a server to be running at http://localhost:8000.

* ensure Ruby 2.3+ is installed
* hopefully Selenium is installed. If not, run `brew install selenium-webserver-standalone` on OSX.
* run `bundle install` to install the Ruby Dependencies
* run `rspec` to actually run the specs

If all goes well, you'll see `5 examples, 0 failures` 🎉
