export default function Button(className, id) {
    return `
        <div class="button-container">
            <button class="btn ${className[0].join(' ')}" id="${id[0]}">View detail</button>
            <button class="btn ${className[1].join(' ')}" id="${id[1]}">Done</button>
        </div>
    `;
}