export const FormComponent = ({
  createCharacter,
}: {
  createCharacter: (formData: FormData) => Promise<void>;
}) => {
  return (
    <form action={createCharacter} method="POST">
      <input type="text" name="name" />
      <select name="class" />
      <select name="role" />
      <button type="submit">Create Account</button>
    </form>
  );
};
