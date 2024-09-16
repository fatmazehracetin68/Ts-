import { Link, useOutletContext } from "react-router-dom";
import { Note } from "../types";
import { Container, Row, Col, Stack, Badge, Button } from "react-bootstrap";
import Markdown from "react-markdown";

type Props = {
  deleteNote: (id: string) => void;
};
const Detail = ({ deleteNote }: Props) => {
  const note = useOutletContext<Note>();

  return (
    <Container className="d-flex flex-column justify-content  border border-3 rounded border-danger p-5 mx-5 w-full my-5">
      <Row>
        <Col>
          <h1>{note.title}</h1>
          <Stack direction="horizontal" gap={2} className="flex-wrap">
            {note.tags.map((tag) => (
              <Badge key={tag.value}>{tag.label}</Badge>
            ))}
          </Stack>
        </Col>

        <Col>
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Link to={"/"}>
              <Button variant="secondary">Geri</Button>
            </Link>
            <Link to={"edit"}>
              <Button>Düzenle</Button>
            </Link>

            <Button onClick={() => deleteNote(note.id)} variant="danger">
              Sil
            </Button>
          </Stack>
        </Col>
      </Row>

      <Markdown>{note.markdown}</Markdown>
    </Container>
  );
};

export default Detail;
