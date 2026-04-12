import { useState } from "react";
import { fetchNotes } from "../../services/noteService";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";

function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["Notes", page],
    queryFn: () => fetchNotes({ page }),
    //enabled: title.length !== 0,
    placeholderData: keepPreviousData,
  });

  function onBtnClick() {
    setIsModalOpen(true);
  }

  function onClose() {
    setIsModalOpen(false);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
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
      {data && data.notes.length > 0 && <NoteList notes={data?.notes} />}
      {isModalOpen && <Modal onClose={onClose} />}
    </div>
  );
}

export default App;
