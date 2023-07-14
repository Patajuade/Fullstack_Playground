"use client";
import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import styles from "./styles.module.css";
import Chart from "../components/Chart/Chart.component";

interface Character {
  id?: string;
  name: string;
  class: number;
  dateOfCreation: string;
  role: number;
}

enum CharacterClass {
  Warrior,
  Mage,
  Priest,
  Druid,
  Monk,
  Evoker,
  Rogue,
  Shaman,
  Paladin,
  DK,
  DH,
  Hunter,
}
enum CharacterRole {
  Tank,
  Healer,
  DPS,
  Support,
}

function Page() {
  const [data, setData] = useState<Character[] | null>(null);

  const [name, setName] = useState<Character["name"]>("");
  const [classType, setClassType] = useState<Character["class"]>(0);
  const [dateOfCreation, setDateOfCreation] = useState<
    Character["dateOfCreation"]
  >(new Date().toISOString());
  const [role, setRole] = useState<Character["role"]>(0);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(
    null
  );

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "class":
        setClassType(Number(value));
        break;
      case "role":
        setRole(Number(value));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const character = {
      name: name,
      class: classType,
      dateOfCreation: dateOfCreation,
      role: role,
    };

    if (editingCharacter) {
      updateCharacter({ ...character, id: editingCharacter.id });
      setEditingCharacter(null); // reset after updating
    } else {
      createCharacter(character);
    }

    setName("");
    setClassType(0);
    setRole(0);
    setDateOfCreation(new Date().toISOString());
  };

  const handleEdit = (character: Character) => {
    setEditingCharacter(character);
    setName(character.name);
    setClassType(character.class);
    setDateOfCreation(character.dateOfCreation);
    setRole(character.role);
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
          <select
            value={classType}
            name="class"
            onChange={handleChange}
            required
          >
            {Object.values(CharacterClass)
              .filter((key) => !isNaN(Number(key)))
              .map((key) => (
                <option
                  key={`${CharacterClass[Number(key)]}_${key}`}
                  value={key}
                >
                  {CharacterClass[Number(key)]}
                </option>
              ))}
          </select>
        </label>

        <label>
          Role:
          <select
            value={role}
            name="role"
            onChange={(e) => setRole(Number(e.target.value))}
            required
          >
            {Object.values(CharacterRole)
              .filter((key) => !isNaN(Number(key)))
              .map((key) => (
                <option
                  key={`${CharacterRole[Number(key)]}_${key}`}
                  value={key}
                >
                  {CharacterRole[Number(key)]}
                </option>
              ))}
          </select>
        </label>
        <input type="submit" value={editingCharacter ? "Edit" : "Create"} />
      </form>

      {/* TODO : faire un composant */}
      <table className={styles.elementsContainer}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Role</th>
            <th>Date of Creation</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => {
            const { name, class: classType, dateOfCreation, role, id } = item;
            return (
              <tr key={`${name}_${classType}_${id}`}>
                <td className={styles.tableElements}>{name}</td>
                <td className={styles.tableElements}>
                  {CharacterClass[classType]}
                </td>
                <td className={styles.tableElements}>{CharacterRole[role]}</td>
                <td className={styles.tableElements}>{dateOfCreation}</td>
                <td>
                  <div className={styles.buttonsContainer}>
                    <div>
                      <button onClick={() => handleEdit(item)}>Edit</button>
                    </div>
                    <div>
                      <button onClick={() => deleteCharacter(item)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Chart/>
    </div>
  );
}

export default Page;
