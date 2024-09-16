import { Container } from "react-bootstrap";
import Form from "../components/Form";
import { NoteData, Tag } from "../types";

export type CreateProps = {
  handleSubmit: (noteData: NoteData) => void;
  createTag: (tag: Tag) => void;
  avaibleTags: Tag[];
} & Partial<NoteData>;

const Create = ({ handleSubmit, createTag, avaibleTags }: CreateProps) => {
  return (
    <Container className=" d-flex flex-column justify-content  border border-3 rounded border-danger p-5 mx-5 w-full my-5 ">
      <h1>Yeni Not Oluştur</h1>
      <Form handleSubmit={handleSubmit} createTag={createTag} avaibleTags={avaibleTags} />
    </Container>
  );
};

export default Create;
