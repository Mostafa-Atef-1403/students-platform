import { headers } from "@/constants/consts";
import { PageLayoutProps } from "@/types/types";

const PageLayout = ({ page, children }: PageLayoutProps) => {
  const header = headers[page as keyof typeof headers];

  return (
    <div className="">
      <h2 className="">{header.h}</h2>
      <p className="">{header.p}</p>

      <div className="mt-6">{children}</div>
    </div>
  );
};

export default PageLayout;
