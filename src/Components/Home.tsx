import { useNavigate } from "react-router";
import { projects } from "../constants/data";
import { useMemo, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredProjects = useMemo(() => {
    if (!search) return projects;

    return projects.filter((project) =>
      project.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }, [search]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // debounce this function --- TODO
    setSearch(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <input value={search} onChange={onSearch} className="" />
      <div className="flex gap-2 flex-wrap">
        {filteredProjects.map((project) => {
          return (
            <div
              onClick={() => navigate(project.path)}
              className="w-[200px] h-[200px] bg-amber-300 flex justify-center items-center text-amber-700"
            >
              <h1>{project.name}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
