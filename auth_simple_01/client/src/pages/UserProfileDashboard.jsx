import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  Info,
  Users,
  Edit,
  Save,
  X,
  Trash2,
  PlusCircle,
  LogOut,
  Lock,
} from "lucide-react";

// --- MOCK DATA & UTILITIES ---

const MOCK_USER = {
  name: "Elias Vance",
  role: "Admin",
  gender: "Male",
  email: "elias.vance@techcorp.com",
  image: null, // Set to null to test the placeholder avatar
  bio: "Principal Software Architect and Lead Developer for the Gemini project. Focused on performance optimization and scalable solutions.",
  about:
    "Highly experienced architect with 15+ years in the industry, specializing in cloud-native applications and AI-driven systems. Passionate about open-source contributions.",
  address: "123 Innovation Drive, Silicon Valley, CA 94043",
  socialMedia: [
    { mediaName: "LinkedIn", link: "https://linkedin.com/in/eliasvance" },
    { mediaName: "GitHub", link: "https://github.com/eliasvance" },
  ],
};

/**
 * Generates a simple text avatar from a name.
 */
const generateAvatarInitials = (name) => {
  if (!name) return "??";
  const parts = name.split(" ").filter((part) => part.length > 0);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return parts
    .map((part) => part[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

// --- REUSABLE COMPONENTS ---

/**
 * Editable Field Component for Bio, About, Address
 */
const EditableField = ({ label, value, icon: Icon, isEditable, onUpdate }) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="flex items-center text-lg font-semibold text-gray-700 mb-2">
        <Icon className="w-5 h-5 mr-2 text-indigo-500" />
        {label}
      </h3>
      {isEditable ? (
        <textarea
          className="w-full min-h-[80px] p-2 border border-indigo-300 rounded-md focus:ring-2 focus:ring-indigo-500 transition duration-150"
          value={value}
          onChange={(e) => onUpdate(e.target.value)}
          placeholder={`Enter your ${label.toLowerCase()}...`}
        />
      ) : (
        <p className="text-gray-600 whitespace-pre-line">
          {value || `No ${label.toLowerCase()} provided.`}
        </p>
      )}
    </div>
  );
};

/**
 * Editable Social Media List Component
 */
const EditableSocialMedia = ({ socialMedia, isEditable, onUpdate }) => {
  // Internal state to hold the editable list structure
  const [draftLinks, setDraftLinks] = useState(socialMedia);

  useMemo(() => {
    // Update internal state when socialMedia prop changes (e.g., after successful save)
    setDraftLinks(socialMedia);
  }, [socialMedia]);

  const handleLinkChange = (index, field, value) => {
    const newLinks = draftLinks.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    setDraftLinks(newLinks);
    // Propagate change back up to the main component's draft state immediately
    if (isEditable) {
      onUpdate(newLinks);
    }
  };

  const handleAddLink = () => {
    const newLinks = [...draftLinks, { mediaName: "", link: "" }];
    setDraftLinks(newLinks);
    onUpdate(newLinks);
  };

  const handleRemoveLink = (index) => {
    const newLinks = draftLinks.filter((_, i) => i !== index);
    setDraftLinks(newLinks);
    onUpdate(newLinks);
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
        <Users className="w-5 h-5 mr-2 text-indigo-500" />
        Social Media Links
      </h3>

      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {draftLinks.length > 0 ? (
            draftLinks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:flex-row gap-2 border-b pb-2 last:border-b-0 last:pb-0"
              >
                {isEditable ? (
                  <>
                    <input
                      type="text"
                      value={item.mediaName}
                      onChange={(e) =>
                        handleLinkChange(index, "mediaName", e.target.value)
                      }
                      placeholder="Platform (e.g., Twitter)"
                      className="w-full sm:w-1/3 px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <input
                      type="url"
                      value={item.link}
                      onChange={(e) =>
                        handleLinkChange(index, "link", e.target.value)
                      }
                      placeholder="URL (e.g., https://...)"
                      className="w-full sm:w-2/3 px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(index)}
                      className="p-2 text-red-500 hover:text-red-700 transition"
                      title="Remove Link"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 hover:underline transition truncate"
                  >
                    {item.mediaName}: {item.link}
                  </a>
                )}
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 italic">No social media links added.</p>
          )}
        </AnimatePresence>
      </div>

      {isEditable && (
        <button
          type="button"
          onClick={handleAddLink}
          className="flex items-center mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
        >
          <PlusCircle className="w-4 h-4 mr-1" />
          Add Link
        </button>
      )}
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---

export default function UserProfileDashboard() {
  const [userProfile, setUserProfile] = useState(MOCK_USER);
  const [isEditMode, setIsEditMode] = useState(false);

  // Draft state holds changes until SAVE is clicked
  const [draftProfile, setDraftProfile] = useState(MOCK_USER);

  // Calculate avatar initials once
  const initials = useMemo(
    () => generateAvatarInitials(userProfile.name),
    [userProfile.name]
  );

  const handleEditToggle = () => {
    if (isEditMode) {
      // Cancel editing: discard draft changes
      setDraftProfile(userProfile);
    } else {
      // Enter editing mode: copy current state to draft
      setDraftProfile(userProfile);
    }
    setIsEditMode(!isEditMode);
  };

  const handleDraftUpdate = (field, value) => {
    setDraftProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // --- API CALL SIMULATION ---
    console.log("Saving changes to API...", draftProfile);

    // In a real app:
    // 1. Call your API: updateProfile(draftProfile)
    // 2. Handle success/failure

    // On success: update the official state and exit edit mode
    setTimeout(() => {
      // Simulate network delay
      setUserProfile(draftProfile);
      setIsEditMode(false);
      alert("Profile updated successfully!");
    }, 800);
  };

  const handleLogout = () => {
    alert("Logging out...");
    // In a real app: clear auth token, redirect to login page
  };

  const handleChangePassword = () => {
    alert("Navigating to Change Password page...");
    // In a real app: navigate to your /change-password route
  };

  // Determine the profile image source
  const avatarContent = userProfile.image ? (
    <img
      src={userProfile.image}
      alt="Avatar"
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-4xl font-bold text-white">{initials}</span>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden"
      >
        {/* --- HEADER: AVATAR AND ACTIONS --- */}
        <div className="bg-indigo-700 p-6 sm:p-10 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center">
          {/* Profile Summary */}
          <div className="flex items-center mb-6 sm:mb-0">
            {/* Avatar / Image */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-500 rounded-full flex items-center justify-center border-4 border-white shadow-md flex-shrink-0 mr-4">
              {avatarContent}
            </div>

            <div>
              <h1 className="text-3xl font-extrabold">{userProfile.name}</h1>
              <p
                className={`text-sm font-medium ${
                  userProfile.role === "Admin"
                    ? "text-yellow-300"
                    : "text-indigo-200"
                }`}
              >
                <User className="w-4 h-4 inline-block mr-1" />
                {userProfile.role} | {userProfile.gender}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div className="flex gap-3 flex-wrap">
            {isEditMode ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold transition flex items-center shadow-md"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEditToggle}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg text-white font-semibold transition flex items-center shadow-md"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEditToggle}
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-semibold transition flex items-center shadow-md"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleChangePassword}
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-semibold transition flex items-center shadow-md"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold transition flex items-center shadow-md"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </motion.button>
              </>
            )}
          </motion.div>
        </div>

        {/* --- BODY: DETAILS SECTION --- */}
        <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: CORE & BIO (Span 2 columns on desktop) */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
              Editable Profile Details
            </h2>

            {/* BIO */}
            <EditableField
              label="Biography"
              value={isEditMode ? draftProfile.bio : userProfile.bio}
              icon={Info}
              isEditable={isEditMode}
              onUpdate={(val) => handleDraftUpdate("bio", val)}
            />

            {/* ABOUT */}
            <EditableField
              label="About Me"
              value={isEditMode ? draftProfile.about : userProfile.about}
              icon={Info}
              isEditable={isEditMode}
              onUpdate={(val) => handleDraftUpdate("about", val)}
            />

            {/* ADDRESS */}
            <EditableField
              label="Address"
              value={isEditMode ? draftProfile.address : userProfile.address}
              icon={MapPin}
              isEditable={isEditMode}
              onUpdate={(val) => handleDraftUpdate("address", val)}
            />

            {/* SOCIAL MEDIA (Dynamic List) */}
            <EditableSocialMedia
              socialMedia={
                isEditMode ? draftProfile.socialMedia : userProfile.socialMedia
              }
              isEditable={isEditMode}
              onUpdate={(val) => handleDraftUpdate("socialMedia", val)}
            />
          </div>

          {/* RIGHT COLUMN: CONTACT INFO (Static) */}
          <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l pt-6 lg:pl-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
              Contact Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-indigo-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-800 font-semibold">
                    {userProfile.email}
                  </p>
                </div>
              </div>

              {/* Static Display of Role/Gender (Already in header, but good to reiterate) */}
              <div className="flex items-center">
                <User className="w-5 h-5 text-indigo-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Account Type
                  </p>
                  <p
                    className={`font-semibold ${
                      userProfile.role === "Admin"
                        ? "text-yellow-600"
                        : "text-indigo-800"
                    }`}
                  >
                    {userProfile.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
