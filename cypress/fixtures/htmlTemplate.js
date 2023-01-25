
 
 let color = "color: rgb(54, 54, 54);"
 
 export const html = {
  "header": "<p>Amazon Order # [[orderNumber]]</p>",
  "body": `<p><strong style=${color}>Hello Dear Customer! </strong></p><p><br></p><p>This email is simply intended to follow up on your order. We want to make sure you had a pleasant transaction with us or if you had an issue that we can help you with. Simply reply to this email and your issue will be looked at and resolved immediately. Product details below.</p><p><br></p><p>[[productList]]</p><p><br></p><p>We appreciate any feedback you can leave us showing our level of service. We are looking forward to seeing you shop with us again.</p><p><br></p><p><a href="https:/www.amazon.com/gp/feedback/leave-customer-feedback.html/?order=[[orderNumber]]&amp;pageSize=1" rel="noopener noreferrer" target="_blank">Leave Us Feedback</a></p>`,
  "footer": "<p>Thank you</p>"
 };

 export const text = {
    "header": "Amazon Order # [[orderNumber]]",
    "body": "Hello Dear Customer! This email is simply intended to follow up on your order. We want to make sure you had a pleasant transaction with us or if you had an issue that we can help you with. Simply reply to this email and your issue will be looked at and resolved immediately. Product details below.[[productList]]We appreciate any feedback you can leave us showing our level of service. We are looking forward to seeing you shop with us again.Leave Us Feedback",
    "footer": "Thank you"
 }

 export const textCheck = {
   "header": 'Amazon Order # 000-000000-0000',
   "body1": 'This email is simply intended to follow up on your order. We want to make sure you had a pleasant transaction with us or if you had an issue that we can help you with. Simply reply to this email and your issue will be looked at and resolved immediately. Product details below.',
   "body2": 'We appreciate any feedback you can leave us showing our level of service. We are looking forward to seeing you shop with us again.',
   "footer": 'Thank you'
 }