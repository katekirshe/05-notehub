import { useDebouncedCallback } from "use-debounce";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  search: string;
  setSearch: (search: string) => void;
}

function SearchBox({ search, setSearch }: SearchBoxProps) {
  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    300,
  );

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={search}
      onChange={handleChange}
    />
  );
}

export default SearchBox;
