"use client";
import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import styles from "./styles.module.css";
import Chart from "../components/Chart/Chart.component";
import { log } from "console";

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
  const [classType, setClassType] = useState<Character["class"]>(-1);
  const [dateOfCreation, setDateOfCreation] = useState<
    Character["dateOfCreation"]
  >(new Date().toISOString());
  const [role, setRole] = useState<Character["role"]>(-1);
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    setClassType(-1);
    setRole(-1);
    setDateOfCreation(new Date().toISOString());
  };

  const handleEdit = (character: Character) => {
    setEditingCharacter(character);
    setName(character.name);
    setClassType(character.class);
    setDateOfCreation(character.dateOfCreation);
    setRole(character.role);
  };

  const characterClassList = Object.values(CharacterClass).filter(
    (key) => !isNaN(Number(key))
  );
  // 0 -> 11

  const characterRoleList = Object.values(CharacterRole).filter(
    (key) => !isNaN(Number(key))
  );
  // 0 -> 3

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
            <option value={-1}>Select a class</option>
            {characterClassList.map((characterClassList) => (
              <option
                key={`${
                  CharacterClass[Number(characterClassList)]
                }_${characterClassList}`}
                value={characterClassList}
              >
                {CharacterClass[Number(characterClassList)]}
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
            <option value={-1}>Select a role</option>
            {characterRoleList.map((characterRoleIndex) => (
              <option
                key={CharacterRole[Number(characterRoleIndex)]}
                value={characterRoleIndex}
              >
                {CharacterRole[Number(characterRoleIndex)]}
              </option>
            ))}
          </select>
        </label>
        <input
          type="submit"
          value={editingCharacter ? "Edit" : "Create"}
          disabled={classType === -1 || role === -1 || name === ""}
        />
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
      <div className={styles.chartContainer}>
        <Chart
          chartData={characterClassList.map((characterClassIndex) => {
            return {
              data:
                data?.filter((character) => {
                  return character.class === characterClassIndex;
                }).length ?? 0,
              // Ici, data = un tableau de personnages. On filtre ce tableau pour ne garder que les personnages dont la classe est la même que l'index de la classe actuelle. 
              // Ensuite, il compte combien de personnages correspondent à cette condition avec .length. Si data est null ou undefined (ce qui est vérifié par l'opérateur ?.), on retourne 0.
              label: CharacterClass[Number(characterClassIndex)],
              title: "Class",
              datasetName: "Characters per class",
            };
          })}
        />
        <Chart
          chartData={characterRoleList.map((characterRoleIndex) => {
            return {
              data:
                data?.filter((character) => {
                  return character.role === characterRoleIndex;
                }).length ?? 0,
              label: CharacterRole[Number(characterRoleIndex)],
              title: "Role",
              datasetName: "Characters per role",
            };
          })}
        />
      </div>
    </div>
  );
}

export default Page;
