import { profileRouteGroup } from "@/routes/profileRoute";



// call route to config
export const getCurrentUserProfileService = async ({ token }) => {
  const response = await fetch(profileRouteGroup.getCurrentUserProfile(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  const data = await response.json();
  return data;
};

export const updateUserProfileService = async ({ token, userData }) => {
  const response = await fetch(profileRouteGroup.updateCurrentUserProfile(), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  return data;
};

export const getUserAchievementService = async ({ token }) => {
  const response = await fetch(profileRouteGroup.getCurrentUserAchievement(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const updateAchievementService = async ({ token, payload }) => {
  let method = "POST";
  let endpoint = profileRouteGroup.setUpAchievementCurrentUser({ token });
  let achievementId = null;

  // Step 1: Check if existing data is present
  try {
    const existingData = await getUserAchievementService({ token });
    console.log("Existing achievement data:", existingData);

    const details = existingData?.payload?.details || {};
    const ownBoard = details.ownBoard || [];
    const otherBoard = details.otherBoard || [];

    achievementId = existingData?.payload?.achievementId || null;

    const hasData = ownBoard.length > 0 || otherBoard.length > 0;

    if (hasData && achievementId) {
      method = "PUT";
      endpoint = profileRouteGroup.updateAchievementCurrentUser({ token });
    }
  } catch (err) {
    console.warn(
      "Error fetching existing achievements, defaulting to POST:",
      err
    );
    // Default method = POST
  }

  // Step 2: Prepare request body
  const requestBody = {
    details: payload?.achievements?.reduce(
      (acc, item) => {
        if (item.role === "ROLE_MANAGER") {
          acc.ownBoard.push(item);
        } else {
          acc.otherBoard.push(item);
        }
        return acc;
      },
      { ownBoard: [], otherBoard: [] }
    ),
  };

  // Include achievementId if updating
  if (method === "PUT" && achievementId) {
    requestBody.achievementId = achievementId;
  }

  console.log(
    `Sending ${method} request to ${endpoint} with body:`,
    requestBody
  );

  // Step 3: Make request
  const response = await fetch(endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorResult = await response.json();
    console.error("API error response:", errorResult);
    throw new Error(`${method} request failed`);
  }

  const result = await response.json();
  return result;
};


// call route to config
export const getPreviewProfileService = async ({ token }) => {
  const response = await fetch(profileRouteGroup.getPreviewProfile(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  const data = await response.json();
  return data;
};




export const updateProfileImageService = async ({ token, formData }) => {
  const url =profileRouteGroup.updateProfileImgae();
  ////console.log("url", url);
  ////console.log("datakakak", formData);
  const response = await fetch(url,{
    method: "POST",
    headers: {
    
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
   if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  const data = await response.json();
  ////console.log("vit_profile",data)
  return data;
};
