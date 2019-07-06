describe("Main View ", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get(".card").eq(1).as("targetcard")
            .find(".card-footer")
            .find("button")
            .as("cardButtons");
    });

    it("loads the list of contacts", () => {
        cy.get(".badge").should("contain", 50);
        cy.get(".card").should("have.length", 50);
    });

    describe("Delete operation", () => {
        it("allows a contact be deleted", () => {
            cy.get(".badge").should("contain", 50);
            cy.get("@cardButtons")
                .contains("Delete")
                .click();
            cy.get("@cardButtons")
                .contains("Confirm")
                .click();
            cy.get(".badge").should("contain", 49);
        });

        it("allows a delete operation be canceled", () => {
            cy.get("@cardButtons")
                .contains("Delete")
                .click();
            cy.get("@cardButtons")
                .contains("Cancel")
                .click();
            cy.get(".badge").should("contain", 50);
        });
    });

    describe("Edit operation", () => {
        it("allows a contact be edited", () => {
            cy.get("@cardButtons")
                .contains("Edit")
                .click();
            cy.get("@targetcard")
                .find(".card-body")
                .should("have.css", "background-color")
                .and("eq", "rgba(0, 0, 0, 0)");
            cy.get("@targetcard")
                .find("input")
                .first()
                .clear()
                .type("test@example.com");
            cy.get("@cardButtons")
                .contains("Save")
                .click();
            cy.get("@targetcard")
                .find("[data-icon=envelope]")
                .next()
                .should("contain", "test@example.com");
        });

        it("allows an edit be cancelled", () => {
            cy.get("@targetcard")
                .find("[data-icon=envelope]")
                .next()
                .invoke("text")
                .then($text => {
                    cy.get("@cardButtons")
                        .contains("Edit")
                        .click();
                    cy.get("@targetcard")
                        .find("input")
                        .first()
                        .clear()
                        .type("test@example.com");
                    cy.get("@cardButtons")
                        .contains("Cancel")
                        .click();
                    cy.get("@targetcard")
                        .find("[data-icon=envelope]")
                        .next()
                        .should("contain", $text);
                });
        });
    });
});

