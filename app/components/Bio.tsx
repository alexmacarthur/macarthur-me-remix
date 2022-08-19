import Image from "../components/Image";

const Bio = () => {
  return (
    <div className="mt-16 flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
      <div className="flex w-20 flex-none items-center justify-center md:w-24 md:justify-start">
        <Image
          src="/avatar.jpg"
          alt="my face"
          classes="rounded w-16 md:w-20"
          width="80"
          height="80"
        />
      </div>

      <div className="-mt-1">
        <p className="prose text-center md:text-left">
          Alex MacArthur is a software developer working for Dave Ramsey in
          Nashville, TN. Soli Deo gloria.
        </p>
      </div>
    </div>
  );
};

export default Bio;
