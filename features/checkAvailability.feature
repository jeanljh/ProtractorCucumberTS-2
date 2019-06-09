Feature: checkAvailability

   Feature Description Test check availability features
   Scenario: Default placeholder text is present for Check-In Date and Check-Out Date fields
   Given Default Check-In Date placeholder text is present
   And Default Check-Out Date placeholder text is present

   Scenario: Default selected check-in date is today's date and check-out date is tomorrow's date
   Given Default selected check-in date is today's date
   And Default selected check-out date is tomorrow's date

   Scenario Outline: Validate date selected from date picker is shown in check-in and check-out date fields
   When Select '<checkInDate>' and '<checkOutDate>' from date picker
   Then '<checkInDate>' and '<checkOutDate>' are shown in check-in and check-out date fields

   Examples:
   | checkInDate | checkOutDate |
   | 3 July 2019  | 7 July 2019  |