import { commonStyles } from '../../commonStyles'

export function getStyle(options: { isOpened: boolean; }): string {
    return `
    ${commonStyles()}

    .item {
        border-bottom: 1px solid #ccc;
        margin: 0;
    }

    .item:hover .header {
        background-color: #ccc;
    }

    .header {
        align-items: center;
        background-color: #ddd;
        border: 0;
        color: #222;
        display: flex;
        justify-content: space-between;
        padding: 4px 8px;
        width: 100%;
    }

    .options {
        background-color: #eee;
        display: ${options.isOpened ? 'block' : 'none'};
    }
    `;
}
