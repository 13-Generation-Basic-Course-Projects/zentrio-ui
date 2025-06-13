import { reactGroup } from "@/routes/reactRout"

export  const  createReactService= async ({token,reaction,announId})=>{
const url = reactGroup.createReact();

console.log("pppp", reaction)
 const payload = {
      reactType: reaction,
      announcementId: announId,
    };

    console.log("jkejkfelhfld", payload)

  const res = await fetch(url, {
  method: "POST",
  headers: {
    "accept": "*/*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(payload),
});

const data = await res.json(); // Try reading the server's error message

console.log("Response Status:", res.status);
console.log("Response Body:", data);

}