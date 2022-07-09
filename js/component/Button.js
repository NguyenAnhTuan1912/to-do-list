export default function Button(className, id, icon) {
    return `
            <button class="btn ${className[0].join(' ')}" id="${id[0]}"><i class="${icon}"></i></button>
    `;
}