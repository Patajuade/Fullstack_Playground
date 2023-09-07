export default function create() {
  const createCharacter = async (formData: FormData) => {
    "use server";

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log({ name, email, password });
  };

  return (
    <form action={createCharacter} method="POST">
      <input type="text" name="name" />
      <select name="class" />
      <select name="role" />
      <button type="submit">Create Account</button>
    </form>
  );
}
