"use client";

import { CharacterForm } from "@/src/components/character-form";
import { createSupabaseClient } from "@/src/utils/supabase/client";
import React, { useEffect, useState } from "react";

export default function MyCharactersView({ characters, user }) {
  const [openForm, setOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [characterData, setCharacterData] = useState(null);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const handleOpenEdit = (character) => {
    handleOpenForm();
    setCharacterData(character);
    setIsEdit(true);
  };

  const handleCloseEdit = () => {
    handleCloseForm();
    setIsEdit(false);
    setCharacterData(null);
  };

  const handleSaveCharacter = async ({
    name,
    description,
    personality,
    storyId,
  }) => {
    const supabase = await createSupabaseClient();

    const { data, error } = await supabase.from("characters").insert({
      name,
      description,
      traits: personality,
      user_id: user.id,
    });
    console.log(data);
  };

  const handleDeleteCharacter = async (character) => {
    const supabase = await createSupabaseClient();
    const { error } = await supabase
      .from("characters")
      .delete()
      .eq("id", character.id);
  };

  return (
    <div>
      <h4>Stories</h4>
      <button onClick={handleOpenForm}>Create Character</button>
      <div>{characters?.length === 0 && <p>No Characters created</p>}</div>
      <div>
        {characters?.map((character) => (
          <div key={character.id}>
            {/* <h3>{character?.title}</h3> */}
            <p>{character?.name || ""}</p>
            <button onClick={() => handleDeleteCharacter(character)}>
              del
            </button>
            <button onClick={() => handleOpenEdit(character)}>edit</button>
          </div>
        ))}
      </div>
      <CharacterForm
        isOpen={openForm}
        onClose={handleCloseForm}
        onSave={handleSaveCharacter}
        isEdit={isEdit}
        character={characterData}
      />
    </div>
  );
}
