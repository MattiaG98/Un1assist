import { useLocation } from "react-router";
import MovieList from "../components/TableTest";
import { posts } from "../data";

const TableTestPage = () => {

  return (
    <div className="MovieList">
      <MovieList></MovieList>
    </div>
  );
};

export default TableTestPage;
