"use client";

import type React from "react";
import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { AIAssistant } from "@/components/ai-assistant"
import { X, Upload, User, Sparkles } from "lucide-react";
import Modal from "./ui/modal";
import { Character } from "../types/character";
// import type { Character, Story } from "@/lib/types"
// import { getStories } from "@/lib/storage"
// import { useAuth } from "@/components/auth-provider"

interface CharacterFormProps {
  character?: Character | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    character: Omit<Character, "id" | "created_at" | "name" | "user_id">
  ) => void;
  isEdit: boolean;
}

export function CharacterForm({
  character,
  isOpen,
  onClose,
  onSave,
  isEdit,
}: CharacterFormProps) {
  // const { user } = useAuth()
  const [name, setName] = useState(character?.name || "");
  const [description, setDescription] = useState(character?.description || "");
  // const [biography, setBiography] = useState(character?.biography || "")
  const [personality, setPersonality] = useState<string[]>(
    character?.traits || []
  );
  const [personalityInput, setPersonalityInput] = useState("");
  // const [imageUrl, setImageUrl] = useState(character?.imageUrl || "");
  // const [storyId, setStoryId] = useState(character?.storyId || "");
  // const [stories, setStories] = useState<Story[]>([]);
  // const [showAI, setShowAI] = useState(false)
  const user = {};

  // useEffect(() => {
  //   if (user && isOpen) {
  //     // const userStories = getStories(user.id)
  //     const userStories = [];
  //     setStories(userStories);
  //   }
  // }, [user, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (!name.trim() || !storyId) return;

    onSave({
      name: name.trim(),
      description: description.trim(),
      personality,
    });

    // Reset form
    setName("");
    setDescription("");
    // setBiography("")
    setPersonality([]);
    setPersonalityInput("");
    setImageUrl("");
    setStoryId("");
    // setShowAI(false)
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

  const handlePersonalityKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addPersonalityTrait();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(character.name);
  // const handleAISuggestion = (suggestion: string) => {
  //   if (biography.length > description.length) {
  //     setDescription(description + (description ? "\n\n" : "") + suggestion)
  //   } else {
  //     setBiography(biography + (biography ? "\n\n" : "") + suggestion)
  //   }
  //   setShowAI(false)
  // }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* <d className="max-w-4xl max-h-[90vh] overflow-y-auto"> */}
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
                {/* {imageUrl ? (
                  <img src={imageUrl || "/placeholder.svg"} alt={name} />
                ) : (
                  <> */}
                <User className="w-10 h-10" />
                {/* </>
                )} */}
              </div>
              {/* <div className="space-y-2">
                <label htmlFor="image">Character Portrait</label>
                <div className="flex gap-2">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("image")?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </button>
                  {imageUrl && (
                    <button
                      type="button"
                      variant="outline"
                      onClick={() => setImageUrl("")}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div> */}
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

              {/* <div className="space-y-2">
                <label htmlFor="story">Story *</label>
                <select value={storyId} onChange={setStoryId} required>
                  <div>
                    <option value="Select a story" />
                  </div>
                  <div>
                    {stories.map((story) => (
                      <option key={story.id} value={story.id}>
                        {story.title}
                      </option>
                    ))}
                  </div>
                </select>
              </div> */}
            </div>

            <div className="space-y-2">
              {/* <div className="flex items-center justify-between">
                <label htmlFor="description">Short Description</label>
                <button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAI(!showAI)}
                  className="text-purple-600 hover:text-purple-700"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  AI Help
                </button>
              </div> */}
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
                  onKeyPress={handlePersonalityKeyPress}
                  placeholder="Add personality traits (press Enter)"
                />
                <button
                  type="button"
                  onClick={addPersonalityTrait}
                  variant="outline"
                >
                  Add
                </button>
              </div>
              {personality.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {personality.map((trait) => (
                    <div
                      key={trait}
                      // variant="secondary"
                      className="flex items-center gap-1"
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

            <div className="flex justify-end gap-3">
              <button type="button" variant="outline" onClick={onClose}>
                Cancel
              </button>
              <button type="submit">
                {character ? "Update Character" : "Create Character"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* {showAI && (
            <div className="lg:col-span-1">
              <AIAssistant
                type="character"
                prompt={name + " " + description + " " + biography}
                onSuggestion={handleAISuggestion}
              />
            </div>
          )}
        </div> */}
      {/* </d> */}
    </Modal>
  );
}
