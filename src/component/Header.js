export default function Header(data) {
    return `
        <header>
            <h1 class="header__title">
                ${data['header-title']}
            </h1>
            <p class="header__subtitle">
                ${data['header-subtitle']}
            </p>
        </header>
    `;
}