Feature: Gestion de usuarios

@user1 @web
 
Scenario: 1. Como usuario admin puedo actualizar la informacion un usuario
  # Login Ghost
  Given I navigate to page "http://test.denkitronik.com:2368/ghost/#/signin"
  And I enter email "lasherone@hotmail.com"
  And I enter password "Pruebas12345"
  And I click on login button
  
  # Update user information
  When I click on staff link
  And I click on user "Ghost"
  And I update the bio to "$string_1"
  And I update the slug to "a-simple-slug"
  And I update the email to "$email_1"
  And I click on Save button
  And I click on staff link
  And I click on user "Ghost"
  
  # Validate that the user information was updated
  Then The Ghost user must contain the slug "a-simple-slug"
  And The Ghost user must contain the bio "$$string_1"
  And The Ghost user must contain the email "$$email_1"
  #And I send a signal to user 4 containing "update completed"


@user2 @web

Scenario: 4. Como usuario admin puedo cambiar la constraseña otro usuario
  # Login Ghost
  Given I navigate to page "http://test.denkitronik.com:2368/ghost/#/signin"
  #And I wait for 30 seconds
  #And I wait for a signal containing "update completed" for 240 seconds
  And I enter email "lasherone@hotmail.com"
  And I enter password "Pruebas12345"
  And I click on login button

  # Update user password
  When I click on staff link
  And I click on user "Ghost"
  And I enter the New Password field with "$string_2"
  And I enter the Verify Password field with "$$string_2"
  And I click on Change Password button
  #And I click on staff link
  #And I click on user "Ghost"
  
  # Validate that the password was changed
  Then I verify that the password was changed
  
