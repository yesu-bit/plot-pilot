"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { X, User } from "lucide-react";
import Modal from "./ui/modal";
import { Character } from "../types/character";

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
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h5>{character ? "Edit Character" : "Create New Character"}</h5>
        <p>
          {character
            ? "Update your character details"
            : "Bring a new character to life"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Character Image */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20">
                <User className="w-10 h-10" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name">Name *</label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Character name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the character..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="personality">Personality Traits</label>
              <div className="flex gap-2">
                <input
                  id="personality"
                  value={personalityInput}
                  onChange={(e) => setPersonalityInput(e.target.value)}
                  onKeyDown={handlePersonalityKeyDown}
                  placeholder="Add personality traits (press Enter)"
                />
                <button type="button" onClick={addPersonalityTrait}>
                  Add
                </button>
              </div>
              {personality.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {personality.map((trait) => (
                    <div key={trait} className="flex items-center gap-1">
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

            <div className="flex justify-end gap-3">
              <button type="button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit">
                {character ? "Update Character" : "Create Character"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
