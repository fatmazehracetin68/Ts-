import { Form, Row, Col, Stack, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { FormEvent, useRef, useState } from "react";
import { Tag } from "../../types.ts";
import { v4 } from "uuid";
import { CreateProps } from "../../pages/Create.tsx";
import Markdown from "react-markdown";

const CustomForm = ({
  createTag,
  handleSubmit,
  avaibleTags,
  title = "",
  markdown = "",
  tags = [],
}: CreateProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([tags]);

  const navigate = useNavigate();

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    const title = inputRef.current?.value || "";
    const markdown = textRef.current?.value || "";

    handleSubmit({
      title,
      markdown,
      tags: selectedTags,
    });
    navigate("/");
  };

  return (
    <Form onSubmit={handleForm} className="my-4">
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Başlık</Form.Label>
            <Form.Control ref={inputRef} defaultValue={title} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Etiket</Form.Label>
            <ReactSelect
              options={avaibleTags}
              onChange={(allTags) => {
                console.log("allTags: ", allTags); // allTags konsolda yazdırılıyor

                if (Array.isArray(allTags)) {
                  // Eğer `allTags` array ise ve elemanlar label ve value içeriyorsa
                  const newSelectedTags = allTags.map((tag) => ({
                    label: tag.label,
                    value: tag.value,
                  }));
                  console.log("newSelectedTags: ", newSelectedTags); // Yeni seçilen etiketler
                  setSelectedTags(newSelectedTags as Tag[]);
                } else {
                  setSelectedTags([]);
                }
              }}
              onCreateOption={(text: string) => {
                const newTag: Tag = { label: text, value: v4() };
                createTag(newTag);
                setSelectedTags([...selectedTags, newTag]);
              }}
              value={selectedTags}
              className="text-black"
              isMulti
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mt-4">
        <Form.Label>İçerik (markdown Destekler)</Form.Label>
        <Form.Control
          as="textarea"
          style={{ minHeight: "300px", maxHeight: "500px" }}
          ref={textRef}
          defaultValue={markdown}
        />
      </Form.Group>
      <Stack direction="horizontal" className="justify-content-end mt-5" gap={4}>
        <Link to={".."}>
          <Button type="button" variant="secondary">
            Geri
          </Button>
        </Link>

        <Button type="submit">Kaydet</Button>
      </Stack>
    </Form>
  );
};
export default CustomForm;
