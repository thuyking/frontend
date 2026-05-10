import { useState } from "react";
import { useGetProject } from "../server/queries";

const Project = () => {
  const [page, setPage] = useState(1);
  const projectQuery = useGetProject(page);
  const { data, isPending, isError } = projectQuery;
  return (
    <div>
      {isPending && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {data ? data.map((project) => <p>{project.name}</p>) : null}
      <button
        onClick={() => {
          setPage((prev) => prev - 1);
        }}
      >
        Prev
      </button>
      <button
        onClick={() => {
          setPage((prev) => prev + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Project;
