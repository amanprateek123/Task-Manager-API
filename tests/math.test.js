test('Hello World!',()=>{

})

test('Failed',()=>{
 const total = 13
 expect(total).toBe(13)

})

test('async',(done)=>{
    setTimeout(()=>{
          expect(2).toBe(2)
          done()
    }, 2000)
})