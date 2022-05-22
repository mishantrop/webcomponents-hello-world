import { commonStyles } from '../../commonStyles'

export function getStyle(): string {
  return `
  ${commonStyles()}

  .item {
    display: flex;
    justify-content: center;
  }

  .name {
    color: #444;
    padding: 0 0.5rem 0 0;
    text-align: right;
    width: 50%;
  }

  .value {
    color: #222;
    padding: 0 0 0 0.5rem;
    text-align: left;
    width: 50%;
  }
  `;
}
