import { CountryCard } from "../../types/types";

export function Card(data: CountryCard): HTMLDivElement {
  const card = document.createElement("div");
  card.classList.add("card");
  const name = document.createElement("p");
  name.textContent = data.name;
  const flag = document.createElement("img");
  flag.src = data.flag;
  flag.alt = `Flag of ${data.name}`;

  card.addEventListener(
    "click",
    () => {
      const capital = document.createElement("p");
      capital.textContent = "Capital: " + data.capital;
      const region = document.createElement("p");
      region.textContent = "Capital: " + data.region;
      const population = document.createElement("p");
      population.textContent = "Population: " + data.population;
      const languages = document.createElement("p");
      languages.textContent = "laguages: " + data.languages.join(", ");
      card.append(capital, region, population, languages);
    },
    { once: true },
  );
  card.append(name, flag);
  return card;
}
