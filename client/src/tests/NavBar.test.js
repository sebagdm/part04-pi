import "@testing-library/jest-dom";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import NavBar from "../components/navBar/NavBar";
import { Link } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });

describe("<NavBar />", () => {
  let store;
  let wrapper;
  const mockStore = configureMockStore([thunk]);

  store = mockStore({});
  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <NavBar />
        </Provider>
      </BrowserRouter>
    );
  });

  it("debería mostrar <NavBar />correctamente ", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("Debería haber al menos un <span />", () => {
    expect(wrapper.find(<span />)).toHaveLength(0);
  });

  describe("Verificamos etiquetas de <Link /> en <NavBAr />  ", () => {
    it("Debería tener dos etiquetas <Link />", () => {
      expect(wrapper.find(Link)).toHaveLength(2);
    });
  });
  xdescribe("Probamos las rutas de  <NavBAr /> ", () => {
    it("El primer enlace debería llevar a /home", () => {
      expect(wrapper.find(Link).at(0).prop("to")).toEqual("/home");
    });
    it("Un segundo enlace debería llevar a /home/create", () => {
      expect(wrapper.find(Link).at(1).prop("to")).toEqual("/home/create");
    });
  });
});
