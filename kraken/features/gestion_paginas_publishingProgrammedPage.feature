Feature: Publish New Programmed page

@user1 @web
Scenario: Como primer usuario inicio sesion y publico una new página simple programada
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  And I wait for 5 seconds
  When I enter email "<USERNAME1>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD1>"
  And I click next
  And I wait for 7 seconds
  Then I click on the Pages sidebar button
  And I wait for 2 seconds
  Then I click on the New Page button
  And I wait for 2 seconds
  Then I complete New Page Title "<NEWPOST_TITLE>"
  And I wait for 2 seconds
  Then I click on the Back Page Editor Button
  And I wait for 2 seconds
  Then I click on the Publish Page Button
  And I wait for 2 seconds
  Then I click on the Publish Settings to Schedule after 3 days
  And I wait for 5 seconds
  Then I click on the Continue Publication Button
  And I wait for 2 seconds
  Then I click on the Confirm Publication Button
  And I wait for 5 seconds
  Then I click on the Back Page Publish Button
  And I wait for 2 seconds
  Then I click on the Back Page Editor Button
  And I wait for 2 seconds
  Then I filter by scheduled pages
  And I wait for 2 seconds
  Then I check the page is the first in the list is "<NEWPOST_TITLE>"
  