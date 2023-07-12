import { types } from "../../../src/auth/types/types"


describe('Test in "Types.js"',()=>{


    test('Must return these types', ()=>{

        expect(types).toEqual({
            login:'[Auth] Login',
            logout: '[Auth] Logout'
        })
    })

})