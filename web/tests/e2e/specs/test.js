// https://docs.cypress.io/api/table-of-contents

describe("Login", () => {
  it("Visit Login Page", () => {
    cy.visit("http://localhost:8000/login")
  })
  it("Perform Login", () => {
    cy.get("#email").type("testuser@example.com")
    cy.get("#password").type("testuser")
    cy.get("#loginbtn").click()
  })
  it("Redirect to Dashboard", () => {
    cy.url().should("include", "/dashboard")
  })
  it("Test Dark Mode", () => {
    cy.get("#dark-mode-btn").click()
    cy.get("#dark-mode-btn2").click()
    cy.wait(1000)
    cy.get("#dark-mode-btn").click()
    cy.get("#dark-mode-btn3").click()
    cy.wait(1000)
  })
  it("Switch to Mobile Phone", () => {
    cy.viewport("iphone-x")
  })
})
