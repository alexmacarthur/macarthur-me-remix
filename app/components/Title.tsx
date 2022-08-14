import DateFormatter from "./DateFormatter";
import Button from "./Button";
import ViewCount from "./ViewCount";

type TitleProps = {
  children: React.ReactNode;
  date?: string | Date;
  isPost?: boolean;
  subTitle?: string;
  lastUpdated?: string;
  secondaryMeta?: Function;
  views?: string;
};

const Title = ({
  children,
  date,
  isPost,
  subTitle,
  lastUpdated,
  secondaryMeta,
  views,
}: TitleProps) => {
  return (
    <div className="mt-1 mb-4 lg:mt-6 lg:mb-9">
      <div>
        {isPost && (
          <span className="mb-3 mr-4 block text-base">
            <Button
              to="/posts"
              internal={true}
              naked={true}
              pointLeft={true}
              small={true}
              classes={"text-gray-500"}
              inheritColor={true}
            >
              Back to Posts
            </Button>
          </span>
        )}

        <h1 className="gradient-text inline-block pb-2 text-4xl font-extrabold leading-none md:text-6xl">
          {children}
        </h1>

        {subTitle && (
          <h2 className="mb-2 text-xl font-light italic text-gray-500">
            {subTitle}
          </h2>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <>
              <DateFormatter date={lastUpdated}>Updated on </DateFormatter>

              <span className="light-text">/</span>
            </>
          )}

          {date && (
            <DateFormatter date={date}>
              {lastUpdated && "Originally posted on"}
            </DateFormatter>
          )}

          { views && <ViewCount count={views} disableAnimation={true} /> }
        </div>

        {secondaryMeta && secondaryMeta()}
      </div>
    </div>
  );
};

export default Title;
