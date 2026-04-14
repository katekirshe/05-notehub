import { useEffect, useState } from "react";
import {
  fetchNotes,
} from "../../services/noteService";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import SearchBox from "../SearchBox/SearchBox";
import NoteForm from "../NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";

function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["Notes", page, search],
    queryFn: () => fetchNotes({ page, search }),
    //enabled: title.length !== 0,
    placeholderData: keepPreviousData,
  });

  // useEffect(() => {
  //   setPage(1)
  // }, [search])

  const handleChange = useDebouncedCallback((value) => {
    setSearch(value)
    setPage(1)
  }, 300);

  function onBtnClick() {
    setIsModalOpen(true);
  }

  function onClose() {
    setIsModalOpen(false);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} setSearch={handleChange} />
        {(data?.totalPages || 0) > 1 && (
          <Pagination
            totalPages={data?.totalPages || 0}
            setPage={setPage}
            page={page}
          />
        )}
        {
          <button className={css.button} onClick={onBtnClick}>
            Create note +
          </button>
        }
      </header>
      {data && data.notes.length > 0 && (
        <NoteList notes={data?.notes} />
      )}
      {isModalOpen && (
        <Modal onClose={onClose}>
          <NoteForm onClose={onClose} />
        </Modal>
      )}
    </div>
  );
}

export default App;
