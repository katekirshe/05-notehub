import { useState } from "react";
import {
  createNote,
  deleteNote,
  fetchNotes,
  type CreateNote,
} from "../../services/noteService";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import { useMutation } from "@tanstack/react-query";
import SearchBox from "../SearchBox/SearchBox";

function App() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["Notes", page, search],
    queryFn: () => fetchNotes({ page, search }),
    //enabled: title.length !== 0,
    placeholderData: keepPreviousData,
  });

  const { mutate: createMutate } = useMutation({
    mutationFn: async (newNote: CreateNote) => {
      return await createNote(newNote);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Notes", page, search],
      });
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteNote(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Notes", page, search],
      });
    },
  });

  function onBtnClick() {
    setIsModalOpen(true);
  }

  function onClose() {
    setIsModalOpen(false);
  }

  const handleCreateNote = (values: CreateNote) => {
    createMutate(values);
  };

  const handleDeleteNote = (id: string) => {
    deleteMutate(id);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} setSearch={setSearch} />
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
        <NoteList notes={data?.notes} onDelete={handleDeleteNote} />
      )}
      {isModalOpen && (
        <Modal onClose={onClose} handleSubmitForm={handleCreateNote} />
      )}
    </div>
  );
}

export default App;
