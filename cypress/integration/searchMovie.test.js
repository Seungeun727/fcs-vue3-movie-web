/*
* 메인페이지로 접속한다.
* 메인페이지 검색창에서 영화 제목(frozen), 영화 개수(30)으로 설정한다.
* 버튼을 활성화하여 영화 목록을 검색한다.
* 메인 페이지에서 영화 목록 30개가 출력이 확인된다.
* 영화 목록 중 Frozen II을 클릭한다.
* 해당 정보의 상세 페이지로 이동한다. 
* 상세 페이지에서 정보를 확인한다.
*/

describe('영화 검색(겨울 왕국II)' , () => {
  it('(검색)메인 페이지로 접근합니다.', () => {
    cy.visit('/');
    // nav-link 요소 찾고 nav 버튼이 활성화가 되면
    // nav의 name 속성이 Search가 포함되는지 test
    cy.get('header .nav-link.active')
      .contains('Search'); 
  })

  it('영화를 검색합니다.', () => {
    cy.get('input.form-control')
      .type('frozen');  // DOM 요소에 값을 입력한다.
    cy.get('select.form-select:nth-child(2)')
      .select('30');  //  해당 요소에 값을 선택한다.
    cy.get('button.btn') // 해당 버튼에 Apply값이 포함되어 있는지 확인하고 클릭한다.
      .contains('Apply')
      .click();
    cy.wait(2000);  // 버튼 클릭 후 2초 기다리고 출력된 목록 확인한다.
    cy.get('.movie')  
      .should('have.length', 30);  // 영화 목록 30개 출력되는지 확인한다.
  })

  it('겨울왕국2 영화 아이템을 선택합니다.', () => {
    cy.get('.movie .title')
      .contains('Frozen II')
      .click();    // 해당 요소에 Frozen II의 값이 포함된다면 클릭한다.
  })

  it('해당 아이템에 상세 영화 정보를 확인합니다.', () => {
    cy.url() // http://localhost:8080/movie/tt4520988 
      .should('include', '/movie/tt4520988'); 
    cy.wait(1000);
    cy.get('header .nav-link.active') 
      .contains('Movie');  // Movie navigation 버튼이 활성화가 되었는지 확인한다.
    cy.get('title')
      .contains('Frozen II'); // 상세 페이지에서 Frozen II 정보를 확인한다.
  })
})