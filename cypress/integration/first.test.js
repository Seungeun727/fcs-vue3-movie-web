// Unit Test에서 test() 사용한다.
// e2e test에서는 it()을 사용한다.

describe('첫 번째 테스트', () => {
  it('프로젝트 페이지로 이동합니다.', () => {
    cy.visit('/');  // 메인 페이지로 이동 
    cy.get('header .logo')  // css 요소 존재 여부 확인한다. 
    cy.get('#heropy')
  })
})
