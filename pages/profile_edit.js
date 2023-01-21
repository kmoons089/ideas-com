import React, { useState } from "react";
import ProfileEditModal from "../components-posts/ProfileEditModal";

const profile_edit = () => {
  const [varyingModal_forProfile, setVaryingModal_forProfile] = useState(true);
  return (
    <div>
      <ProfileEditModal
        varyingModal_forProfile={varyingModal_forProfile}
        setVaryingModal_forProfile={setVaryingModal_forProfile}
      />
    </div>
  );
};

export default profile_edit;
