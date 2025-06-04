
export const achievementRouteGroup = {
    getAchievements: () => `http://localhost:8080/api/v1/achievements/current`,
    getOtherAchievements: (userId) => `http://localhost:8080/api/v1/achievements/users/${userId}`,
};