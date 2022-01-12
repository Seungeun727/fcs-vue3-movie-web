/**
 * 1. 메인 페이지로 접근한다.
 * 2. Header 상단 navigation의 About 버튼을 클릭한다.
 * 3. 해당 About 페이지에서 정보를 확인한다.
 * 4. 확인 후 Movie 페이지로 접근한다.
 * 5. Header 사용자 로고를 클릭한다.
 * 6. 클릭 후 다시 About 페이지에서 사용자 정보를 확인한다. */

describe('About 페이지 이동', () => {
  it('메인 페이지로 접근합니다.', () => {
    cy.visit('/');
    cy.get('header .nav-link.active')
      .contains('Search');
  })

  it('About 페이지로 이동합니다', () => {
    cy.get('header .nav-link')
      .contains('About')
      .click();
    cy.url()
      .should('include', '/about');
    cy.wait(1000); // 페이지가 렌더링이 되면 1초동안 기다리겠다.
    cy.get('header .nav-link.active')
      .contains('About');
    cy.get('.name')
      .contains('NoSeungEun');
  })

  it('영화 상세 페이지로 접근합니다!', () => {
    cy.get('header .nav-link')
      .contains('Movie')
      .click();
    cy.url()
      .should('include', '/movie');
    cy.wait(1000);
    cy.get('header .nav-link.active')
      .contains('Movie');
  })

  it('About 페이지로 이동합니다.', () => {
    cy.get('header .user')
      .click();
    cy.url()
      .should('include', '/about');
    cy.wait(1000);
    cy.get('header .nav-link.active')
      .contains('About');
    cy.get('.name')
      .contains('NoSeungEun');
  })

})