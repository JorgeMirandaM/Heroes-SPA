import { fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "../../../src/ui";
import { AuthContext } from "../../../src/auth";
import { MemoryRouter, useNavigate } from "react-router";

const mockedUseNavigate= jest.fn();

jest.mock('react-router-dom',()=>({
  ...jest.requireActual('react-router-dom'),
  useNavigate:()=> mockedUseNavigate
}))


describe("Tests in <Navbar/>", () => {

  const contextValue = {
    logged: true,
    user: {
      id: "abc",
      name: "Jorge M",
    },
    logout:jest.fn()
  };

  beforeEach(() =>jest.clearAllMocks());

  test("Must show the username from user", () => {
    

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Jorge M")).toBeTruthy();
  });

  test("Must call the logout and navigate when the button is clicked", () => {

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const logoutBtn= screen.getByRole('button');
    fireEvent.click(logoutBtn);

    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith('/login',{'replace':true})

  });
});
