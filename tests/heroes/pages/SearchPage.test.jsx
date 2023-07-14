import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";
import { render,screen,fireEvent } from "@testing-library/react";

const mockedUseNavigate= jest.fn();

jest.mock('react-router-dom',()=>({
  ...jest.requireActual('react-router-dom'),
  useNavigate:()=> mockedUseNavigate
}))


describe('tests in <SearchPage/>',()=>{

    beforeEach(()=>jest.clearAllMocks());

    test('It Must be shown correctly with default values',()=>{

        const {container}=render(
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        )

        // screen.debug();

        expect(container).toMatchSnapshot();
    })

    test('Must show Batman and the input with the value from queryString',()=>{

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage/>
            </MemoryRouter>
        )

        const input= screen.getByRole('textbox');

        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');

        expect(img.src).toContain('/assets/heroes/dc-batman.jpg');

        const alert=screen.getByLabelText('alert-danger');

        expect(alert.style.display).toBe('none');

    });

    test('Must show an error if a hero is not find (batman123)',()=>{

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage/>
            </MemoryRouter>
        )

        const alert=screen.getByLabelText('alert-danger');

        expect(alert.style.display).toBe('');
    });

    test('Must call the navigate to the new screen',()=>{

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage/>
            </MemoryRouter>
        )

        const input= screen.getByRole('textbox');
        fireEvent.change(input,{target:{name:'searchText',value: 'superman'}});

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(mockedUseNavigate).toHaveBeenCalledWith('?q=superman')




    });


})