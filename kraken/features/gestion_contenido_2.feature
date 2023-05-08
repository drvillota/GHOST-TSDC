Feature: Gestion de usuarios de Ghost (suspension y reactivacion)

@user1 @web

Scenario: 3. Como usuario puedo crear un post scheduled (programada)
    # Login Ghost
    Given I navigate to page "http://test.denkitronik.com:2368/ghost/#/signin"
    And I enter email "lasherone@hotmail.com"
    And I enter password "Pruebas12345"
    And I click on login button
    And I wait for 2 seconds

    # Schedule post
    When I click on post link 
    And I click on New post button
    And I enter a post title: "$name_1"
    And I begin writing the post: "$name_1"
    And I display the publish options
    And I click in the schedule option
    And I click in the schedule button

    # Validate scheduled post
    Then I navigate to page "http://test.denkitronik.com:2368/ghost/#/posts?type=scheduled"
    And I should see the post few seconds ago

@user2 @web

Scenario: 4. Como usuario puedo actualizar un post
    # Login Ghost
    Given I navigate to page "http://test.denkitronik.com:2368/ghost/#/signin"
    And I enter email "lasherone@hotmail.com"
    And I enter password "Pruebas12345"
    And I click on login button
    And I wait for 2 seconds

    # Update post
    When I click on a post
    And I enter a post title: "$name_1"
    And I begin writing the post: "$name_1"
    And I display the update options
    And I click in the update button

    # Validate scheduled post
    Then I navigate to page "http://test.denkitronik.com:2368/ghost/#/posts?type=scheduled"
    And I should see the post few seconds ago