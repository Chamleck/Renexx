/// <reference types="cypress"/>

import BasePage from "./BasePage";

class TemplateEditorPage extends BasePage {

    getSubjectField() {
        return cy.get('[placeholder="Type subject"]');
    }

    getPic() {
        return cy.get('[title="testPic.png"]');
    }

    getDoc() {
        return cy.get('[title="testDoc.pdf"]');
    }

    getShortcutHeaderBtn() {
        return cy.get('.shortcuts').eq(0);
    }

    getShortcutType(shortcut) {
        return cy.get(`span:contains(${shortcut})`);
    }

    getShortcutLinkTextField() {
        return cy.get('[placeholder="Link text"]');
    }

    getAddPicBtn() {
        return cy.get('input[type="file"][accept="image/*"]');
    }

    getAddDocBtn() {
        return cy.get('input[type="file"][accept=".pdf"]');
    }

    getClosePreviewBtn() {
        return cy.get('.modal-close.is-large');
    }

    getAddBtn() {
        return cy.get('span:contains("Add")');
    }

// 0 is form, 1 is date, 2 is To, 3 is subject
    getLetterInfoContainer(info) {
        return cy.get('.p-2').eq(1)
            .find('p').eq(`${info}`);
    }

    getShortcutInPreview(text) {
        return cy.get(`p a:contains(${text})`);
    }

    getTextInPreview(text) {
        return cy.get(`p:contains(${text})`);
    }

    getDocInPreview(docName) {
        return cy.get(`a:contains(${docName})`);
    }

    getPicInPreview() {
        return cy.get('strong:contains("Hello Dear Customer!")')
        .find('img');
    }

    getGreetingInPreview(text) {
        return cy.get(`p>strong:contains(${text})`);
    }

    getPreviewWindow() {
        return cy.get('.template-preview-modal__template');
    }

    getHeaderSelect() {
        return cy.get('.template-collapse__header').eq(0)
            .find('select');
    }

    getFooterSelect() {
        return cy.get('.template-collapse__header').eq(2)
            .find('select');
    }

    getHeaderUnwarp() {
        return cy.get('.mdi-menu-down.mdi-24px').eq(0);
    }

    getFooterUnwarp() {
        return cy.get('.mdi-menu-down.mdi-24px').eq(2);
    }

// h1,h2,h3,h5 итд
    getHeadingTag(heading) {
        return cy.get(`h${heading}`);
    }

    getQuotesTag() {
        return cy.get('blockquote');
    }

    getHighlightedTag() {
        return cy.get('pre');
    }

    getQuotesBtn() {
        return cy.get('.ql-formats').eq(9)
            .find('.ql-blockquote');
    }

    getHighlightBtn() {
        return cy.get('.ql-formats').eq(9)
            .find('.ql-code-block');
    }

    getFirstXSetting() {
        return cy.get('.ql-formats').eq(10)
            .find('[value="sub"]');
    }

    getSecondXSetting() {
        return cy.get('.ql-formats').eq(10)
            .find('[value="super"]');
    }

    getHeaderSourceBtn() {
        return cy.get('.b-radio').eq(0);
    }

    getHeaderTextBtn() {
        return cy.get('.b-radio').eq(1);
    }

    getBodySourceBtn() {
        return cy.get('.b-radio').eq(2);
    }

    getBodyTextBtn() {
        return cy.get('.b-radio').eq(3);
    }

    getFooterSourceBtn() {
        return cy.get('.b-radio').eq(4);
    }

    getFooterTextBtn() {
        return cy.get('.b-radio').eq(5);
    }


    getLinkBtn() {
        return cy.get('.ql-link').eq(0);
    }

    getListTagInHeader(listCheck) {
        return cy.get('.ql-editor').eq(0)
            .find(`${listCheck}`);
    }


    getHeaderFatText() {
        return cy.get('.ql-formats').eq(2)
            .find('.ql-bold');
    }

    getHeaderLinedText() {
        return cy.get('.ql-formats').eq(2)
            .find('.ql-underline');
    }

    getHeaderItalicText() {
        return cy.get('.ql-formats').eq(2)
            .find('.ql-italic');
    }

    getHeaderStrikeText() {
        return cy.get('.ql-formats').eq(2)
            .find('.ql-strike');
    }

    getHeaderParagraphBtn() {
        return cy.get('.ql-formats').eq(7);
    }

    getHeaderInput() {
        return cy.get('.ql-editor').eq(0);
    }

    getHeaderSourceInput() {
        return cy.get('textarea').eq(0);
    }

    getBodyInput() {
        return cy.get('.ql-editor').eq(1);
    }

    getBodySourceInput() {
        return cy.get('textarea').eq(1);
    }

    getFooterInput() {
        return cy.get('.ql-editor').eq(2);
    }

    getFooterSourceInput() {
        return cy.get('textarea').eq(2);
    }

    getText(text) {
        return cy.get(`p:contains("${text}")`);
    }

    getHeaderText(text) {
        return cy.get(`div.ql-editor`).eq(0)
            .find(`li:contains("${text}")`);
    }

    getSpanWithSettings(text) {
        return cy.get(`li:contains("${text}")`)
            .find('span');
    }

    getBodyText(text) {
        return cy.get(`.ql-editor`).eq(1)
            .find(`p:contains("${text}")`);
    }

    getFooterText(text) {
        return cy.get(`.ql-editor`).eq(2)
            .find(`p:contains("${text}")`);
    }

    getHeaderSaveBtn() {
        return cy.get('.template-collapse__header').eq(0)
            .find('button').eq(0);
    }

    getTitle() {
        return cy.get('[placeholder="Template title"]');
    }

    getOkBtn() {
        return cy.get('button:contains("OK")');
    }

    getYesSaveBtn() {
        return cy.get('span:contains("Yes, Save")');
    }

    getEditExistedBtn() {
        return cy.get('span:contains("Edit existed")');
    }

    getHeaderEditBtn() {
        return cy.get('.mdi-pencil').eq(1);
    }

    getTemplateEditBtn(){
        return cy.get('.mdi-pencil').eq(0);
    }

    getTemplateHeaderFooterNameField() {
        return cy.get('.input').eq(1);
    }

    getFooterEditBtn() {
        return cy.get('.mdi-pencil').eq(2);
    }

    getDeleteBtn() {
        return cy.get('span:contains("Delete")')
    }

    getToastr(text) {
        return cy.get(`p:contains(${text})`);
    }

    getSelectLastHeaderFooter() {
        return cy.get('.modal-content')
            .find('select')
    }

    getHeaderDeleteBtn() {
        return cy.get('.mdi-delete').eq(1);
    }

    getFooterDeleteBtn() {
        return cy.get('.mdi-delete').eq(2);
    }
    // 0 is pic, 1 is doc
    getDeleteFileIcon(picOrDoc) {
        return cy.get('.mdi-delete-forever').eq(`${picOrDoc}`)
    }

    // 0 is left , 1 is center , 2 is right, 3 is justify
    getHeaderAllign(allign) {
        return cy.get('.ql-align').eq(`${allign}`);
    }

    getHeaderHeadingSelect() {
        return cy.get('.ql-header.ql-picker').eq(0);
    }

    // 0 is num list, 1 is dot list
    getHeaderListType(list) {
        return cy.get('.ql-list').eq(`${list}`);
    }


    getFontPickerHeader() {
        return cy.get('.ql-font.ql-picker').eq(0);
    }

    getFontSizePickerHeader() {
        return cy.get('.ql-size.ql-picker').eq(0);
    }

    // 8px  and so on
    getHeaderFontSize(size) {
        return cy.get(`[data-value="${size}"]`).eq(0);
    }

//Arial //sans //sans-serif //monospace
    getHeaderFont(font) {

        return cy.get('.ql-picker-options').eq(0)
            .find(`.ql-picker-item[data-value="${font}"]`);
    }

    getHeaderHeadings(heading) {
        return cy.get('.ql-picker-options').eq(2)
            .find(`.ql-picker-item[data-value="${heading}"]`);
    }

    getFooterSaveBtn() {
        return cy.get('.template-collapse__header').eq(2)
            .find('button').eq(0);
    }

    getSaveTemplateBtn() {
        return cy.get('div .p-2.has-text-white')
            .find('button').eq(1);
    }

    getEditLinkForm() {
        return cy.get('.ql-tooltip').eq(0);
    }

    getLinkField() {
        return cy.get('[data-formula="e=mc^2"]');
    }

    getSaveLinkBtn() {
        return cy.get('.ql-action').eq(1);
    }

    getCustomLink() {
        return cy.get('[href="google.com"]')
    }

    getPreviewBtn() {
        return cy.get('div .p-2.has-text-white')
            .find('button').eq(0);
    }

    getAmazonOrderNumField() {
        return cy.get('[placeholder="Amazon Order Number..."]');
    }

    getTemplateSaveOptions(){
        return cy.get('.mdi-menu-down').eq(1);
    }
    //Save for saving or Proceed to continue without saving changes
    getSaveOption(option){
        return cy.get(`span:contains(${option})`);
    }


    getTemplateSaveCopyBtn(){
        return cy.get('.dropdown-item').eq(4);
    }

    getCreateCopyBtn(){
        return cy.get('span:contains("Create copy")');
    }

    getHeaderSaveOptions() {
        return cy.get('.mdi-menu-down').eq(2);
    }

    getFooterSaveOptions() {
        return cy.get('.mdi-menu-down').eq(5);
    }

    getHeaderCreateCopyBtn(){
        return cy.get('span:contains(" Create copy ")').first();
    }

    getFooterCreateCopyBtn(){
        return cy.get('span:contains(" Create copy ")').last();
    }

    getHeaderPlaceholder() {
        return cy.get('[data-placeholder="Insert text here ..."]').eq(0);
    }

    getBodyPlaceholder() {
        return cy.get('[data-placeholder="Insert text here ..."]').eq(1);
    }

    getFooterPlaceholder() {
        return cy.get('[data-placeholder="Insert text here ..."]').eq(2);
    }

    getTemplateSelector(){
        return cy.get('.is-flex.has-background-dark')
        .find('select');
    }

    saveTemplateAsCopy(option){
        cy.log(`**Opening save options dropdown**`);
        this.getTemplateSaveOptions().click();
        cy.log(`**Pushing "Save as copy" button**`);
        this.getTemplateSaveCopyBtn().click();
        cy.log(`**Pushing ${option} Btn**`);
        this.getSaveOption(option).click();
        //window.addEventListener("DOMContentLoaded", () => {
        cy.exist('.modal-content').then(exists => {
        if (exists) {
        cy.log(`**Pushing "Create copy" Btn for footer**`);
        this.getFooterCreateCopyBtn().click();
        cy.log(`**Pushing "Create copy" Btn for header**`);
        this.getHeaderCreateCopyBtn().click();
        cy.log(`**Pushing "OK" Btn**`);
        this.getOkBtn().last().click();
        cy.log(`**Pushing "OK" Btn**`);
        this.getOkBtn().first().click();
        }
        else {
            cy.log(`**All saved**`)
        }
         })
    // })
    }      

    editTemplateName(name){
        cy.log(`**Pushing edit template name Btn**`);
        this.getTemplateEditBtn().click();
        cy.log(`**Typing ${name} to name field**`);
        this.getTemplateHeaderFooterNameField().clear().type(name);
        cy.log(`**Pushing on Ok Btn**`);
        this.getOkBtn().click();
    }

    editHeaderName(name){
        cy.log(`**Pushing edit header name Btn**`);
        this.getHeaderEditBtn().click();
        cy.log(`**Typing ${name} to name field**`);
        this.getTemplateHeaderFooterNameField().clear().type(name);
        cy.log(`**Pushing on Ok Btn**`);
        this.getOkBtn().click();
    }

    editFooterName(name){
        cy.log(`**Pushing edit footer name Btn**`);
        this.getFooterEditBtn().click();
        cy.log(`**Typing ${name} to name field**`);
        this.getTemplateHeaderFooterNameField().clear().type(name);
        cy.log(`**Pushing on Ok Btn**`);
        this.getOkBtn().click();
    }

    editTextInTemplate(text){
        cy.log(`**Typing ${text} in header footer and body**`);
        this.getHeaderInput().clear().type(text);
        this.getBodyInput().clear().type(text);
        this.getFooterInput().clear().type(text);
    }
    
    selectTemplate(template){
        cy.log(`**Selecting ${template} template*`);
        this.getTemplateSelector().select(template);
    }

    selectHeader(header){
        cy.log(`**Selecting ${header} header*`);
        this.getHeaderSelect().select(header);
    }

    removeHeader(header){
        cy.log(`**Selecting ${header} header*`);
        this.getHeaderSelect().select(header);
        cy.log(`**Pushing delete pencil**`);
        this.getHeaderDeleteBtn().click();
    }

    selectFooter(footer){
        cy.log(`**Selecting ${footer} header*`);
        this.getFooterSelect().select(footer);
    }

    removeFooter(footer){
        cy.log(`**Selecting ${footer} header*`);
        this.getFooterSelect().select(footer)
        cy.log(`**Pushing delete pencil**`);
        this.getFooterDeleteBtn().click();
    }

    removePicOrDoc(picOrDoc){
        cy.log(`**Pushing on Delete icon**`);
        this.getDeleteFileIcon(picOrDoc).as('btn').click();
        cy.log(`**Pushing on Ok Btn**`);
        this.getOkBtn().click();

    }

    removeLastHeader() {
        cy.log(`**Pushing on Delete Footer Btn**`);
        this.getHeaderDeleteBtn().click();
        cy.log(`**Selecting default header**`);
        this.getSelectLastHeaderFooter().select('default header');
        cy.log(`**Pushing delete btn**`);
        this.getDeleteBtn().click();
    }

    removeLastFooter() {
        cy.log(`**Pushing on Delete Footer Btn**`);
        this.getFooterDeleteBtn().click();
        cy.log(`**Selecting default footer**`);
        this.getSelectLastHeaderFooter().select('default footer');
        cy.log(`**Pushing delete btn**`);
        this.getDeleteBtn().click();
    }

    clickPic() {
        cy.log(`**Pushing on picture to add it**`);
        this.getPic().click();
    }

    clickDoc() {
        cy.log(`**Pushing on doc to add it**`);
        this.getDoc().click();
    }

    clickQuotesBtn() {
        cy.log('**Activating quotes**');
        this.getQuotesBtn().click();
    }

    clickHighlightingBtn() {
        cy.log('**Activating highlighting**');
        this.getHighlightBtn().click();
    }

    clickFirstXSetting() {
        cy.log('**Activating X setting number 1**');
        this.getFirstXSetting().click();
    }

    clickSecondXSetting() {
        cy.log('**Activating X setting number 2**');
        this.getSecondXSetting().click();
    }

    activatingLink() {
        ('**Clicking link button**');
        this.getLinkBtn().click();
        ('**Typing the link adress**');
        this.getLinkField().invoke('css', 'display: inline-block;').click().type('google.com', {force: true});
        ('**Saving link**');
        this.getSaveLinkBtn().click();
    }

    createTemplate(text, titleName) {
        cy.log('**Filling subject field**');
        this.getSubjectField().type('Hello');

        cy.log('**Selecting New Header**');
        this.getHeaderSelect().select('[New Header]');

        cy.log('**Unwarping Header**');
        this.getHeaderUnwarp().click();

        cy.log('**Selecting New Footer**');
        this.getFooterSelect().select('[New Footer]');

        cy.log('**Unwarping Footer**');
        this.getFooterUnwarp().click();

        cy.log(`**Adding ${text} to header**`);
        this.getHeaderInput().type(text);

        cy.log(`**Adding ${text} to body**`);
        this.getBodyInput().type(text);

        cy.log(`**Adding ${text} to footer**`);
        this.getFooterInput().type(text);

        cy.log(`**Saving new Header**`);
        this.getHeaderSaveBtn().click();

        cy.log(`**Adding ${titleName} to title field**`);
        this.getTitle().type(titleName);

        cy.log(`**Pushing ok button**`);
        this.getOkBtn().click();

        cy.log(`**Saving new Footer**`);
        this.getFooterSaveBtn().click();

        cy.log(`**Adding ${titleName} to title field**`);
        this.getTitle().type(titleName);

        cy.log(`**Pushing ok button**`);
        this.getOkBtn().click();

        cy.log(`**Saving template**`);
        this.getSaveTemplateBtn().click();

        cy.log(`**Pushing ok button**`);
        this.getOkBtn().click();

        cy.log(`**Adding ${titleName} to title field**`);
        this.getTitle().type(titleName);

        cy.log(`**Pushing ok button**`);
        this.getOkBtn().click();
    }

    addImage(file) {
        cy.log(`**Adding image*`);
        this.getAddPicBtn().should('be.enabled');
        this.getAddPicBtn().selectFile(file, {log: true, force: true, timeout: 10000});
    }

    addDoc(file) {
        cy.log(`**Adding PDF*`);
        this.getAddDocBtn().should('be.enabled');
        this.getAddDocBtn().selectFile(file, {log: true, force: true, timeout: 10000});
    }

    createTemplateWithHtml(headerText, bodyText, footerText, titleName) {
        cy.log('**Filling subject field**');
        this.getSubjectField().type('Hello');

        cy.log('**Selecting New Header**');
        this.getHeaderSelect().select('[New Header]');

        cy.log('**Unwarping Header**');
        this.getHeaderUnwarp().click();

        cy.log('**Selecting New Footer**');
        this.getFooterSelect().select('[New Footer]');

        cy.log('**Unwarping Footer**');
        this.getFooterUnwarp().click();

        cy.log('**Clicking on header source btn**');
        this.getHeaderSourceBtn().click();

        cy.log(`**Adding ${headerText} to header**`);
        this.getHeaderSourceInput().type(headerText);

        cy.log('**Clicking on header text btn**');
        this.getHeaderTextBtn().click();

        cy.log(`**Saving new Header**`);
        this.getHeaderSaveBtn().click();

        cy.log(`**Adding ${titleName} to header title field**`);
        this.getTitle().type(titleName);

        cy.log(`**Pushing ok button*`);
        this.getOkBtn().click();

        cy.log('**Clicking on body source btn**');
        this.getBodySourceBtn().click();

        cy.log(`**Adding ${bodyText} to body**`);
        this.getBodySourceInput().type(bodyText);

        cy.log('**Clicking on body text btn**');
        this.getBodyTextBtn().click();

        cy.log('**Clicking on footer source btn**');
        this.getFooterSourceBtn().click();

        cy.log(`**Adding ${footerText} to footer**`);
        this.getFooterSourceInput().type(footerText);

        cy.log('**Clicking on footer text btn**');
        this.getFooterTextBtn().click();

        cy.log(`**Saving new Footer**`);
        this.getFooterSaveBtn().click();

        cy.log(`**Adding ${titleName} to footer title field**`);
        this.getTitle().type(titleName);

        cy.log(`**Pushing ok button*`);
        this.getOkBtn().click();
    }

    saveTemplate(titleName) {
        cy.log(`**Saving template*`);
        this.getSaveTemplateBtn().click();

        cy.log(`**Pushing ok button*`);
        this.getOkBtn().click();

        cy.log(`**Adding ${titleName} to title field**`);
        this.getTitle().clear().type(titleName);

        cy.log(`**Pushing ok button*`);
        this.getOkBtn().click();
    }

    openPreview() {
        cy.log(`**Clicking preview btn*`);
        this.getPreviewBtn().click()
    }

    addShortcut(shortcut, linkText) {
        cy.log(`**Clicking on shortcut btn**`);
        this.getShortcutHeaderBtn().click();

        cy.log(`**Selecting shortcut type**`);
        this.getShortcutType(shortcut).click();

        cy.log(`**Adding link text**`);
        this.getShortcutLinkTextField().clear().type(`${linkText}`);

        cy.log(`**Pushing add btn**`);
        this.getAddBtn().click();
    }

    savingTemplateByLeavingPage() {

        cy.log(`**Pushing "Yes Svave" on pop up window**`);
        this.getYesSaveBtn().click();

        cy.log(`**Pushing ok button**`);
        this.getOkBtn().click();
    }

    savingEditedHeader() {
        cy.log(`**Saving new Header**`);
        this.getHeaderSaveBtn().click();

        cy.log(`**Pushing "Edit Existed" on pop up window**`);
        this.getEditExistedBtn().click();
    }

    typeTextInHeader(text) {
        cy.log(`**Adding ${text} to header**`);
        this.getHeaderInput().clear().type(`${text},{selectAll}`);
    }

    unwarpHeader() {

        cy.log('**Unwarping Header**');
        this.getHeaderUnwarp().click();
    }

    unwarpFooter() {

        cy.log('**Unwarping Footer**');
        this.getFooterUnwarp().click();
    }

    editHeader(font, allign, list, size) {

        cy.log('**Opening fonts dropdown**');
        this.getFontPickerHeader().click();

        cy.log(`**Selecting ${font} font**`);
        this.getHeaderFont(font).click();

        cy.log('**Opening fonts size dropdown**');
        this.getFontSizePickerHeader().click();

        cy.log(`**Selecting font size ${size}**`);
        this.getHeaderFontSize(size).click();

        cy.log(`**Selecting allign option ${allign}**`);
        this.getHeaderAllign(allign).click();

        cy.log(`**Selecting list option ${list}**`);
        this.getHeaderListType(list).click();
    }

    editHeading(heading) {
        cy.log(`**Clicking on heding selector**`);
        this.getHeaderHeadingSelect().click();
        cy.log(`**Selecting heading option ${heading}**`);
        this.getHeaderHeadings(heading).click();
    }

    editTextStyle(heading) {
        cy.log(`**Clearing the text**`);
        this.getHeadingTag(heading).click().clear();

        cy.log(`**Clicking on Fat text**`);
        this.getHeaderFatText().click();

        cy.log(`**Clicking on Lined text**`);
        this.getHeaderLinedText().click();

        cy.log(`**Clicking on Italic text**`);
        this.getHeaderItalicText().click();

        cy.log(`**Clicking on Strike text**`);
        this.getHeaderStrikeText().click();

        cy.log(`**Typing new text with new settings**`);
        this.getHeadingTag(heading).type('abc123');

        cy.log(`**Turning on paragraph option**`);
        this.getHeaderParagraphBtn().click()
    }

    closePreview() {
        cy.log(`**Closing preview**`);
        this.getClosePreviewBtn().click();
    }


}

export default new TemplateEditorPage();
