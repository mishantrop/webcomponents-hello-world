import { commonStyles } from '../../commonStyles'

export function getStyle(): string {
    return `
    ${commonStyles()}

    .app {
        max-width: 960px;
        margin: 1rem auto 2rem;
    }

    .container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 10px;
    }

    .header {
        color: #444;
        font-size: 1.6rem;
        margin: 1rem 0 2rem;
    }
    `
}
