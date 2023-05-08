Feature: Gestion de usuarios de Ghost (suspension y reactivacion)

@user1 @web

Scenario: 1. Como usuario puedo crear un item de navegacion
    # Login Ghost
    Given I navigate to page "http://test.denkitronik.com:2368/ghost/#/signin"
    And I enter email "lasherone@hotmail.com"
    And I enter password "Pruebas12345"
    And I click on login button
    And I wait for 2 seconds
    # Create item
    When I click on design link 
    #And I wait for 30 seconds    
    And I enter a new design label: "$name_1"
    And I click on save design button
    
    # Validate item
    Then I navigate to page "http://test.denkitronik.com:2368/ghost/#/site"
    # And I should see the design label "$$name_1"

@user2 @web

Scenario: 4. Como usuario puedo actualizar un item de navegacion
    # Login Ghost
    Given I navigate to page "http://test.denkitronik.com:2368/ghost/#/signin"
    And I enter email "lasherone@hotmail.com"
    And I enter password "Pruebas12345"
    And I click on login button
    And I wait for 2 seconds
    # Update item
    When I click on design link 
    #And I wait for 30 seconds    
    And I update a design label: "$name_1"
    And I click on save design button
    
    # Validate item
    Then I navigate to page "http://test.denkitronik.com:2368/ghost/#/site"
    # And I should see the design label "$$name_1"