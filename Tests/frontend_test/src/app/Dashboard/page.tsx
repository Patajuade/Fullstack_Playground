"use client";
import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import styles from "./styles.module.css";
import Chart from "../components/Chart/Chart.component";
import { useForm } from "react-hook-form";

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
  const [data, setData] = useState<Character[]>([]);
  const [editingCharacterIndex, setEditingCharacterIndex] = useState<
    number | null
  >(null);
  const editingCharacterData = editingCharacterIndex
    ? data[editingCharacterIndex]
    : null;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Character>();

  // Mettre à jour les valeurs lorsqu'on modifie le personnage
  useEffect(() => {
    if (editingCharacterData) {
      setValue("name", editingCharacterData.name);
      setValue("class", editingCharacterData.class);
      setValue("dateOfCreation", editingCharacterData.dateOfCreation);
      setValue("role", editingCharacterData.role);
    }
  }, [editingCharacterIndex, setValue]);

  const onSubmit = (formData: Character) => {
    if (editingCharacterData) {
      updateCharacter({ ...formData, id: editingCharacterData.id });
      // reset after updating
    } else {
      createCharacter(formData);
    }

    // You can reset form values here if needed
    // reset();
  };

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
      await axios.post("https://localhost:7178/Character", {
        Name: newCharacter.name,
        Class: Number(newCharacter.class),
        Role: Number(newCharacter.role),
        DateOfCreation: new Date().toISOString(),
      });
      setData((oldDate) => [...oldDate, newCharacter]);
      //loadData(); // recharger les données après une mise à jour
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
      setData((oldDate) =>
        oldDate.map((character) =>
          character.id ? character : updatedCharacter
        )
      );
      setEditingCharacterIndex(null);
      //loadData(); // recharger les données après une mise à jour
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCharacter = async (character: Character) => {
    try {
      await axios.delete(`https://localhost:7178/Character/${character.id}`);
      setData((oldDate) => oldDate.filter((c) => c.id !== character.id));
      //loadData(); // recharger les données après une mise à jour
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (characterIndex: number) => {
    setEditingCharacterIndex(characterIndex);
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.elementsContainer}
      >
        <label>
          Name:
          <input
            type="text"
            {...register("name", { required: "This field is required" })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </label>

        <label>
          Class:
          <select
            {...register("class", { required: "This field is required" })}
          >
            <option value={-1}>Select a class</option>
            {characterClassList.map((characterClassList) => (
              <option
                key={CharacterClass[Number(characterClassList)]}
                value={characterClassList}
              >
                {CharacterClass[Number(characterClassList)]}
              </option>
            ))}
          </select>
          {errors.class && <p>{errors.class.message}</p>}
        </label>

        <label>
          Role:
          <select {...register("role", { required: "This field is required" })}>
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
          {errors.role && <p>{errors.role.message}</p>}
        </label>

        <input
          type="submit"
          value={editingCharacterIndex ? "Edit" : "Create"}
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
          {data?.map((item, index) => {
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
                      <button onClick={() => handleEdit(index)}>Edit</button>
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
