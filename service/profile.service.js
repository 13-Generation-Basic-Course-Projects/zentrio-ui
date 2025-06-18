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

    const details = existingData?.payload?.details || {};
    const ownBoard = details.ownBoard || [];
    const otherBoard = details.otherBoard || [];

    const hasData = ownBoard.length > 0 || otherBoard.length > 0;

    if (hasData) {
      method = "PUT";
      endpoint = profileRouteGroup.updateAchievementCurrentUser({ token });
      achievementId = existingData?.payload?.achievementId;
    }
  } catch (err) {
    console.warn(
      "Error fetching existing achievements, assuming new user:",
      err
    );
    // Default to POST
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

  if (method === "PUT" && achievementId) {
    requestBody.achievementId = achievementId;
  }

  // Step 3: Make request
  const response = await fetch(endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(`${method} request failed`);
  }

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
