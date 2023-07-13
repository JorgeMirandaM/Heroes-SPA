import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth/context";
import { PublicRoute } from "../../src/router/PublicRoute";
import { MemoryRouter, Route, Routes } from "react-router";

describe("tests in <PublicRoute/>", () => {
  test("Must show the children if the user is not authenticated", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Ruta pública</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Ruta pública")).toBeTruthy();
  });

  test("Must navigate is the user is authenticated", () => {
    const contextValue = {
      logged: true,
      user: {
        name: "Jorge",
        id: "ABC123",
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>Ruta pública</h1>
                </PublicRoute>
              }
            />
            <Route path="marvel" element={<h1>Página Marvel</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Página Marvel')).toBeTruthy();
  });
});
