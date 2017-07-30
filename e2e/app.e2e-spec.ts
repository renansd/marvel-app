import { DesafioMarvelPage } from './app.po';

describe('desafio-marvel App', () => {
  let page: DesafioMarvelPage;

  beforeEach(() => {
    page = new DesafioMarvelPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
