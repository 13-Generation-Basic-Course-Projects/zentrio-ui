import { reactGroup } from "@/routes/reactRout"
import { string } from "zod";


export  const  createReactService= async ({token,reaction,announId})=>{
const url = reactGroup.createReact();

 const payload = {
      reactType: reaction,
      announcementId: announId,
    };

    

  const res = await fetch(url, {
  method: "POST",
  headers: {
    "accept": "*/*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(payload),
  next: { tags: ["announcements"] },
});
const data = await res.json(); 
}


export  const  unReactService= async ({token,reactId})=>{
const url = reactGroup.unReact(reactId);

  const res = await fetch(url, {
  method: "DELETE",
  headers: {
    "accept": "*/*",
    Authorization: `Bearer ${token}`,
  },
});
  if (!res.ok) {
    throw new Error(`Error unreacting: ${res.statusText}`);
  }

  const data = await res.json();
  
}


export  const  updateReactService= async ({token,reactId, reactType,announId})=>{
const url = reactGroup.updateReact(reactId);


 const payload = {
      reactType: reactType,
      announcementId: announId,
    };

  const res = await fetch(url, {
  method: "PUT",
  headers: {
    "accept": "*/*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(payload),
});
  if (!res.ok) {
    throw new Error(`Error unreacting: ${res.statusText}`);
  }

  const data = await res.json();
  
}