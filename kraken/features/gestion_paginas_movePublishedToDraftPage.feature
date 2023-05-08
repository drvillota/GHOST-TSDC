Feature: Move a published page to draft

@user1 @web
Scenario: Como primer usuario inicio sesion y cambio una página publicada a borrador
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  And I wait for 5 seconds
  When I enter email "<USERNAME1>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD1>"
  And I click next
  And I wait for 7 seconds
  Then I click on the Pages sidebar button
  And I wait for 2 seconds
  Then I filter by published pages
  And I wait for 2 seconds
  Then I selected the first page in the list
  And I wait for 2 seconds 
  Then I click on the Unpublish Button
  And I wait for 2 seconds 
  Then I click on the Unpublish and revert Button
  And I wait for 2 seconds 
  Then I check page status to be draft
  And I wait for 2 seconds