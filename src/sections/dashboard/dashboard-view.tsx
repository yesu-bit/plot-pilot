"use client";

import React, { useEffect, useState } from "react";
// import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { Check, Loader2, PenIcon, User, UserRound } from "lucide-react";
import Button from "@/src/components/ui/button";
import Modal from "@/src/components/ui/modal";
import Input from "@/src/components/ui/input";
import Image from "next/image";
import { createSupabaseClient } from "@/src/utils/supabase/client";

interface UserData {
  name?: string;
  email?: string;
  user_pic?: string;
  user_id?: string;
  id?: string;
  createAt?: string;
  createdAt?: string;
  [key: string]: any;
}

interface DashboardViewProps {
  userData: UserData | null;
}

export default function DashboardView({ userData }: DashboardViewProps) {
  const [openEdit, setOpenEdit] = useState(false);
  const [user, setUser] = useState<UserData>({});
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  useEffect(() => {
    setUser(userData || {});
  }, [userData]);

  const handleUpdateProfile = ({
    name,
    image,
  }: {
    name: string;
    image: string;
  }) => {
    setUser((prev) => ({
      ...prev,
      name: name,
      user_pic: image,
    }));
  };

  return (
    <div>
      <div className="flex gap-6">
        <Toaster />
        <div className="flex justify-between gap-2 flex-4/6 border-[1px] border-slate-300 rounded-md p-4 px-8 bg-gradient-to-r from-blue-100 to-white">
          <div className="flex flex-col gap-2 justify-center">
            <h1 className="text-3xl font-bold text-blue-900">
              Welcome, {user?.name || user?.email || "User"}
            </h1>
            <p className="text-slate-500">
              Manage your stories and plan everything.
            </p>
          </div>
          <div className="relative w-2/6 h-full">
            <Image
              src="/welcome-dashboard.png"
              alt="welcome dashboard"
              width={400}
              height={400}
            />
          </div>
        </div>
        <div className="flex-2/6 flex flex-col items-center gap-2 border-[1px] border-slate-300 rounded-md p-4">
          {user?.user_pic ? (
            <Image
              src={user?.user_pic}
              alt="user image"
              width={80}
              height={80}
              className="rounded-full w-auto h-auto"
            />
          ) : (
            <UserRound size={"50"} className="text-slate-800" />
          )}
          <div className="text-center">
            <h3 className="text-lg text-slate-800">{user?.name}</h3>
            <p className="text-sm text-slate-500 mb-2.5">{user?.email}</p>
          </div>
          <Button variant="outlined" onClick={handleOpenEdit}>
            <PenIcon size={"15"} />
            Edit Profile
          </Button>
        </div>
        <EditProfileModal
          open={openEdit}
          onClose={handleCloseEdit}
          currentProfile={{
            name: user?.name || "User",
            user_pic: user?.user_pic || "",
          }}
          onSave={handleUpdateProfile}
          user={user}
        />
      </div>
      <div></div>
    </div>
  );
}

const EditProfileModal = ({
  open,
  onClose,
  currentProfile,
  onSave,
  user,
}: {
  open: boolean;
  onClose: () => void;
  currentProfile: { name: string; user_pic: string };
  onSave: ({ name, image }: { name: string; image: string }) => void;
  user: {
    name?: string;
    user_pic?: string;
    user_id?: string;
    id?: string;
    createAt?: string;
  };
}) => {
  const profileTemplates = [
    "/pic1.webp",
    "/pic2.webp",
    "/pic3.webp",
    "/pic4.webp",
    "/pic5.webp",
    "/pic6.webp",
    "/pic7.webp",
    "/pic8.webp",
  ];

  const [name, setName] = useState(currentProfile.name);
  const [selectedImage, setSelectedImage] = useState(currentProfile.user_pic);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(currentProfile.name);
    setSelectedImage(currentProfile.user_pic);
  }, [currentProfile]);

  const handleSave = async () => {
    if (!selectedImage.trim()) {
      toast.error("Please select an image.");
      return;
    } else if (!name.trim()) {
      toast.error("Please enter a display name.");
      return;
    }

    setLoading(true);
    try {
      // Check if we have a valid user ID
      if (!user.id) {
        toast.error("User ID is missing");
        return;
      }

      const supabase = await createSupabaseClient();
      // Update profile in database
      const { error: updateError } = await supabase
        .from("users")
        .update({
          name: name.trim(),
          user_pic: selectedImage,
        })
        .eq("id", user.id);

      if (updateError) {
        throw updateError;
      }

      // Call the parent onSave callback
      onSave({ name: name.trim(), image: selectedImage });

      toast.success("Profile updated successfully");

      onClose();
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title={"Update Profile"}
      description={"Edit your name and image."}
    >
      <div className="space-y-6 py-4">
        {/* Current Profile Preview */}
        <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
          {selectedImage ? (
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Profile preview"
              className="w-12 h-12 rounded-full object-cover border border-border"
            />
          ) : (
            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center">
              <User className="text-gray-500" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">
              {name || "Your Name"}
            </p>
            <p className="text-sm text-muted-foreground">Profile Preview</p>
          </div>
        </div>

        {/* Name Input */}
        <div className="space-y-2 flex flex-col">
          <label htmlFor="name" className="text-sm font-medium">
            Display Name
          </label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full"
          />
        </div>

        {/* Profile Image Templates */}
        <div className="space-y-2 flex flex-col">
          <label className="text-sm font-medium">Choose Profile Image</label>
          <div className="grid grid-cols-4 gap-3">
            {profileTemplates.map((template, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(template)}
                className={`relative w-full aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                  selectedImage === template
                    ? "border-blue-400 ring-2 ring-blue-400/20"
                    : "border-border hover:border-muted-foreground"
                }`}
              >
                <Image
                  src={template || "/placeholder.svg"}
                  alt={`Profile template ${index + 1}`}
                  width={30}
                  height={30}
                  className="w-full h-full object-cover"
                />
                {selectedImage === template && (
                  <div className="absolute inset-0 bg-blue-400/10 flex items-center justify-center">
                    <div className="bg-blue-400 rounded-full p-1">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4 mt-8 border-t">
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </Modal>
  );
};
