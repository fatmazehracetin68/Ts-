import { useOutletContext } from "react-router-dom";
import { Note, NoteData, Tag } from "../types";
import Form from "../components/Form";
import { Container } from "react-bootstrap";

type Props = {
  handleSubmit: (id: string, updateData: NoteData) => void;
  createTag: (tag: Tag) => void;
  avaibleTags: Tag[];
};

const Edit = ({ handleSubmit, createTag, avaibleTags }: Props) => {
  const note = useOutletContext<Note>();
  return (
    <Container className="d-flex flex-column justify-content  border border-3 rounded border-danger p-5 mx-5 w-full my-5">
      <h2>Notu Düzenle</h2>
      <Form
        handleSubmit={(updateData) => handleSubmit(note.id, updateData)}
        createTag={createTag}
        avaibleTags={avaibleTags}
        title={note.title}
        tags={note.tags}
        markdown={note.markdown}
      />
    </Container>
  );
};

export default Edit;
