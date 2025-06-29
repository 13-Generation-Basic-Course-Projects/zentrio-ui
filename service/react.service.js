import { reactGroup } from "@/routes/reactRout"
import { string } from "zod";


export  const  createReactService= async ({token,reaction,announId})=>{
const url = reactGroup.createReact();

 const payload = {
      reactType: reaction,
      announcementId: announId,
    };

    //console.log("postReact", payload)

  const res = await fetch(url, {
  method: "POST",
  headers: {
    "accept": "*/*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(payload),
});
const data = await res.json(); 
}


export  const  unReactService= async ({token,reactId})=>{
const url = reactGroup.unReact(reactId);
//console.log("unreactid",reactId)
//console.log("urlReact", url)
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
//console.log("unreactid",reactId);
//console.log("unreactType",reactType);
//console.log("urlReact", url);
//console.log("kkkk", token);

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