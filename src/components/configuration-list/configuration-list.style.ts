import { commonStyles } from '../../commonStyles'

export function getStyle(): string {
  return `
  ${commonStyles()}

  .list {
    border: 1px solid #999;
    border-radius: 4px;
    box-shadow: 2px 2px 4px #aaa;
    margin: 0 0 16px;
    overflow: hidden;
  }
  `
}
