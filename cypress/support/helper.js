import user from '../fixtures/user.json';
import campaignsPage from '../support/Pages/CampaignsPage';
import campaignEditorPage from '../support/Pages/CampaignEditorPage';
import sessionData from '../fixtures/sessionData.json';

 

export function loginViaAPI(){
    //создаем объект который называем requestBody в этом объекте есть значение user: в котором хранится еще один объект с пустыми email: и password:
    let requestBody = {email: "admin@gmail.com", password: "vI3iT581Lrh&"};
//тут обращаемся к значению email в созданной переменной requestBody и задаем значение из файла user
    //requestBody.email = user.email;
    //requestBody.password = user.password;
//тут делаем реквест с методом POST, с эндпоинтом /api/users/login и с нашим объектом который хранится в переменной requestBody
    cy.request('POST', 'https://emails-dev-api.alpha-pram.com/user/auth/login', requestBody).then( response => {

// тут создаем переменную token которая получит значение из тела ответа в котором у юзера есть еще токен
        let token = response.body.accessToken;
// сетим этот токен в localStorage
        window.localStorage.setItem('accessToken', token)

// командой window обращаемся к localStorage, командой setItem в скобках указываем ключ и значение которое из джейсона преобразуем в строку
        window.localStorage.setItem('storeId', JSON.stringify(sessionData));
    })
};


 export function login() {
    

        cy.visit('/');

        cy.get('[type="email"]').type('admin@gmail.com');

        cy.get('[type="password"]').type('vI3iT581Lrh&');

        cy.get('span:contains(" LOG IN ")').click().wait(3000).should(() => {

            cy.saveLocalStorage(localStorage);
        })
   
};

export function createCampaign(campaignName,template,description,email){

    campaignsPage.submitPopUpForm(campaignName,template);

        campaignEditorPage.submitCampaignCreationForm(description,email);

        campaignsPage.getPopUpMessage()
        .should('contain', "Campaign created");

        campaignsPage.getCampaignNameHolder('Test')
        .should('contain', "Test" );

};

export function removeCampaign(campaignName){

        campaignsPage.removeCampaign(campaignName);

        campaignsPage.getPopUpMessage().should('contain', "Campaign deleted");
};

