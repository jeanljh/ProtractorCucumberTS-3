Feature: Flights tab

   Scenario: Test visibility of fields for Round trip and Oneway options
      Given I click Flights tab and expand Advanced Options
      Then Round trip radio button is selected by default
      And Return date text, Return from and to text fields are visible
      When I click Oneway radio button
      Then Oneway radio button is selected
      And Return date text, Return from and to text fields are not visible


   Scenario Outline: Test cabin class and travelers options
      When I select '<cabin>', <adult>, <child>, <infantLap>, <infantSeat>
      Then I can see these value are selected on travelers fields

      Examples:
         | cabin          | adult | child | infantLap | infantSeat |
         | Economy        | 2     | 5     | 1         | 1          |
         | PremiumEconomy | 3     | 1     | 2         | 1          |
         | Business       | 4     | 0     | 1         | 3          |
         | First          | 1     | 5     | 1         | 1          |