import { configure, render } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";
import App from "./App";
import CountryDataPage from "../src/components/countryDataPage";
import CountryListPage from "../src/components/countrysListPage";
import AllCountrysPage from "../src/components/./allCountrysPage";
import CountryPage from "../src/components/countryPage";
import HomePage from "../src/components/HomePage";
import Navigator from "../src/components/navigator";
import SlotMachine from "../src/components/slotMachinePage";
import DataBasePage from "../src/components/dataBasePage";
import { Router } from "react-router";

describe("rendering components", () => {
  if (
    ("renders HomePage component without crashing",
    () => {
      const wrapper = shallow(<HomePage />);
      const header = <h1>Welcome to Kanon Gaming Test</h1>;
      expect(wrapper.contains(header)).toEqual(true);
    })
  );
});
