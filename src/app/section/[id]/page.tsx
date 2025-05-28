import React from "react";

function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { q: string };
}) {
  console.log("Params:", params);
  return <div>Page</div>;
}

export default Page;
