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

### Cypress에서 사용하는 함수 
값 | 의미 |
--|:--:|
| get() | DOM 요소 사용
| visit() | url 설정