import { render, screen, within } from "@testing-library/react";
import { people } from "../../mockdata";
import Home from ".";
import * as fakeAPIMocks from "../../fakeAPI";
import { Simulate } from "react-dom/test-utils";
jest.mock("../../fakeAPI");

global.HTMLElement.prototype.scrollIntoView = jest.fn();

test("renders sidebar & profiles", async () => {
  (fakeAPIMocks.getPeopleData as jest.Mock).mockImplementation(() => people);
  render(<Home />);
  await screen.findByAltText(`image-${people[0].name}`);
  people.forEach((person) => {
    const personRef = screen.getByAltText(`image-${person.name}`);
    Simulate.load(personRef);
  });
  await screen.findByTestId("sidebar");

  people.forEach((person) => {
    const personName = screen.getAllByText(person.name).length;
    const personAge = screen.getByText(person.age);
    const personOccupation = screen.getByText(person.occupation);

    expect(personName).toBe(2);
    expect(personAge).toBeDefined();
    expect(personOccupation).toBeDefined();
  });
});

test("scrolls to clicked profile", async () => {
  (fakeAPIMocks.getPeopleData as jest.Mock).mockImplementation(() => people);
  render(<Home />);
  await screen.findByAltText(`image-${people[0].name}`);
  people.forEach((person) => {
    const personRef = screen.getByAltText(`image-${person.name}`);
    Simulate.load(personRef);
  });
  const sidebar = await screen.findByTestId("sidebar");
  expect(window.HTMLElement.prototype.scrollIntoView).toBeCalledTimes(0);
  within(sidebar).getByText(people[5].name).click();
  expect(window.HTMLElement.prototype.scrollIntoView).toBeCalledTimes(1);
});
