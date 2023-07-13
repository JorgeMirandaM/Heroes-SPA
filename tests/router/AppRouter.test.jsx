import { render,screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth";
import { MemoryRouter } from "react-router";
import { AppRouter } from "../../src/router/AppRouter";


describe('tests in <AppRouter/>',()=>{

    test('Must show login if the user is not authenticated',()=>{
        
        const contextValue={
            logged:false
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getAllByText('Login').length).toBe(2);

    });

    test('Must show marvel component if the user is authenticated',()=>{

        const contextValue={
            logged:true,
            user:{
                id:'abc',
                name:'Jorge'
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);
    })
});