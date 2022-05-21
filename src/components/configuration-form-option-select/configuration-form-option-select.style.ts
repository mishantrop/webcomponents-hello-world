import { commonStyles } from '../../commonStyles'

export function getStyle(): string {
    return `
    ${commonStyles()}

    .app {
        border: 1px dotted #0ff;
    }
    `
}
