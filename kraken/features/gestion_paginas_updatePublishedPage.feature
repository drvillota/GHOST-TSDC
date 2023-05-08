Feature: Update a published page

@user1 @web
Scenario: Como primer usuario inicio sesion y actualizo una página que ya está publicada
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
  Then I complete New Page Title "<UPDATE_POST_TITLE>"
  And I wait for 2 seconds
  Then I click on the UpdatePage Button
  And I wait for 2 seconds
  Then I click on the Back Page Editor Button
  And I wait for 2 seconds
  Then I filter by published pages
  And I wait for 2 seconds
  Then I check the page is the first in the list is "<UPDATE_POST_TITLE>"
  And I wait for 10 seconds