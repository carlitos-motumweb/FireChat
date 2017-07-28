import { FireChatPage } from './app.po';

describe('fire-chat App', () => {
  let page: FireChatPage;

  beforeEach(() => {
    page = new FireChatPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
