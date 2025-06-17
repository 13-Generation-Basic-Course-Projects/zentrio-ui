"use server";
import { Token } from "@/constant/token";
const { testFetchService } = require("@/service/test.service");

console.log("test actions must create folders");

export const testAction = async () => {
  const userToken = await Token();
  const zentrioToken = userToken.Credential;
  const result = await testFetchService({ zentrioToken });
  return result;
};
