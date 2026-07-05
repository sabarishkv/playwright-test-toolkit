Feature: Navigating from the home page to the docs
  As a visitor on the Playwright website
  I want to go from the home page to the getting-started docs
  So that I can start learning how to use Playwright

  @bdd
  Scenario: Visitor follows the Get started link
    Given I am on the Playwright home page
    When I click the Get started link
    Then I should land on the getting-started docs page
