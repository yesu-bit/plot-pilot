"use client";

import { CharacterForm } from "@/src/components/character-form";
import Button from "@/src/components/ui/button";
import { Character } from "@/src/types/character";
import { createSupabaseClient } from "@/src/utils/supabase/client";
import { Pen, Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function MyCharactersView({
  initialCharacters,
  user,
}: {
  initialCharacters: Character[];
  user: { id: string };
}) {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [openForm, setOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [characterData, setCharacterData] = useState<Character | null>(null);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const handleOpenEdit = (character: Character) => {
    handleOpenForm();
    setCharacterData(character);
    setIsEdit(true);
  };

  const handleCloseEdit = () => {
    handleCloseForm();
    setIsEdit(false);
    setCharacterData(null);
  };
  useEffect(() => {
    refreshCharacters();
  }, []);

  const refreshCharacters = async () => {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase
      .from("characters")
      .select("*")
      .eq("user_id", user.id);

    if (!error && data) {
      setCharacters(data);
    }
  };

  const handleSaveCharacter = async ({
    name,
    description,
    traits,
  }: {
    name: string;
    description: string;
    traits: string[];
  }) => {
    const supabase = await createSupabaseClient();
    if (isEdit) {
      console.log("edit");
      const { error } = await supabase
        .from("characters")
        .update({ name, description, traits, user_id: user.id })
        .eq("id", characterData?.id);
      console.log(error);
    } else {
      console.log("create");
      const { error } = await supabase.from("characters").insert({
        name,
        description,
        traits,
        user_id: user.id,
      });
      console.log(error);
    }

    // Refresh the characters list
    await refreshCharacters();

    // Close the form
    handleCloseEdit();
  };

  const handleDeleteCharacter = async (character: Character) => {
    const supabase = await createSupabaseClient();
    const { error } = await supabase
      .from("characters")
      .delete()
      .eq("id", character.id);

    if (!error) {
      // Refresh the characters list
      await refreshCharacters();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h4 className="text-2xl font-bold">Characters</h4>
          <p className="text-gray-400 text-md">
            Manage your creative characters
          </p>
        </div>
        <Button variant="contained" onClick={handleOpenForm}>
          <Plus size={18} />
          Create Character
        </Button>
      </div>
      <div>{characters?.length === 0 && <p>No Characters created</p>}</div>
      <div>
        {characters?.map((character) => (
          <div key={character?.id} className="flex items-center gap-6">
            <p className="font-medium text-md capitalize">
              {character?.name || ""}
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleOpenEdit(character)}
              >
                <Pen size={15} />
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleDeleteCharacter(character)}
              >
                <Trash size={15} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <CharacterForm
        isOpen={openForm}
        onClose={handleCloseForm}
        onSave={handleSaveCharacter}
        character={characterData}
      />
    </div>
  );
}
