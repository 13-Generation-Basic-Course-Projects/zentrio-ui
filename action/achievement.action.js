'use server';

import { achievementService, otherAchievementService } from "@/service/achievement.service";

export const getAchievementActions = async () => {
    return await achievementService();
};

export const getOtherAchievementActions = async (userId) => {
    return await otherAchievementService(userId);
}