Feature: Gestion de usuarios de Ghost (suspension y reactivacion)

@user1 @web

Scenario: 2. Como usuario admin puedo suspender otro usuario
  # Login Ghost
  Given I navigate to page "http://test.denkitronik.com:2368/ghost/#/signin"
  And I enter email "lasherone@hotmail.com"
  And I enter password "Pruebas12345"
  And I click on login button
    
  # Update user
  When I click on staff link
  And I click on user "Ghost"
  And I click on user settings
  And I click on suspend user
  And I click on confirm suspend user

  # Validation
  Then I click on staff link
  And I click on user "Ghost"  
  Then I verify that the user is suspended
  And I send a signal to user 2 containing "suspend completed"
  
@user2 @web

Scenario: 3. Como usuario admin puedo reactivar (un-suspend) otro usuario
  # Login Ghost
  Given I navigate to page "http://test.denkitronik.com:2368/ghost/#/signin"
  And I wait for a signal containing "suspend completed" for 240 seconds
  And I enter email "lasherone@hotmail.com"
  And I enter password "Pruebas12345"
  And I click on login button
  
  # Unsuspend user
  When I click on staff link
  And I click on user "Ghost"
  And I click on user settings
  And I click on un-suspend user
  And I click on confirm un-suspend user
  And I wait for 2 seconds
  
  # Validation
  Then I click on staff link
  And I verify that the user is unsuspended

