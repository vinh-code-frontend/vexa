import type { ReactNode } from 'react';

type TableLayoutProps = {
  children: ReactNode;
  aside: ReactNode;
  header: ReactNode;
};

const TableLayout = ({ children, aside, header }: TableLayoutProps) => (
  <div className="flex min-h-0 w-full flex-1 flex-col gap-4">
    {header}
    <div className="flex min-h-0 flex-1 flex-row gap-4">
      <div className="min-h-0 min-w-0 flex-1 basis-[70%] rounded-lg border border-[#E9ECEF] p-4 bg-white">
        {children}
      </div>
      <div className="min-h-0 min-w-0 flex-1 basis-[30%] rounded-xl border border-[#E9ECEF]  bg-white">
        {aside}
      </div>
    </div>
  </div>
);

export default TableLayout;
