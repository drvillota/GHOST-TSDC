Feature: My feature


@user1 @web
Scenario: Como primer usuario inicio sesion y creo un tag público
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  And I wait for 5 seconds
  When I enter email "<USERNAME1>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD1>"
  And I click next
  And I wait for 7 seconds
  Then I click on the Tags sidebar button
  And I wait for 2 seconds
  Then I click on the New Tag button
  And I wait for 2 seconds
  Then I click on the Internal Tags Button
  And I wait for 2 seconds
  Then I complete New Tag Name"<NEWTAGNAME>"
  And I wait for 5 seconds
  Then I complete New Tag Description"<NEWTAGDESCRIPTION>"
  And I wait for 5 seconds
  Then I click on the Save Button
  And I wait for 2 seconds
  Then I check the page is the first in the list is "<NEWTAGNAME>"