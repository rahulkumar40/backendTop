import React, { createContext, useContext, useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Save,
  Loader2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  MapPin,
  Info,
  Users,
  Edit,
  Trash2,
  PlusCircle,
  Link,
  PenTool,
  User,
} from "lucide-react";

// --- MOCKED CONTEXT SETUP ---

// export const AppContext = createContext();
import { AppContext } from "../../contex/AppContext";

const generateAvatarInitials = (name) => {
  if (!name) return "??";
  const parts = name.split(" ").filter(Boolean);
  return parts.length === 1
    ? parts[0].substring(0, 2).toUpperCase()
    : parts
        .map((p) => p[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
};

const getSocialIcon = (name, className = "w-5 h-5") => {
  switch ((name || "").toLowerCase()) {
    case "facebook":
      return <Facebook className={`${className} text-blue-600`} />;
    case "twitter":
      return <Twitter className={`${className} text-sky-400`} />;
    case "instagram":
      return <Instagram className={`${className} text-pink-600`} />;
    case "linkedin":
      return <Linkedin className={`${className} text-blue-800`} />;
    case "github":
      return <Github className={`${className} text-gray-800`} />;
    default:
      return <Link className={`${className} text-gray-500`} />;
  }
};

const SOCIAL_MEDIA_OPTIONS = [
  "Website",
  "Facebook",
  "Twitter",
  "Instagram",
  "Linkedin",
  "Github",
];

// --- PROFILE EDIT FORM COMPONENT ---

const ProfileEditForm = ({ user, toggleEdit }) => {
  // Prepare initial social media links for useFieldArray

  const userData = user?.data || user;

  // Prepare initial social media links for useFieldArray
  const initialSocialMedia = userData?.socialMedia?.map((media) => ({
    mediaName: media.mediaName,
    link: media.link,
  }));

  const defaultValues = {
    bio: userData?.bio || "",
    about: userData?.about || "",
    address: userData?.address || "",
    // Use the dynamic array for social media
    socialMedia: initialSocialMedia?.length
      ? initialSocialMedia
      : [{ mediaName: "Website", link: "" }],
  };
  const {
    register,
    handleSubmit,
    control,
    watch, // <-- FIX 1: Import watch
    formState: { errors },
  } = useForm({ defaultValues });

  // Watch the entire socialMedia field array for dynamic icon updates
  const socialMediaFields = watch("socialMedia"); // <-- FIX 2: Use watch to get real-time values

  // useFieldArray for dynamic social media links
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialMedia",
  });

  const { editProfile, profile, loading } = useContext(AppContext);

  const onSubmit = async (data) => {
    // Filter out social media entries with empty links
    const socialMedia = data.socialMedia.filter(
      (item) => item.link && item.link.trim() !== ""
    );

    const profileData = {
      bio: data.bio,
      about: data.about,
      address: data.address,
      socialMedia: socialMedia,
    };

    try {
      await editProfile(profileData);
      console.log("Profile edited successfully ");
    } catch (e) {
      console.log("error at edit profile");
      console.log(e.errors);
    }
    if (!loading) {
      toggleEdit(false);
    }
  };

  const handleAddSocialLink = () => {
    append({ mediaName: "Website", link: "" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      <h3 className="text-2xl font-bold border-b pb-3 text-gray-800 flex items-center">
        <PenTool className="w-5 h-5 mr-2 text-indigo-600" /> Edit Profile
        Details
      </h3>

      {/* Bio Field */}
      <div className="space-y-1">
        <label
          htmlFor="bio"
          className="text-gray-700 font-semibold flex items-center"
        >
          <Info className="w-4 h-4 mr-2 text-blue-500" /> Bio (Short Summary)
        </label>
        <input
          id="bio"
          type="text"
          {...register("bio", {
            maxLength: {
              value: 100,
              message: "Bio must be less than 100 characters.",
            },
          })}
          className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          placeholder="E.g., Full-stack developer specializing in React and Node.js"
        />
        {errors.bio && (
          <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
        )}
      </div>

      {/* About Field */}
      <div className="space-y-1">
        <label
          htmlFor="about"
          className="text-gray-700 font-semibold flex items-center"
        >
          <Info className="w-4 h-4 mr-2 text-blue-500" /> About Me
        </label>
        <textarea
          id="about"
          {...register("about")}
          rows="4"
          className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          placeholder="Tell us about your professional background, skills, and interests..."
        />
      </div>

      {/* Address Field */}
      <div className="space-y-1">
        <label
          htmlFor="address"
          className="text-gray-700 font-semibold flex items-center"
        >
          <MapPin className="w-4 h-4 mr-2 text-red-500" /> Address / Location
        </label>
        <input
          id="address"
          type="text"
          {...register("address")}
          className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          placeholder="Enter your current city or address"
        />
      </div>

      {/* Social Media Links - Dynamic Array */}
      <div className="pt-2 border-t border-gray-100">
        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          Social Media & Links
        </h4>
        <div className="space-y-4">
          <AnimatePresence>
            {fields.map((field, index) => (
              <motion.div
                key={field.id}
                className="flex space-x-2 items-center bg-gray-50 p-3 rounded-xl border border-gray-200 shadow-inner"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                {/* Icon based on current selected media */}
                {getSocialIcon(
                  socialMediaFields[index]?.mediaName, // <-- FIXED: Use watched value
                  "w-6 h-6 flex-shrink-0"
                )}

                {/* Social Media Select */}
                <select
                  {...register(`socialMedia.${index}.mediaName`)}
                  className="w-1/4 rounded-lg border-gray-300 shadow-sm p-2 text-sm border focus:ring-blue-500 focus:border-blue-500 flex-shrink-0 min-w-[120px]"
                >
                  {SOCIAL_MEDIA_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                {/* Link Input */}
                <input
                  type="url"
                  {...register(`socialMedia.${index}.link`)}
                  className="w-full rounded-lg border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder={`Enter ${socialMediaFields[index]?.mediaName} URL`}
                />

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 text-red-500 hover:text-red-700 transition duration-150 rounded-lg hover:bg-red-100 flex-shrink-0"
                  title="Remove Link"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={handleAddSocialLink}
          className="mt-4 flex items-center px-4 py-2 bg-green-500 text-white font-medium rounded-full hover:bg-green-600 transition duration-150 shadow-md text-sm"
        >
          <PlusCircle className="w-4 h-4 mr-1" /> Add Social Link
        </button>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={() => toggleEdit(false)}
          className="flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition duration-150 shadow-md"
        >
          <X className="w-5 h-5 mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-150 shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Save className="w-5 h-5 mr-2" />
          )}
          {loading ? "Saving Profile..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

// --- PROFILE DISPLAY COMPONENT ---

export default function Profile() {
  const { userData, loading, profile } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (profile || userData) {
      setIsReady(true);
    }
  }, [userData, profile]);

  if (!isReady || !userData)
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        <p className="ml-4 text-xl text-gray-600 font-medium">
          Loading user profile...
        </p>
      </div>
    );

  // FIX: Check if profile data is nested under 'data'
  const profileData = profile?.data || profile;

  console.log("Profile data:", profileData);

  const { _id, name, email, gender, role } = userData;

  // FIX: Use profileData instead of profile directly
  const {
    bio = "",
    about = "",
    address = "",
    socialMedia = [],
  } = profileData || {};
  return (
    <motion.div
      className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 m-4 border border-gray-100"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between border-b pb-6 mb-6">
        <div className="flex items-center space-x-6">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white w-24 h-24 flex items-center justify-center rounded-full text-3xl font-extrabold shadow-xl ring-4 ring-indigo-100">
            {generateAvatarInitials(name)}
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">{name}</h2>
            <p className="text-lg text-gray-500 font-medium mt-1">{email}</p>
            <p className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full inline-block mt-1">
              {role}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className={`flex items-center justify-center p-3 rounded-full text-white transition duration-200 shadow-lg transform hover:scale-105 ${
            isEditing
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          title={isEditing ? "Close Edit" : "Edit Profile"}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : isEditing ? (
            <X className="w-6 h-6" />
          ) : (
            <Edit className="w-6 h-6" />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* Display Mode */}
        {!isEditing && (
          <motion.div
            key="display"
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Bio & About Section */}
            <div className="p-5 bg-indigo-50/50 rounded-xl border border-indigo-100 shadow-md">
              <p className="text-gray-900 text-xl font-bold flex items-center mb-2">
                <PenTool className="w-5 h-5 mr-3 text-indigo-600" />
                {bio || "No bio provided."}
              </p>
              <p className="text-md text-gray-700 mt-4 whitespace-pre-wrap leading-relaxed">
                {about || "No detailed 'About Me' section provided."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account Details (Core Data) */}
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 flex items-center border-b pb-2 mb-3">
                  <User className="w-5 h-5 mr-2 text-blue-500" /> Core Account
                  Info
                </h3>
                <div className="space-y-2 text-sm">
                  <DetailItem label="User ID" value={_id} isBreakAll />
                  <DetailItem label="Gender" value={gender || "N/A"} />
                  <DetailItem
                    label="Role"
                    value={role || "N/A"}
                    icon={Users}
                    iconColor="text-purple-500"
                  />
                  <DetailItem label="Password" value="******** (Hidden)" />
                </div>
              </div>

              {/* Additional Profile Details */}
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 flex items-center border-b pb-2 mb-3">
                  <Info className="w-5 h-5 mr-2 text-orange-500" /> Profile
                  Details
                </h3>
                <div className="space-y-2 text-sm">
                  <DetailItem
                    label="Location"
                    value={address || "N/A"}
                    icon={MapPin}
                    iconColor="text-red-500"
                  />
                </div>
                <div className="space-y-3 mt-4">
                  <h4 className="font-bold text-gray-700 mt-2">
                    Social Links:
                  </h4>
                  {socialMedia && socialMedia.length > 0 ? (
                    socialMedia.map((media, index) => (
                      <a
                        key={index}
                        href={media.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-white hover:bg-blue-50 rounded-lg transition duration-150 shadow-sm text-sm border border-gray-100"
                      >
                        {getSocialIcon(media.mediaName)}
                        <span className="ml-3 font-semibold text-gray-700 min-w-[70px]">
                          {media.mediaName}:
                        </span>
                        <span className="ml-2 text-blue-600 truncate hover:underline flex-1">
                          {media.link}
                        </span>
                      </a>
                    ))
                  ) : (
                    <p className="text-md text-gray-500 italic p-3">
                      No social media links provided.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Edit Mode */}
        {isEditing && (
          <motion.div
            key="edit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProfileEditForm user={profile} toggleEdit={setIsEditing} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Helper component for display details
const DetailItem = ({
  label,
  value,
  isBreakAll = false,
  icon: Icon,
  iconColor = "text-gray-500",
}) => (
  <div className="flex">
    {Icon && (
      <Icon className={`w-4 h-4 mr-2 mt-1 ${iconColor} flex-shrink-0`} />
    )}
    <p className="font-semibold text-gray-600 min-w-[100px]">{label}:</p>
    <p className={`text-gray-800 ml-2 ${isBreakAll ? "break-all" : ""}`}>
      {value}
    </p>
  </div>
);

// Main App component to include ContextProvider for a runnable file
