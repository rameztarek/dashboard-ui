import FormModle, { FormModalProps } from "@/components/FormModle";
import prisma from "@/lib/prisma";

export type FormModleProps = FormModalProps;

const FormContainer = async ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormModleProps) => {
  let formRelatedData = relatedData ?? {};

  if (type !== "delete") {
    switch (table) {
      case "subject":
      case "subjects": {
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        formRelatedData = { teachers: subjectTeachers };
        break;
      }
    }
  }

  return (
    <div className="">
      <FormModle
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={formRelatedData}
      />
    </div>
  );
};

export default FormContainer;
