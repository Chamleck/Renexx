/// <reference types="cypress"/>
import campaignsPage from './Pages/CampaignsPage';
import campaignEditorPage from './Pages/CampaignEditorPage';
import sessionData from '../fixtures/sessionData.json';
import statistics from '../fixtures/mailStatisticsMock.json';
import schedulingPage from './Pages/SchedulingPage.js';
import {
    faker
} from '@faker-js/faker';



export function loginViaAPI(user) {
    //создаем объект который называем requestBody в этом объекте есть значение user: в котором хранится еще один объект с пустыми email: и password:
    let requestBody = {
        email: "",
        password: ""
    };
    //тут обращаемся к значению email в созданной переменной requestBody и задаем значение из файла user
    requestBody.email = user.email;
    requestBody.password = user.password;

    //тут делаем реквест с методом POST, с эндпоинтом /api/users/login и с нашим объектом который хранится в переменной requestBody

    cy.request('POST', 'https://emails-dev-api.alpha-pram.com/user/auth/login', requestBody).then(response => {

        // тут создаем переменную token которая получит значение из тела ответа в котором у юзера есть еще токен
        let token = response.body.accessToken;
        // сетим этот токен в localStorage
        window.localStorage.setItem('accessToken', token)

        // командой window обращаемся к localStorage, командой setItem в скобках указываем ключ и значение которое из джейсона преобразуем в строку
        window.localStorage.setItem('storeId', sessionData.storeId);
    })
};

export function loginSessionViaAPI(id, username = 'admin@gmail.com', password = 'vI3iT581Lrh&') {
    //создаем объект который называем requestBody в этом объекте есть значение user: в котором хранится еще один объект с пустыми email: и password:
    let requestBody = {
        email: "",
        password: ""
    };
    //тут обращаемся к значению email в созданной переменной requestBody и задаем значение из аргумента функции
    requestBody.email = username;
    requestBody.password = password;

    //тут делаем реквест с методом POST, с эндпоинтом /api/users/login и с нашим объектом который хранится в переменной requestBody
    cy.session(id, () => {
        cy.request('POST', 'https://emails-dev-api.alpha-pram.com/user/auth/login', requestBody).then(response => {

            // тут создаем переменную token которая получит значение из тела ответа в котором у юзера есть еще токен
            let token = response.body.accessToken;
            // сетим этот токен в localStorage
            window.localStorage.setItem('accessToken', token)

            // командой window обращаемся к localStorage, командой setItem в скобках указываем ключ и значение которое из джейсона преобразуем в строку
            window.localStorage.setItem('storeId', sessionData.storeId);
        }), {
            //вмикаэмо налаштування щоб кеш зберігався поміж сесіями
            cacheAcrossSpecs: true,
        }
    })
};



export function login() {

    cy.session(() => {

        cy.visit('/');

        cy.get('[type="email"]').type('admin@gmail.com');

        cy.get('[type="password"]').type('vI3iT581Lrh&vI3iT581Lrh&');

        cy.get('span:contains(" LOG IN ")').click().wait(3000)
    })

};

export function createCampaign(campaignName, template, description, email) {

    campaignsPage.submitPopUpForm(campaignName, template);

    campaignEditorPage.submitCampaignCreationForm(description, email);

    campaignsPage.getPopUpMessage()
        .should('contain', "Campaign created");

    campaignsPage.getCampaignNameHolder('Test')
        .should('contain', "Test");

};

export function removeCampaign(campaignName) {

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

export function changeValues() {
    //повертає в statistics результат перебирання за допомогою команди .map
    //тобто підставляє в item.value (ітем це кожен об'єкт в масиві в якому береться ключ .value)
    //потім повертє кожен саме змінений item; тому що ми його міняли, потім результат ціє
    //функції використовується в іншій як аргумент щоб підставити новий statistics в мок
    return statistics.map(item => {

        const randomNumer = faker.datatype.number(9);

        item.value = randomNumer;

        return item;
    })

};

export function mockSchedulingTable(data) {

    cy.intercept('GET', '**/scheduling/orders?page=1&limit=20', data);

    cy.reload();

};

export function filterOrders(body, key, data) {

    const foundObjects = body.data.filter(obj => obj[key] === data)
    return foundObjects;
};

export function getFormattedDate(date) {
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };
    return new Date(date).toLocaleDateString("fr-CA", options).replace("/", "-");
};

export function filterDates(data, value, value1, key) {
    // убираем точки в дате как первый этап приведения ее к формату даты который получаем в теле ответа
    let parts = value.split('.');
    let parts1 = value1.split('.');
    // склеиваем этот массив из отдельных чисел разварачивая его и добавляеем тире 
    const transformedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    const transformedDate1 = `${parts1[2]}-${parts1[1]}-${parts1[0]}`;


    // obj[key].slice(0, 10) делаем слайс оригинальной даты с которой сравниваем чтоб вырезать часть строки с информацией о часовом поясе,минутах и секундах
    const foundObjects = data.filter(obj => obj[key].slice(0, 10) >= transformedDate && obj[key].slice(0, 10) <= transformedDate1)

    return JSON.stringify(foundObjects);
};

export function schedulingRequest() {
    cy.request('GET', '**/scheduling/orders').then(request => {
        let data = request.response.body.data;
        return data;
    });
};

export function invokeText(i, columnType) {
    return schedulingPage.getDataRow(i, columnType).invoke('text').then(data => {
        const originalDate = data.slice(1, 11);
        const parts = originalDate.split('/');
        const transformedDate = `${parts[0]}.${parts[1]}.${parts[2]}`;
        return transformedDate;
    });
};

export function checkData(count, columnType, dateFrom, dateTo) {
    for (let i = 0; i < count; i++) {
        cy.log(i);
        invokeText(i, columnType).then(text => {
            cy.log(text);
            cy.log(dateFrom);
            cy.log(dateTo);
            if (dateTo >= text && dateFrom <= text) {
                const parts = text.split('.');
                let originalText = `${parts[0]}/${parts[1]}/${parts[2]}`;
                cy.log(`**elemnt is expected**`);
                cy.log(originalText);
                cy.log(text);
                cy.log(dateFrom);
                cy.log(dateTo);
                schedulingPage.getColumnRowContent(columnType, i).should('include.text', originalText);
            } else {
                cy.wrap(false, {
                    timeout: 1
                }).should('be.true', `Test failed for element ${i}`);

            }
        })
    }
};

export function checkStatus(count, columnType, status, status1, status2, status3) {
    for (let i = 0; i < count; i++) {

        schedulingPage.getColumnRowContent(columnType, i).should('include.text', status||status1||status2||status3);

    }
};

export function invokeOrderSkuNum(i, columnType) {
    return schedulingPage.getDataRow(i, columnType).invoke('text').then(data => {
        //використовую трім щоб прибрати пробіли
        let orderSkuNum = data.trim();
        //ставлю умову щоб повертало тільки ті значення які не порожні в іншому випадку я буду повертати результат цієї ж самої функції але аргументом передам ітератор збільшений
        //на одиницю щоб вона шукала наступний елемент, якщо знову там не буде значення то все пійде по другому колу і так поки не знайдеться елемент 
        if (orderSkuNum.length > 0) {
            return orderSkuNum;
        }else{
           return invokeOrderSkuNum(i + 1,columnType);
        }
    });
};

export function checkSearch(count, columnType, orderNum) {
    for (let i = 0; i < count; i++) {
        
        schedulingPage.getColumnRowContent(columnType, i).should('include.text', orderNum);
    }
}