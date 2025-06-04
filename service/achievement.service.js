'use server';

import { achievementRoute, achievementRouteGroup } from "@/routes/achievementRoute";

export const achievementService = async () => {
    const url = `${achievementRouteGroup.getAchievements()}`;
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ6ZW50cmlva3NocmRAZ21haWwuY29tIiwiaWF0IjoxNzQ5MDAwODYxLCJleHAiOjE3NDkwMjI0NjF9.zSSRMxu8myUo703l8N9UF_ZiyKJDOo_X3Zq4ExMSLmclmVT8omODl9avmSSAkBLKvLb4NJq5R07rRvFB6N-XBw";
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data;
};

export const otherAchievementService = async (userId) => {
    const url = `${achievementRouteGroup.getOtherAchievements(userId)}`;
    const token =
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ6ZW50cmlva3NocmRAZ21haWwuY29tIiwiaWF0IjoxNzQ5MDAwODYxLCJleHAiOjE3NDkwMjI0NjF9.zSSRMxu8myUo703l8N9UF_ZiyKJDOo_X3Zq4ExMSLmclmVT8omODl9avmSSAkBLKvLb4NJq5R07rRvFB6N-XBw";
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data;
}