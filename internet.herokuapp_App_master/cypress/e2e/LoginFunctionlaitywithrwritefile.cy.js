describe(' Login Functionlaity ', { defaultCommandTimeout: 60000 } , ()=>{

    beforeEach(()=>{
         // to read the data value from fixture file using json
        //create a validuser.file under fixture 
        //API Call .........................................
      cy.writeFile('cypress/fixtures/testdata.json',
          {
        email : "tomsmith",
        password : "SuperSecretPassword!"
          });
    });

    
    it('should be login with valid email and password ', () => {
      
      // to go to the URL website
        cy.visit('/login')
        cy.readFile('cypress/fixtures/testdata.json').as('USERS')
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