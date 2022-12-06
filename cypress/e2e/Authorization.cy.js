///<reference types="cypress"/>

import authorizationPage from '../support/Pages/AuthorizationPage';
import mainPage from '../support/Pages/MainPage';
import {login, loginViaAPI} from '../support/helper';
import user from '../fixtures/user.json';

it('Authorization with API', () => {
  loginViaAPI(user)
})




const wrongCredentials = [
  {email: 'admin@gmail.co', 
   password:'vI3iT581Lrh&'
  },

  
  {email: 'admin@gmail.com', 
   password:'Alda.Effertz'
  }
]

const invalidCredentials = [
  {email: 'admin.com', 
   password:'vI3iT581Lrh&'
  },

  {email: 'admin@.com', 
   password:'vI3iT581Lrh&'
  },

  {email: 'admin$@.com', 
   password:'vI3iT581Lrh&'
  },

  {email: 'admin@gmail.', 
   password:'vI3iT581Lrh&'
  }
]

it('Positive Authorization', () => {
  
  authorizationPage.visit()

  authorizationPage.submitLogInForm('admin@gmail.com','vI3iT581Lrh&')
  mainPage.getUserInfoPanel().should('contain', 'Renex').and('contain', "James Bothman")

  /*authorizationPage.getEmailField().type('admin@gmail.com');
  authorizationPage.getPasswordField().type('vI3iT581Lrh&');

        
  authorizationPage.getLogInButton().click()


  authorizationPage.getUserInfoPanel().should('contain', 'Renex').and('contain', "James Bothman")
  .then(()=>{expect(window.localStorage.getItem('accessToken')).to.exist})*/

   

 

})

wrongCredentials.forEach(({email, password }) =>{
  it(`Adding wrong email ${email} , adding wrong password ${password} to email & password fields`, () => {
    authorizationPage.visit();
    authorizationPage.NegativeSubmitLogInForm(email , password);
    authorizationPage.getPopUpNotification()
    .should('contain', 'User not found or password incorrect!');
})
});

invalidCredentials.forEach(({email, password }) =>{
    it(`Adding wrong format email ${email} , adding password ${password} to email & password fields`, () => {
      authorizationPage.visit();
      authorizationPage.NegativeSubmitLogInForm(email , password);
      authorizationPage.getValidationMessage()
      .should('exist');
  })
  });





