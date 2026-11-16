import { debounce } from "../algorithms/debounce";
import { searchCountries } from "../algorithms/searchCountries";
import { mapCountryResponse } from "../algorithms/mapCountryResponse";
import { Card } from "../ui/Card";
import { handleSearchError } from "../algorithms/handleSearchError";
export function searchHandler({ input, loader, message, cardSection, retryButton, }) {
    let controller = null;
    let latestQuery = "";
    let latestVersion = 0;
    const performSearch = async (query, version) => {
        if (version !== latestVersion || query !== input.value.trim()) {
            return;
        }
        controller?.abort();
        controller = new AbortController();
        const currentController = controller;
        loader.hidden = false;
        message.textContent = "";
        retryButton.hidden = true;
        try {
            const countries = await searchCountries(query, currentController.signal);
            if (controller !== currentController ||
                version !== latestVersion ||
                query !== input.value.trim()) {
                return;
            }
            const cards = countries.map((country) => Card(mapCountryResponse(country)));
            cardSection.replaceChildren(...cards);
            if (countries.length === 0) {
                message.textContent = "Ничего не найдено";
            }
        }
        catch (error) {
            if (controller !== currentController ||
                version !== latestVersion ||
                query !== input.value.trim()) {
                return;
            }
            const errorMessage = handleSearchError(error);
            if (errorMessage === null) {
                return;
            }
            message.textContent = errorMessage;
            retryButton.hidden = false;
        }
        finally {
            if (controller === currentController) {
                loader.hidden = true;
            }
        }
    };
    const debouncedSearch = debounce(performSearch, 1000);
    input.addEventListener("input", () => {
        const query = input.value.trim();
        latestQuery = query;
        latestVersion++;
        controller?.abort();
        cardSection.replaceChildren();
        message.textContent = "";
        retryButton.hidden = true;
        loader.hidden = true;
        if (!query) {
            return;
        }
        debouncedSearch(query, latestVersion);
    });
    retryButton.addEventListener("click", () => {
        if (latestQuery) {
            void performSearch(latestQuery, latestVersion);
        }
    });
}
