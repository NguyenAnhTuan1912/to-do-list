export default function Button(className, id, icon, text) {
    return `
            <button class="btn ${className[0].join(' ')}" id="${id[0]}"><span class="material-symbols-outlined">
            ${icon}
            </span>${text || ''}</button>
    `;
}