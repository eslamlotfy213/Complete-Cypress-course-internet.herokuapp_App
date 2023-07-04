describe(' API Functionlaity ', { defaultCommandTimeout: 60000 } , ()=>{
  let token; 

  


  
  beforeEach('API request', () => {
      cy.request({
        method: 'POST',
        url: "https://the-internet.herokuapp.com/authenticate",
        body : {
          username: 'tomsmith',
          password: 'SuperSecretPassword!'
        },
      }).then((response) =>{
              expect(response.status).to.eql(200);
              token = response.body.access_token
             
      }); 
    });




    it('Get API request', () => {
      cy.request({
        method: 'GET',
        url: 'https://the-internet.herokuapp.com/secure',
        headers : 
        {
          Authorization: 'Basic ${token}'
        }

      });

    });

});