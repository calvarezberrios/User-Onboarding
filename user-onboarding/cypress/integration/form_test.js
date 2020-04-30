describe("Test Form", () => {
    /* beforeEach(() => {
        cy.visit("http://localhost:3000");
    }); */
    it("Loads the Page", () => {
        cy.visit("http://localhost:3000");
    });

    it("Submits user", () => {
            
        cy.get("[data-cy='name']").type("Carlos Alvarez").should("have.value", "Carlos Alvarez");
        cy.get("[data-cy='age']").type("35").should("have.value", "35");
        cy.get("[data-cy='email']").type("carlos.alvarezberrio@gmail.com").should("have.value", "carlos.alvarezberrio@gmail.com");
        cy.get("[data-cy='password']").type("1234").should("have.value", "1234");
        cy.get("[data-cy='role']").select("Tech Support").should("have.value", "Tech Support");
        cy.get("[data-cy='terms']").check().should("be.checked");
        cy.contains("Submit").click();
    });   
    
    it("Submits second user", () => {
        cy.wait(1000);
        cy.get("[data-cy='name']").type("Carlos Alvarez").should("have.value", "Carlos Alvarez");
        cy.get("[data-cy='age']").type("35").should("have.value", "35");
        cy.get("[data-cy='email']").type("carlos.alvarezberrio@gmail.com").should("have.value", "carlos.alvarezberrio@gmail.com");
        cy.get("[data-cy='password']").type("1234").should("have.value", "1234");
        cy.get("[data-cy='role']").select("Tech Support").should("have.value", "Tech Support");
        cy.get("[data-cy='terms']").check().should("be.checked");
        cy.contains("Submit").click();
    });    
    
    
});