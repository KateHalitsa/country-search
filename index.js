import { searchHandler } from "./components/handlers/searchHandler";
import { Louder } from "./components/ui/Loader";
export function renderScreen() {
    const main = document.createElement("main");
    const input = document.createElement("input");
    input.classList.add("search-input");
    input.type = "search";
    input.placeholder = "Search for a country";
    const message = document.createElement("p");
    message.classList.add("search-message");
    const loader = Louder();
    loader.hidden = true;
    const cardSection = document.createElement("section");
    cardSection.classList.add("card-section");
    const retryButton = document.createElement("button");
    retryButton.classList.add("reset-btn");
    retryButton.textContent = "Retry";
    main.append(input, message, loader, cardSection, retryButton);
    document.body.replaceChildren(main);
    return {
        input,
        message,
        loader,
        cardSection,
        retryButton,
    };
}
const elements = renderScreen();
searchHandler(elements);
