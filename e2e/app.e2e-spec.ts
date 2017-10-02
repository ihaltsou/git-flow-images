import { GitFlowImagesPage } from './app.po';

describe('git-flow-images App', () => {
  let page: GitFlowImagesPage;

  beforeEach(() => {
    page = new GitFlowImagesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
