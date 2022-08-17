import { ReactElement } from "react";
import ViewsIcon from "./icon-views";
import Counter from "./Counter";

const ViewCount = ({
  count = "",
  disableAnimation = false,
}: {
  count: string;
  disableAnimation?: boolean;
}): ReactElement => {
  if (!count.length) return <></>;

  return (
    <span
      title={`${count} Google Analytics views`}
      className="flex items-center gap-0.5 text-sm text-gray-500"
    >
      <ViewsIcon />

      <span className="text-gray-500">
        <Counter value={count} disableAnimation={disableAnimation} />
      </span>
    </span>
  );
};

export default ViewCount;
