import * as example from "./example";

describe('async test', () => {
  // test('done', (done) => {
  //   asyncFunc().then(res => {
  //     expect(res).toBe('Done!')  // 정상적으로 동작하지 않음
  //     done()
  //   })
  // })

  // test('then', () => {
  //   return asyncFunc().then(res => {
  //     expect(res).toBe('Done!')
  //   })
  // })

  // test('resolve', () => expect(asyncFunc()).resolves.toBe('Done!'))
  // test() 기본값은 최대 5초 .

  // 모의 함수(Mock)
  test('async/await', async () => {
    jest.spyOn(example, 'asyncFunc')
      .mockResolvedValue('Done!')
    const res = await example.asyncFunc()
    expect(res).toBe('Done!')
  }, 7000)
})