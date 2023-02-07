
import campaignsPage from '../support/Pages/CampaignsPage';
import campaignEditorPage from '../support/Pages/CampaignEditorPage';
import sessionData from '../fixtures/sessionData.json';
import statistics from '../fixtures/mailStatisticsMock.json';
import {faker} from '@faker-js/faker';

 

export function loginViaAPI(user){
    //создаем объект который называем requestBody в этом объекте есть значение user: в котором хранится еще один объект с пустыми email: и password:
    let requestBody = {email: "", password: ""};
//тут обращаемся к значению email в созданной переменной requestBody и задаем значение из файла user
     requestBody.email = user.email;
     requestBody.password = user.password;
    
    //тут делаем реквест с методом POST, с эндпоинтом /api/users/login и с нашим объектом который хранится в переменной requestBody
   
    cy.request('POST', 'https://emails-dev-api.alpha-pram.com/user/auth/login', requestBody).then( response => {

// тут создаем переменную token которая получит значение из тела ответа в котором у юзера есть еще токен
        let token = response.body.accessToken;
// сетим этот токен в localStorage
        window.localStorage.setItem('accessToken', token)

// командой window обращаемся к localStorage, командой setItem в скобках указываем ключ и значение которое из джейсона преобразуем в строку
        window.localStorage.setItem('storeId', sessionData.storeId);
    })
};


 export function login() {

        cy.session( () => {

        cy.visit('/');

        cy.get('[type="email"]').type('admin@gmail.com');

        cy.get('[type="password"]').type('vI3iT581Lrh&vI3iT581Lrh&');

        cy.get('span:contains(" LOG IN ")').click().wait(3000)
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

// export function createMock() {
//     //перебирає файл statistics щоб визначити кількість елементів шляхом їх
//     //перебирання за допомогою .map
//     return statistics.map(item=>{
//     //повертаю масив з рандомними number
//     return faker.datatype.number(9);
//     })
// };

export function mockStatistics(data) {

    cy.intercept('GET', '**/mail-statistics', data);
    cy.reload();
    
    // for (var statistic of statistics) {

    //     let number = faker.datatype.number(9)

    //     if (statistic.value == 0) {

    //         statistic.value = number
    //         arr.push(number)

    //     }
    // };
    //cy.log(JSON.stringify(arr))
    //створює массив з всіма ключами які є в обєкті        
    //Object.keys(statistic)
    //функція мап в дужках містить аргумент item який відповідає об'єкту в масиві
    //map мап бере кожен об'єк в масиві окремо та перебирає його, в фігурних дужках
    //ми присвоюємо ключу value який знаходиться в кожному перебраному об'єкті значення 3 
    /*let newarry= statistics.map((item)=>{
      item.value=3
    })*/
};

export function changeValues () {
//повертає в statistics результат перебирання за допомогою команди .map
//тобто підставляє в item.value (ітем це кожен об'єкт в масиві в якому береться ключ .value)
//потім повертє кожен саме змінений item; тому що ми його міняли, потім результат ціє
//функції використовується в іншій як аргумент щоб підставити новий statistics в мок
        return  statistics.map(item => {

        const randomNumer = faker.datatype.number(9);

        item.value = randomNumer;
    
        return item;
    })

};

export function mockSchedulingTable(data) {

cy.intercept('GET', '**/scheduling/orders?page=1&limit=20', data);

cy.reload();

};





