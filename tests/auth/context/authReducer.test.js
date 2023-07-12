import { authReducer } from "../../../src/auth/context/authReducer.js";
import { types } from "../../../src/auth/types/types.js";

describe("Test in autReducer", () => {
  test("Must return the default state", () => {
    const state = authReducer({ lagged: false }, {});

    expect(state).toEqual({ lagged: false });
  });

  test("Must call login to authenticate and set the user", () => {
    const action = {
        type: types.login,
        payload: {
            name: 'Juan',
            id: '123'
        }
    }

    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({
      logged: true,
      user: action.payload,
    });
  });


  test('Must call logout and delete the user name and set logged to false',()=>{

    const state={
        logged:true,
        user:{
            name: 'Juan',
            id: '123'
        }
    }


    const action = {
        type:types.logout
    }

    const newState= authReducer(state,action)

    expect(newState).toEqual({
        logged:false
    })

  })

});


