interface ICreateCharacterFormProps {
  createCharacter: (formData: FormData) => Promise<void>;
}

const createHoc =
  (ComponentForm: React.FC<ICreateCharacterFormProps>) => () => {
    const createCharacter = async (formData: FormData) => {
      "use server";

      const name = formData.get("name");
      const charClass = formData.get("class");
      const role = formData.get("role");

      console.log({ name, charClass, role });

      fetch("http://localhost:5225/Character", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: name,
          Class: 0,
          Role: 0,
        }),
      });
    };

    return (
      <>
        <ComponentForm createCharacter={createCharacter} />
      </>
    );
  };

export default createHoc;
