import { Language } from "@prisma/client";
import { IconPencil, IconCheck, IconArrowBackUp } from "@tabler/icons-react";
import Button from "../ui/button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DeleteLanguageButton from "./deleteLanguageButton";

interface EditLanguageInputProps {
  language: Language;
}

interface EditLanguageForm {
  name: string;
}
export default function EditLanguageInput({
  language,
}: EditLanguageInputProps) {
  const [openEdit, setOpenEdit] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    resetField,
  } = useForm<EditLanguageForm>();
  const [name, setName] = useState(language.name);
  const [error, setError] = useState(null);
  const onValid = () => {
    fetch(`/api/languages/${language.name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((data) => setOpenEdit(false))
      .catch((err) => {
        setError(err.message);
      });
  };
  const cancelEdit = () => {
    resetField("name");
    setOpenEdit(false);
  };

  useEffect(() => {
    setName(language.name);
  }, [language.name, setOpenEdit]);

  return (
    <>
      {error ? <p>{error}</p> : null}
      {openEdit ? (
        <>
          <form
            onSubmit={handleSubmit(onValid)}
            className="py-2 px-3 border border-gray-300 bg-white w-full rounded flex justify-between items-center"
          >
            <input
              className="border-none p-0 outline-none"
              {...register("name", {
                required: "Language name cannot be empty.",
              })}
              onChange={(e) => setName(e.currentTarget.value)}
              defaultValue={language.name}
            />
            <div className="flex items-center justify-end gap-3">
              <Button size="small" mode="save" button={true}>
                <IconCheck width="20" color="white" />
              </Button>
              <Button
                size="small"
                mode="danger"
                button={true}
                onClick={cancelEdit}
              >
                <IconArrowBackUp width="20" color="white" />
              </Button>
            </div>
          </form>
          {errors.name ? (
            <p className="text-[13px] text-red-500 ">{errors.name.message}</p>
          ) : null}
        </>
      ) : (
        <>
          <div className="py-2 px-3 border border-gray-300 w-full rounded flex justify-between items-center">
            <p className="text-sm">{language.name}</p>
            <div className="flex items-end gap-3">
              <Button
                size="small"
                mode="neutral"
                button={true}
                onClick={() => setOpenEdit(true)}
              >
                <IconPencil width="20" />
              </Button>
              <DeleteLanguageButton language={language} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
