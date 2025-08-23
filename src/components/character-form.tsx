"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { X, User } from "lucide-react";
import Modal from "./ui/modal";
import { Character } from "../types/character";
import Label from "./ui/label";
import Input from "./ui/input";
import Button from "./ui/button";

interface CharacterFormProps {
  character?: Character | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (character: Omit<Character, "id" | "created_at" | "user_id">) => void;
}

export function CharacterForm({
  character,
  isOpen,
  onClose,
  onSave,
}: CharacterFormProps) {
  const [name, setName] = useState(character?.name || "");
  const [description, setDescription] = useState(character?.description || "");
  const [personality, setPersonality] = useState<string[]>(
    character?.traits || []
  );
  const [personalityInput, setPersonalityInput] = useState("");

  useEffect(() => {
    if (character) {
      setName(character.name || "");
      setDescription(character.description || "");
      setPersonality(character.traits || []);
    } else {
      setName("");
      setDescription("");
      setPersonality([]);
    }
  }, [character]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      description: description.trim(),
      traits: personality,
    });

    // Reset form
    setName("");
    setDescription("");
    setPersonality([]);
    setPersonalityInput("");
    onClose();
  };

  const addPersonalityTrait = () => {
    const trait = personalityInput.trim().toLowerCase();
    if (trait && !personality.includes(trait)) {
      setPersonality([...personality, trait]);
      setPersonalityInput("");
    }
  };

  const removePersonalityTrait = (traitToRemove: string) => {
    setPersonality(personality.filter((trait) => trait !== traitToRemove));
  };

  const handlePersonalityKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addPersonalityTrait();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={character ? "Edit Character" : "Create New Character"}
      description={
        character
          ? "Update your character details"
          : "Bring a new character to life"
      }
    >
      <div className="">
        <div className="">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Character Image */}
            {/* <div className="flex items-center gap-4">
              <div className="w-20 h-20">
                <User className="w-10 h-10" />
              </div>
            </div> */}

            <div className="">
              <div className="space-y-2">
                <Label htmlFor="name" text="Name *" />
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Character name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label text="Description" />
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the character..."
                rows={2}
                className="w-full border border-border rounded-[5px] p-3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="personality" text="Personality Traits" />
              <div className="flex gap-2">
                <Input
                  name="personality"
                  id="personality"
                  value={personalityInput}
                  onChange={(e) => setPersonalityInput(e.target.value)}
                  onKeyDown={handlePersonalityKeyDown}
                  placeholder="Add personality traits (press Enter)"
                />
                <Button variant="outlined" onClick={addPersonalityTrait}>
                  Add
                </Button>
              </div>
              {personality.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {personality.map((trait) => (
                    <div
                      key={trait}
                      className="text-sm flex items-center justify-between gap-1 border border-border px-2 rounded-xl"
                    >
                      {trait}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removePersonalityTrait(trait)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                {character ? "Update Character" : "Create Character"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
