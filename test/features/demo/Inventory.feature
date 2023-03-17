Feature: Inventory
    @demo @smoke
    Scenario Outline: Demo Inventory
        Given Login into inventory web app
        Then Inventory page should list <NumberOfProducts>
        Then Validate all products have valid price


        Examples:
            | TestID     | NumberOfProducts |
            | INTV_TC001 | 6                |