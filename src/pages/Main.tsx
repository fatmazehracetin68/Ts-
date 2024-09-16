import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Note, Tag } from "../types";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import ReactSelect from "react-select";
import { useMemo, useState } from "react";

type Props = {
  avaibleTags: Tag[];
  notes: Note[];
};

const Main = ({ avaibleTags, notes }: Props) => {
  const [query, setQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  //note başlığı ilk inputtaki veriyi içersin.küçük harfle de aratsan büyük harfle de aratsan bulsun && 2.inputtaki seçilen etiket note ile eşelşşin.herbir etiket ile eşleşme kontrolü yapılsın
  const filtredNotes = useMemo(
    () =>
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) &&
          selectedTags.every((s_tag) =>
            note.tags.some((note_tag) => note_tag.value === s_tag.value)
          )
      ),
    [query, selectedTags]
  );

  return (
    <div className="w-100">
      <Container className="d-flex flex-column justify-content  border border-3 rounded border-danger p-5 mx-5 w-full my-5">
        <Stack className="justify-content-between mb-4" direction="horizontal">
          <div className="d-flex gap-3 align-items-center">
            <img width={45} src="/note_logo_2.png" alt="note-logo" />
            <h1>Notlar</h1>
          </div>

          <Link to="/new">
            <Button>Oluştur</Button>
          </Link>
        </Stack>

        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Başlığa Göre Ara</Form.Label>
                <Form.Control onChange={(e) => setQuery(e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Etikete Göre Ara</Form.Label>
                <ReactSelect
                  className="text-black"
                  isMulti
                  options={avaibleTags}
                  onChange={(all_tags) => setSelectedTags(all_tags as Tag[])}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>

        <Row xs={1} sm={1} lg={2} xl={2} className="mt-4 g-4">
          {filtredNotes.map((note) => (
            <Col key={note.id}>
              <Card note={note} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Main;
