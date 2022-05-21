import { commonStyles } from '../../commonStyles'

export function getStyle(): string {
  return `
  ${commonStyles()}

  .list {
    border: 1px solid #999;
    border-radius: 2px;
    margin: 0 0 16px;
  }
  `
}
