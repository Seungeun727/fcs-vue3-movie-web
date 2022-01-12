# Vue3 Movie Search Web


## Router View, RouterLink

1. RouterView : 페이지 렌더링되는 영역 컴포넌트  
2. RouterLink : 페이지 이동을 위한 링크 컴포넌트   


## $route, $router
```javascript
  // $route: 페이지 정보를 가지는 객체

function func() {
  // $router: 페이지 조작을 위한 객체
  this.$router.push(''); 
}
```

## 단위 테스트 (Unit Test)
데이터, 함수, 컴포넌트 등 정의된 프로그램 최소 단위들이 독립적으로 정상 동작하는지 확인한다.
* 테스트 걸리는 시간 최소화 로직 단순화
1. Jest
1. vue/test-utils
* ? vue-jest와 jest 27 bug

## E2E 테스트
APP의 시작-끝까지 실제 사용자 관점에서 사용 흐름을
테스트하는 방법
1. cypress.io

## Cypress에서 사용하는 명령 
값 | 의미 |
--|:--|
| url() | 현재 활성화된 페이지 url 가져온다.
| get() | DOM 요소 확인 및 불러온다.
| visit() | url 설정
| click() | DOM 요소 클릭하는데 사용
| contains() | 특정한 문자 포함되었는지 DOM 요소를 확인함. 
| select() | `<select>`의 `<option>`을 선택한다.
| should() | assertion(단언)을 생성한다.

## 재학습 필요
```js
  // 다시 이해할 것
  cy.url().should('include', '/movie/tt4520988'); 
  // Cypress 명령어 
  // 현재 페이지에서 /movie/tt45290988이 포함될 것을 기대한다.
  
  expect().toEqual();
  // Jest 명령어 
  // expect 통해 제공받은 값이 기대값과 일치할 것을 단언(신뢰)한다.
```

