"use server";
import { Token } from "@/constant/token";
const { testFetchService } = require("@/service/test.service");

console.log("test actions must create folders");
/*
 * test
 */
export const testAction = async () => {
  const userToken = await Token();
  const token = userToken.Credential;
  const result = await testFetchService({ token });
  return result;
};
