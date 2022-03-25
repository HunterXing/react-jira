/*
 * @description: 收藏星星
 * @Date: 2022-03-07 22:16:23
 * @Author: xingheng
 */
import React from "react";
import { Rate } from "antd";

interface StarProps extends React.ComponentProps<typeof Rate> {
  onCheckedChange?: (isStar: boolean) => void;
  isStar: boolean;
}

const Star = (props: StarProps) => {
  const { onCheckedChange, isStar, ...restProps } = props;
  return (
    <Rate
      count={1}
      value={isStar ? 1 : 0}
      onChange={(value) => onCheckedChange?.(!!value)}
      {...restProps}
    />
  );
};

export default Star;
