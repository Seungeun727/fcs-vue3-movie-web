const userA = {
  name: 'james',
  age: 85
}

const userB = {
  name: 'Neo',
  age: 22
}

test('데이터 일치해야 합니다.', () => {
  expect(userA.age).toBe(85)   // .toBe() : 원시형 데이터 비교
  expect(userA).toEqual({     // .toEqual() : 참조형 데이터 비교
    name: 'james',
    age: 85
  })
})

test('데이터 일치하지 않아야 합니다.', () => {
  expect(userB.name).not.toBe('Bell')
  expect(userB).not.toEqual(userA)
})