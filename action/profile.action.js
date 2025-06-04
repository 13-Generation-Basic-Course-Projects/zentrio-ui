'use server';

import { getProfileService } from "@/service/profile.service";

export async function getUserProfile() { 
    return await getProfileService();
}