/*
 * @description: row的 ui组件
 * @Date: 2021-08-03 15:59:19
 * @LastEditTime: 2021-08-03 22:36:44
 */

import styled from "@emotion/styled";
interface RowProps {
  gap?: number | undefined;
  justifyContent?: string;
}
export const Row = styled.div<RowProps>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.justifyContent};
  > * {
    margin-right: ${(props) =>
      typeof props.gap === "number" ? props.gap + "rem" : undefined};
    cursor: pointer;
  }
`;
