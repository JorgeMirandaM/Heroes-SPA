import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { MemoryRouter } from "react-router";


describe('tests in <PrivateRoute/>',()=>{

    test("Must show the children if the user is authenticated", () => {

        Storage.prototype.setItem=jest.fn();


        const contextValue = {
          logged: true,
          user:{
            id:'abc',
            name:'Jorge'
          }
        };
    
        render(
          <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/marvel']}>
            <PrivateRoute>
              <h1>Ruta privada</h1>
            </PrivateRoute>
            </MemoryRouter>
          </AuthContext.Provider>
        );
    
        expect(screen.getByText("Ruta privada")).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath','/marvel');
      });
})