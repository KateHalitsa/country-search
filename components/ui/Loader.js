import "../../styles/Loader.css";
export function Louder() {
    const loaderContainer = document.createElement("div");
    loaderContainer.classList.add("loader-container");
    const spinner = document.createElement("div");
    spinner.classList.add("spinner");
    loaderContainer.append(spinner);
    return loaderContainer;
}
