"use client";
import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import styles from "./styles.module.css";

interface Character {
  id?: string;
  name: string;
  class: string;
  dateOfCreation: string;
  spec: string;
}

function Page() {
  const [data, setData] = useState<Character[] | null>(null);

  const [name, setName] = useState("");
  const [classType, setClassType] = useState("");
  const [dateOfCreation, setDateOfCreation] = useState(
    new Date().toISOString()
  );
  const [spec, setSpec] = useState("");
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  

  const loadData = async () => {
    try {
      const response = await axios.get("https://localhost:7178/Character");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createCharacter = async (newCharacter: Character) => {
    try {
      await axios.post("https://localhost:7178/Character", newCharacter);
      loadData(); // recharger les données après une mise à jour
    } catch (error) {
      console.error(error);
    }
  };

  
  const updateCharacter = async (updatedCharacter: Character) => {
    try {
      await axios.put(
        `https://localhost:7178/Character/${updatedCharacter.id}`,
        updatedCharacter
      );
      loadData(); // recharger les données après une mise à jour
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCharacter = async (character: Character) => {
    try {
      await axios.delete(`https://localhost:7178/Character/${character.id}`);
      loadData(); // recharger les données après une mise à jour
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    switch(name) {
      case "name":
        setName(value);
        break;
      case "class":
        setClassType(value);
        break;
      case "spec":
        setSpec(value);
        break;
      default:
        break;
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    const character = {
      name: name,
      class: classType,
      dateOfCreation: dateOfCreation,
      spec: spec,
    };
  
    if (editingCharacter) {
      updateCharacter({ ...character, id: editingCharacter.id });
      setEditingCharacter(null); // reset after updating
    } else {
      createCharacter(character);
    }
  
    setName('');
    setClassType('');
    setSpec('');
    setDateOfCreation(new Date().toISOString());
  };

  const handleEdit = (character: Character) => {
    setEditingCharacter(character);
    setName(character.name);
    setClassType(character.class);
    setDateOfCreation(character.dateOfCreation);
    setSpec(character.spec);
  };
  

  return (
    <div>
      {/* TODO : faire un composant */}
      <form onSubmit={handleSubmit} className={styles.elementsContainer}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            name="name"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Class:
          <input
            type="text"
            value={classType}
            name="class"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Spec:
          <input
            type="text"
            name="spec"
            value={spec}
            onChange={handleChange}
            required
          />
        </label>
        <input type="submit" value={editingCharacter ? "Edit" : "Create"} />
      </form>

      {/* TODO : faire un composant */}
      <table className={styles.elementsContainer}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Spec</th>
            <th>Date of Creation</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td className={styles.tableElements}>{item.name}</td>
              <td className={styles.tableElements}>{item.class}</td>
              <td className={styles.tableElements}>{item.spec}</td>
              <td className={styles.tableElements}>{item.dateOfCreation}</td>
              <td >
                <div className={styles.buttonsContainer} >
                  <div><button onClick={() => handleEdit(item)}>Edit</button></div>
                  <div><button onClick={() => deleteCharacter(item)}>Delete</button></div>
                </div>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Page;
