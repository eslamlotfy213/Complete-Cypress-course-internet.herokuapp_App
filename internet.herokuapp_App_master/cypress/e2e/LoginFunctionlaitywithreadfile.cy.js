describe(' Login Functionlaity ', { defaultCommandTimeout: 60000 } , ()=>{

    beforeEach(()=>{
         // to read the data value from fixture file using json
        //create a validuser.file under fixture 
      cy.readFile('cypress/fixtures/validuser.json').as('USERS')
    
    })

    it('should be login with valid email and password ', () => {
      
      // to go to the URL website
        cy.visit('/login')

          //create alias 
          //add @
          //cy.get('@alias')
          cy.get('@USERS').then(Data=>{
          cy.get('#username').type(Data.email)
          cy.get('#password').type(Data.password)
        })

        // to enter the login button
        cy.get('[type="submit"]').click()
        //to verify using should & contain
        cy.get('.subheader').should('contain','Welcome to the Secure Area. When you are done click logout below.')
        // to verify the url contain
        cy.url().should('contain','/secure')
         // to verify logout tbutton 
        cy.get('.button').should('be.visible')
        cy.get('.button').click()
      })
})