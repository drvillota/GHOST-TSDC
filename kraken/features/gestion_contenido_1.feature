Feature: Gestion de usuarios de Ghost (suspension y reactivacion)

@user1 @web

Scenario: 1. Como usuario puedo publicar un post
    # Login Ghost
    Given I navigate to page "http://test.denkitronik.com:2368/ghost/#/signin"
    And I enter email "lasherone@hotmail.com"
    And I enter password "Pruebas12345"
    And I click on login button
    And I wait for 2 seconds

    # Create post
    When I click on post link 
    And I click on New post button
    And I enter a post title: "$name_1"
    And I begin writing the post: "$name_1"
    And I display the publish options
    And I click in the publish button

    # Validate post
    Then I navigate to page "http://test.denkitronik.com:2368/ghost/#/posts"
    And I should see the post few seconds ago


@user2 @web

Scenario: 2. Como usuario puedo crear un draft
    # Login Ghost
    Given I navigate to page "http://test.denkitronik.com:2368/ghost/#/signin"
    And I enter email "lasherone@hotmail.com"
    And I enter password "Pruebas12345"
    And I click on login button
    And I wait for 2 seconds

    # Create draft
    When I click on post link 
    And I click on New post button
    And I enter a post title: "$name_1"
    And I begin writing the post: "$name_1"

    # Validate draft
    Then I navigate to page "http://test.denkitronik.com:2368/ghost/#/posts?type=draft"
    And I should see the post few seconds ago
